import "server-only";
import { createReader } from "@keystatic/core/reader";
import config from "@/keystatic.config";
import {
  SERVICE_GROUPS,
  SERVICE_GROUP_NAMES,
  type Contact,
  type Machine,
  type PageImages,
  type PriceList,
  type Product,
  type QuoteNote,
  type SiteSettings,
  type Stat,
  type Step,
  type Work,
} from "./types";

export type {
  Contact,
  GalleryImage,
  Machine,
  PageImages,
  PriceList,
  PriceRow,
  Product,
  QuoteNote,
  SiteSettings,
  Spec,
  Stat,
  Step,
  Work,
} from "./types";

/**
 * Build-time content reader. `createReader` hits the local filesystem, so every
 * call site stays a prerendered Server Component — this is not a runtime API
 * call and adds nothing to page latency.
 *
 * The functions here return exactly the shapes `content/*.ts` used to export,
 * so no presentational component knows the CMS exists.
 */
const reader = createReader(process.cwd(), config);

function missing(what: string): never {
  throw new Error(
    `Nội dung "${what}" không tồn tại. Kiểm tra thư mục content/ — file có thể đã bị xóa.`,
  );
}

/* ---------------------------------------------------------------- products */

/** Position of a product's group in the fixed running order. Anything the
 *  editor somehow set outside the list sorts to the end rather than vanishing. */
function groupRank(group: string) {
  const i = SERVICE_GROUP_NAMES.indexOf(group);
  return i === -1 ? SERVICE_GROUP_NAMES.length : i;
}

export async function getProducts(): Promise<Product[]> {
  const entries = await reader.collections.products.all();
  return entries
    .slice()
    // Group first, then the editor's order within the group — so the catalogue
    // reads in the same sequence the business is pitched in.
    .sort(
      (a, b) =>
        groupRank(a.entry.group) - groupRank(b.entry.group) ||
        a.entry.order - b.entry.order,
    )
    .map((e, i) => ({
      code: e.entry.code,
      slug: e.slug,
      // Placeholder-label plumbing, never editorial. Derived from position so
      // it is not one more field for the editor to get wrong.
      slot: `gd-p${i + 1}`,
      group: e.entry.group,
      name: e.entry.name,
      moq: e.entry.moq,
      blurb: e.entry.blurb,
      materialsShort: e.entry.materialsShort,
      long: e.entry.long,
      specs: e.entry.specs.map((s) => ({ k: s.k, v: s.v })),
      materials: [...e.entry.materials],
      image: e.entry.image ?? undefined,
      gallery: e.entry.gallery.map((g) => ({
        label: g.label,
        image: g.image ?? undefined,
      })),
    }));
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  // Read the whole collection rather than the single entry: `slot` is derived
  // from the product's position, so it is only correct in context.
  return (await getProducts()).find((p) => p.slug === slug);
}

/**
 * The catalogue as the site presents it: the four pillars in their fixed order,
 * each with its heading copy and the items that belong to it. A group with no
 * items is dropped, so removing the last entry of a pillar in the CMS collapses
 * its section instead of leaving an empty heading.
 */
export async function getProductGroups(): Promise<
  { id: string; name: string; lead: string; items: Product[] }[]
> {
  const products = await getProducts();
  return SERVICE_GROUPS.map((g) => ({
    id: g.id,
    name: g.name,
    lead: g.lead,
    items: products.filter((p) => p.group === g.name),
  })).filter((g) => g.items.length > 0);
}

/* ------------------------------------------------------------------- works */

export async function getWorks(): Promise<Work[]> {
  const entries = await reader.collections.works.all();
  return entries
    .slice()
    .sort((a, b) => a.entry.order - b.entry.order)
    .map((e, i) => ({
      slot: `gd-w${i + 1}`,
      slug: e.slug,
      cat: e.entry.cat,
      title: e.entry.title,
      spec: e.entry.spec,
      ph: e.entry.ph,
      image: e.entry.image ?? undefined,
      client: e.entry.client || undefined,
      location: e.entry.location || undefined,
      year: e.entry.year || undefined,
      summary: e.entry.summary || undefined,
      scope: [...e.entry.scope],
      gallery: e.entry.gallery.map((g) => ({
        label: g.label,
        image: g.image ?? undefined,
      })),
    }));
}

