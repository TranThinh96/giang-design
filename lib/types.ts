/**
 * Shapes and fixed taxonomy shared by the Keystatic schema, the build-time
 * reader (`lib/content.ts`) and the components.
 *
 * This module must stay free of Node built-ins and of `@keystatic/core/reader`:
 * client components (`Header`, `FilterableWorks`) import `NAV`, `CATS` and
 * `ALL_CATS` from here as runtime values, so anything that touches `fs` would
 * end up in the browser bundle.
 */

export type Spec = { k: string; v: string };

/** A detail crop under the product's main photo. `label` doubles as the
 *  placeholder text while the slot is empty and as the alt text once filled. */
export type GalleryImage = { label: string; image?: string };

export type Product = {
  code: string;
  slug: string;
  slot: string;
  group: string;
  name: string;
  moq: string;
  blurb: string;
  materialsShort: string;
  long: string;
  specs: Spec[];
  materials: string[];
  image?: string;
  gallery: GalleryImage[];
};

export type Work = {
  slot: string;
  /** The public URL segment: /du-an/<slug>. It is the filename, so renaming an
   *  entry in the CMS breaks the live link — same rule as a product. */
  slug: string;
  cat: string;
  title: string;
  spec: string;
  ph: string;
  image?: string;
  /** Everything below belongs to the detail page and is optional: the nine
   *  entries that existed before it had one still render without it. */
  client?: string;
  location?: string;
  year?: string;
  summary?: string;
  scope: string[];
  gallery: GalleryImage[];
};

export type SiteSettings = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  phone: string;
  phoneHref: string;
  zalo: string;
  facebook: string;
  emailInfo: string;
  emailSales: string;
  address: { street: string; district: string; city: string; full: string };
  hours: string;
  license: string;
  url: string;
};

/**
 * The image slots that belong to a page rather than to a product or a project,
 * so they have no collection entry to hang off. Every one is optional —
 * `ImageSlot` falls back to its parchment placeholder.
 */
export type PageImages = {
  homeHero?: string;
  aboutHero?: string;
  aboutMachine?: string;
  aboutFinishing?: string;
};

/** A row of the reference price list. Every value is free text, not a number:
 *  Vietnamese prices are quoted as "từ 45.000 đ/m²" and the unit varies per
 *  item, so formatting belongs to the editor rather than to a currency helper. */
export type PriceRow = { item: string; unit: string; from: string; note: string };
export type PriceList = { updated: string; note: string; items: PriceRow[] };

export type Stat = { value: string; label: string };
export type Step = { no: string; title: string; body: string };
export type Machine = { name: string; spec: string; cap: string };
export type QuoteNote = { t: string; b: string };

export type Contact = { k: string; v: string };

/**
 * Site navigation. Structural, not editorial — adding an entry here means
 * adding a route, so it stays in code rather than in the CMS.
 */
export const NAV = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/san-pham-dich-vu", label: "Sản phẩm & dịch vụ" },
  { href: "/du-an", label: "Dự án" },
  { href: "/lien-he", label: "Liên hệ" },
] as const;

/**
 * The four pillars of the business, in the order the site presents them.
 *
 * Advertising printing leads — that is what the workshop is hired for most
 * often, and what the name says. Signage and fit-out follow because they are a
 * different sale (a site survey, not a file), and design closes because it is
 * the service that attaches to the other three rather than standing alone.
 *
 * Structural like `NAV`, not editorial: a group is a section of a page with its
 * own heading and lead, so adding one is a code change on purpose. The
 * Keystatic `group` field is a select over these labels.
 */
export const SERVICE_GROUPS = [
  {
    // `id` is a URL fragment, so it is written out rather than slugified from
    // the Vietnamese name — a derived one would change the moment the label is
    // reworded, and anchors are links other people keep.
    id: "in-an-quang-cao",
    name: "In ấn quảng cáo",
    lead: "In kỹ thuật số khổ lớn và in cuộn — hạng mục chạy hằng ngày tại xưởng, giao trong 24–72 giờ.",
  },
  {
    id: "an-pham-bao-bi",
    name: "Ấn phẩm & Bao bì",
    lead: "Offset 4–8 màu cho ấn phẩm thương hiệu và bao bì giấy, hoàn thiện bế – cấn – dán tại chỗ.",
  },
  {
    id: "bang-hieu-thi-cong",
    name: "Bảng hiệu & Thi công",
    lead: "Khảo sát mặt bằng, dựng phối cảnh, gia công và lắp đặt trọn gói tại TP.HCM và các tỉnh lân cận.",
  },
  {
    id: "thiet-ke",
    name: "Thiết kế",
    lead: "Dàn trang, dựng file in và thiết kế nhận diện — làm trước khi lên máy, hoặc làm riêng.",
  },
] as const;

export type ServiceGroup = (typeof SERVICE_GROUPS)[number]["name"];

/** Widened to `string[]` on purpose: this is the lookup list — for the
 *  Keystatic select and for ranking a `group` value read back off disk, which
 *  is only ever a plain string. The literal union lives in `ServiceGroup`. */
export const SERVICE_GROUP_NAMES: readonly string[] = SERVICE_GROUPS.map(
  (g) => g.name,
);

export const ALL_CATS = "Tất cả";

/**
 * Portfolio categories. Single source of truth: the Keystatic `cat` field is a
 * select over `WORK_CATS`, and `/du-an` builds its filter chips from `CATS`.
 * A free-text category would silently break the chips, so editing this list is
 * a code change on purpose.
 */
export const WORK_CATS = [
  "Bảng hiệu & Hộp đèn",
  "Gian hàng & Sự kiện",
  "Thi công Shop",
  "Trang trí lễ hội",
  "Thiết kế & In ấn",
] as const;

export const CATS = [ALL_CATS, ...WORK_CATS] as const;

export type WorkCat = (typeof WORK_CATS)[number];