export async function getWork(slug: string): Promise<Work | undefined> {
  // Whole collection, not the single entry: `slot` is derived from position.
  return (await getWorks()).find((w) => w.slug === slug);
}

/** The works either side of this one, for the prev/next pager on a detail
 *  page. The list wraps, so the last project leads back to the first rather
 *  than dead-ending. */
export async function getWorkNeighbours(slug: string) {
  const works = await getWorks();
  const i = works.findIndex((w) => w.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: works[(i - 1 + works.length) % works.length],
    next: works[(i + 1) % works.length],
  };
}

/** The six lowest-ordered works, shown on the home page. */
export async function getFeaturedWorks(): Promise<Work[]> {
  return (await getWorks()).slice(0, 6);
}

/* ---------------------------------------------------------------- settings */

/**
 * Vietnamese numbers are entered however the editor likes ("0774999107",
 * "0774 999 107", "+84 774 999 107"); the dial link and the Zalo deep link are
 * derived from the digits so those three can never drift apart.
 */
function derivePhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("84") && d.length > 10) d = `0${d.slice(2)}`;
  const national = d.startsWith("0") ? d : `0${d}`;
  return {
    phoneHref: `tel:+84${national.slice(1)}`,
    zalo: `https://zalo.me/${national}`,
  };
}

export async function getSettings(): Promise<SiteSettings> {
  const s = (await reader.singletons.settings.read()) ?? missing("settings");
  const { phoneHref, zalo } = derivePhone(s.phone);
  const { street, district, city } = s.address;

  return {
    name: s.name,
    shortName: s.shortName,
    tagline: s.tagline,
    description: s.description,
    phone: s.phone,
    phoneHref,
    zalo,
    // "#" keeps the Facebook button inert-but-present, exactly as before the
    // client supplied a page.
    facebook: s.facebook ?? "#",
    emailInfo: s.emailInfo,
    emailSales: s.emailSales,
    address: {
      street,
      district,
      city,
      full: [street, district, city].filter(Boolean).join(", "),
    },
    hours: s.hours,
    license: s.license,
    url: s.url,
  };
}

export async function getContacts(): Promise<Contact[]> {
  const s = await getSettings();
  return [
    { k: "Xưởng sản xuất", v: s.address.full },
    { k: "Hotline / Zalo", v: s.phone },
    { k: "Kinh doanh", v: s.emailSales },
    { k: "Giờ làm việc", v: s.hours },
  ];
}

/* ------------------------------------------------------------------ blocks */

export async function getPageImages(): Promise<PageImages> {
  const b = (await reader.singletons.pageImages.read()) ?? missing("pageImages");
  return {
    homeHero: b.homeHero ?? undefined,
    aboutHero: b.aboutHero ?? undefined,
    aboutMachine: b.aboutMachine ?? undefined,
    aboutFinishing: b.aboutFinishing ?? undefined,
  };
}

export async function getStats(): Promise<Stat[]> {
  const b = (await reader.singletons.stats.read()) ?? missing("stats");
  return b.items.map((s) => ({ value: s.value, label: s.label }));
}

export async function getSteps(): Promise<Step[]> {
  const b = (await reader.singletons.steps.read()) ?? missing("steps");
  // "01", "02", … follow the list order, so reordering renumbers itself.
  return b.items.map((s, i) => ({
    no: String(i + 1).padStart(2, "0"),
    title: s.title,
    body: s.body,
  }));
}

export async function getMachines(): Promise<Machine[]> {
  const b = (await reader.singletons.machines.read()) ?? missing("machines");
  return b.items.map((m) => ({ name: m.name, spec: m.spec, cap: m.cap }));
}

export async function getClients(): Promise<string[]> {
  const b = (await reader.singletons.clients.read()) ?? missing("clients");
  return [...b.items];
}

export async function getPriceList(): Promise<PriceList> {
  const b = (await reader.singletons.priceList.read()) ?? missing("priceList");
  return {
    updated: b.updated,
    note: b.note,
    items: b.items.map((r) => ({
      item: r.item,
      unit: r.unit,
      from: r.from,
      note: r.note,
    })),
  };
}

export async function getQuoteNotes(): Promise<QuoteNote[]> {
  const b = (await reader.singletons.quoteNotes.read()) ?? missing("quoteNotes");
  return b.items.map((q) => ({ t: q.t, b: q.b }));
}
