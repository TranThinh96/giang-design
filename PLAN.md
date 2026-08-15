# Giang Design – Advertising — Website Build Plan

Implementation plan derived from the approved design artifact
(`https://claude.ai/code/artifact/6b5e1a4c-b5a9-4289-b751-0e0c28f2a24b`).

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Zalo OA chat widget (enquiries)
**Language:** Vietnamese (`vi-VN`) — single locale, no i18n layer
**Target:** marketing/lead-gen site for an offset & digital printing workshop in TP.HCM

---

## 1. What the design contains

A 7-view single-brand site. In the artifact these are React state switches (`page: home | about | products | detail | portfolio | quote | contact`); in production each becomes a **real route** so Google can index them.

| # | Route | Nav label | Purpose |
|---|-------|-----------|---------|
| 1 | `/` | Trang chủ | Hero + featured work + service grid + process + capability + clients + CTA band |
| 2 | `/gioi-thieu` | Giới thiệu | Company story, vision/mission, quality commitments, facility photos |
| 3 | `/san-pham-dich-vu` | Sản phẩm & dịch vụ | 8 print categories, 2-column list with thumbnail + specs |
| 4 | `/san-pham-dich-vu/[slug]` | — | Product detail: gallery, spec table, material tags, inline quote CTA |
| 5 | `/du-an` | Dự án | Filterable portfolio grid (6 categories), 9 items |
| 6 | `/bao-gia` | Báo giá | Zalo/phone CTAs + copyable message template + 4 reassurance notes sidebar |
| 7 | `/lien-he` | Liên hệ | Contact table, Zalo/Facebook buttons, Google Map |

Global chrome: sticky blurred header (logo mark + wordmark + tagline + nav + phone + primary CTA) and a 4-column footer with a legal bar.

---

## 2. Design system (extract verbatim from the artifact)

The artifact ships a complete token layer. **Port it as-is** into `app/globals.css` under `@theme` — do not re-derive values by eye.

### Core tokens
```css
--color-bg:        #f2f2f3;   /* page ground */
--color-surface:   #e9e9ea;
--color-text:      #1d1f20;
--color-accent:    #5980a6;   /* slate blue — brand */
--color-accent-2:  #728fab;
--color-divider:   color-mix(in srgb, #1d1f20 16%, transparent);
```

### Ramps (OKLCH-generated, shared lightness scale)
- `--color-neutral-100..900`: `#f5f5f8 #e7e7ea #d4d4d7 #b7b7ba #98989b #7a7a7d #5d5d60 #424244 #2b2b2d`
- `--color-accent-100..900`: `#eef6ff #d6ebff #b5d9fd #94bce3 #749dc4 #597ea3 #416180 #2c455d #1d2d3d`
- `--color-accent-2-100..900`: `#eef6ff #d6ebff #bdd8f2 #9ebbd8 #7e9cb8 #627d98 #486077 #314457 #1f2d3a`

Usage in the design: `accent-700` for eyebrow/kicker text, `accent-900` as the CTA band background, `accent-300` for the eyebrow inside that dark band.

### Typography
- Headings: `"Roboto Condensed"`, weight **700**, `line-height: 1.12`, `letter-spacing: -0.015em`
- Body: `"Roboto"`, 15px / 1.55 / 400
- Scale: h1 42 · h2 32 · h3 25 · h4 20 · h5 16 · h6 13 (h6 uppercase, `0.08em` tracking)
- Page-level overrides in the design: hero h1 **60px**, inner-page h1 **52px**, detail h1 **46px**, section h2 **36px**, CTA-band h2 **40px**
- Self-host both families via `next/font/local` with the `vietnamese` + `latin-ext` + `latin` subsets (the artifact bundles all three — Vietnamese diacritics are mandatory for this copy)

### Spacing / radius / elevation
```
--space-1..8: 3.4 6.8 10.2 13.6 20.4 27.2 px
--radius-sm/md/lg: 2 / 4 / 7 px
--shadow-sm: 0 1px 2px rgba(43,43,45,.14)
--shadow-md: 0 3px 10px rgba(43,43,45,.16)
--shadow-lg: 0 12px 32px rgba(43,43,45,.22)
```
Note: a late rule in the artifact **overrides radius to `0`** for `.card .btn .input .tag .seg .dialog` and makes cards/dialogs transparent with a hairline border. The final look is square and wireframe-like — keep it.

### The "blueprint" motif (signature element)
Every image and most cards sit in a `.blueprint` wrapper: 1px divider border, `border-radius: 0`, plus four absolutely-positioned `.corner` registration marks (11×11px crosshairs offset −6px past each corner, at 55% text opacity). Build this once as `<Blueprint>` and reuse — it appears ~25 times.

### Component classes to port
`.btn` (+`-primary` `-secondary` `-ghost` `-icon` `-block`) · `.field/.input/textarea/.radio/.seg` · `.card` (+kicker/title/body/meta) · `.tag` (+accent/accent-2/neutral/outline) · `.nav` · `.table` · `.dialog` · `.hr` · `.text-muted` · `.elev-sm/md/lg` · `.duotone`

Focus states are already defined (`:focus-visible { outline: 2px solid var(--color-accent) }`) — preserve them, don't let a Tailwind reset eat them.

---

## 3. Content data model

All content is static and lives in `content/` as typed TS modules. No CMS in this phase.

### `Product` — 8 items (`content/products.ts`)
```ts
type Product = {
  code: string;          // "SP-01"
  slug: string;          // NEW — needed for the URL, derive from name
  slot: string;          // image key: "gd-p1"
  name: string;
  moq: string;           // "từ 500 con"
  blurb: string;         // card/list copy
  materialsShort: string;
  long: string;          // detail-page paragraph
  specs: { k: string; v: string }[];
  materials: string[];   // rendered as .tag-outline chips
};
```
Items, in order: **SP-01** Tem nhãn & Decal · **SP-02** Bao bì giấy · **SP-03** Hộp giấy & Carton · **SP-04** Túi giấy · **SP-05** Catalogue · **SP-06** Brochure & Tờ rơi · **SP-07** Danh thiếp · **SP-08** Standee & Băng rôn. Full copy (blurbs, `long`, spec rows, material lists) is already written in the artifact — transcribe it exactly.

Suggested slugs: `tem-nhan-decal`, `bao-bi-giay`, `hop-giay-carton`, `tui-giay`, `catalogue`, `brochure-to-roi`, `danh-thiep`, `standee-bang-ron`.

### `Work` — 9 items (`content/works.ts`)
```ts
type Work = { slot; cat; title; spec; ph; image };
```
Categories (filter chips, in order): `Tất cả` · `Bảng hiệu & Hộp đèn` · `Gian hàng & Sự kiện` · `Thi công Shop` · `Trang trí lễ hội` · `Thiết kế & In ấn`. Home shows `works.slice(0, 6)`.

### Static blocks (`content/site.ts`)
- `steps` — 5 process steps (01 Tiếp nhận yêu cầu → 05 KCS & giao hàng)
- `machines` — 6 rows: name / spec / capacity (Offset 4 màu 720×1020 @13.000 tờ/giờ, etc.)
- `clients` — 6 sector labels: THỰC PHẨM, MỸ PHẨM, DƯỢC, BÁN LẺ, AGENCY, F&B
- `quoteNotes` — 4 sidebar cards on `/bao-gia`
- `contacts` — 4 rows: Xưởng sản xuất / Hotline / Kinh doanh / Giờ làm việc
- `stats` — 15+ năm · 1.200+ đơn hàng/năm · 48h mẫu in thử

---

## 4. Component inventory

```
components/
  layout/  Header.tsx  Footer.tsx  Container.tsx
  ui/      Blueprint.tsx      # hairline frame + 4 corner marks
           Button.tsx         # primary | secondary | ghost | on-dark
           SectionHeading.tsx # eyebrow "01 — Dự án tiêu biểu" + h2 + rule + optional right link
           Eyebrow.tsx
           Tag.tsx
           SpecTable.tsx      # k/v two-column, and the 3-col machines variant
           GridDivider.tsx    # the 1px-gap-on-divider-background grid used by stats/steps/clients/contacts
  home/    Hero.tsx  FeaturedWorks.tsx  ServiceGrid.tsx  ProcessSteps.tsx
           Capability.tsx  ClientLogos.tsx  CtaBand.tsx
  products/ProductListItem.tsx  ProductCard.tsx  ProductGallery.tsx
  portfolio/WorkCard.tsx  CategoryFilter.tsx
  quote/   QuoteBrief.tsx     # copyable Zalo message template
  zalo/    ZaloChat.tsx       # OA plugin container + SDK, mounted in layout
  contact/ ContactTable.tsx  MapEmbed.tsx
```

`GridDivider` is worth extracting: the design repeatedly uses `display:grid; gap:1px; background:var(--color-divider); border:1px solid var(--color-divider)` with `background:var(--color-bg)` children to fake hairline dividers. It shows up in the hero stats, process steps, about vision/mission, client logos, contact rows, and the quote sidebar.

Only three things need `"use client"`: `CategoryFilter` (or lift filtering to a `?cat=` search param and keep it a Server Component), `QuoteBrief` (clipboard + `?hang-muc=`), and the mobile nav toggle. Everything else stays server-rendered.

---

## 5. Quotes — Zalo instead of a form

**Decision (revised):** the design's quote form is not built. Enquiries go to Zalo, which is where this customer base already talks to suppliers, and it removes the site's only backend — no transactional email provider, no blob storage, no rate limiter, no spam surface.

1. **Site-wide widget.** Zalo's Official Account plugin (`https://sp.zalo.me/plugins/sdk.js`) mounts once in `app/layout.tsx` via `components/zalo/ZaloChat.tsx`, giving every page a floating chat bubble. Loaded `lazyOnload`; rendered only when `NEXT_PUBLIC_ZALO_OA_ID` is present, so the third-party script is absent until the OA exists.
2. **`/bao-gia` becomes a Zalo landing.** Keeps its URL, nav slot, sitemap entry and the 4 `quoteNotes` sidebar cards. Body is a CTA row (Nhắn Zalo / Gọi hotline / email kinh doanh) over `QuoteBrief`.
3. **`QuoteBrief`** turns the form's fields into a copy-to-clipboard message template — hạng mục, số lượng, kích thước, chất liệu, gia công, thời hạn, người liên hệ. It reads `?hang-muc=` client-side to pre-fill the first line, which keeps the route prerendered.
4. **File delivery** happens inside the Zalo conversation. The 50MB upload path and its 4.5MB Server-Action workaround are gone with it.
5. **Fallback.** Every CTA is a plain `zalo.me` deep link (`SITE.zalo`), so the funnel works with or without the OA widget.

Env vars: `NEXT_PUBLIC_ZALO_OA_ID` (optional).

Trade-off accepted: no ticket ID, no server-side record of an enquiry, and no lead capture if a visitor has no Zalo account — the hotline and sales email cover that case.

---

## 6. Responsive plan

The artifact is **desktop-only** — every grid is a hard `repeat(N, 1fr)` and there is not a single media query. This is the largest amount of net-new design work in the build. Breakpoints and collapse rules:

| Section | ≥1024px | 640–1023px | <640px |
|---|---|---|---|
| Header nav | inline row | hamburger drawer | hamburger drawer |
| Hero | 1.05fr / 1fr split | stacked, image below | stacked; h1 60→36px |
| Hero stats | 3 cols | 3 cols | 1 col |
| Featured works | 3 cols | 2 cols | 1 col |
| Service grid | 4 cols | 2 cols | 1 col |
| Process steps | 5 cols | 2 cols | 1 col (numbered list) |
| Capability (table + clients) | 2 cols | stacked | stacked; table scrolls x |
| CTA band | row, right-aligned buttons | stacked | stacked, full-width buttons |
| Products list | 2 cols × (200px thumb + text) | 1 col | 1 col, thumb above text |
| Product detail | 2 cols | stacked | stacked |
| Portfolio | 3 cols | 2 cols | 1 col |
| Quote page | 1fr / 0.8fr | form then sidebar | same, fields 1 col |
| Footer | 4 cols | 2 cols | 1 col |

Container is `max-width: 1240px; padding-inline: 32px` — reduce to 20px under 640px. Cap the `.blueprint` corner marks so they don't clip at the viewport edge on mobile.

---

## 7. SEO & performance

- Per-route `generateMetadata`: Vietnamese titles/descriptions, `openGraph`, `alternates.canonical`. `lang="vi"` on `<html>`.
- `generateStaticParams` for the 8 product detail pages → fully static.
- **LocalBusiness / Organization JSON-LD** on the layout (name, address in Bình Tân TP.HCM, telephone, openingHours T2–T7 8:00–17:30) and **Product** JSON-LD on detail pages. This is the highest-leverage SEO item for a local print shop.
- `sitemap.ts` + `robots.ts`.
- `next/image` for every slot, with real `alt` text — the artifact only has placeholder labels ("Ảnh xưởng in / sản phẩm bao bì", "Máy offset", "Tổ hoàn thiện"). Write proper Vietnamese alt copy.
- Preload the two hero-critical font subsets; `font-display: swap` is already in the design.
- Targets: LCP < 2.0s on 4G, CLS 0 (all image slots have fixed `aspect-ratio` in the design — 4/5 hero, 4/3 cards, 1/1 thumbs — so keep them).

---

## 8. Build phases

**Phase 0 — Scaffold (0.5d)**
`create-next-app` (TS, App Router, Tailwind v4). Port the token layer into `globals.css`. Self-host Roboto + Roboto Condensed. Build `Blueprint`, `Button`, `Eyebrow`, `SectionHeading`, `Container`, `GridDivider`. Put them on a `/kitchen-sink` dev-only page so the system is verifiable before any page exists.

**Phase 1 — Chrome + content (0.5d)**
`Header` (sticky, `backdrop-filter: blur(6px)`, 92% bg tint), `Footer`, `layout.tsx`. Transcribe `content/products.ts`, `works.ts`, `site.ts` from the artifact.

**Phase 2 — Home (1d)** — all 7 sections, desktop first.

**Phase 3 — Inner pages (1.5d)** — Giới thiệu, Sản phẩm & dịch vụ, product detail (dynamic route + `generateStaticParams`), Dự án (filter via `?cat=`), Liên hệ (contact table + Google Maps iframe, lazy).

**Phase 4 — Zalo (0.25d)** — OA chat widget in the layout, `/bao-gia` landing, message template, deep links wired through Header/Hero/CtaBand/product pages.

**Phase 5 — Responsive (1d)** — the table in §6, tested at 375 / 768 / 1024 / 1440.

**Phase 6 — SEO, a11y, polish (0.5d)** — metadata, JSON-LD, sitemap, alt text, keyboard nav through the filter chips and form, contrast check on `accent-700` over `#f2f2f3` and `accent-300` over `accent-900`, Lighthouse pass.

**Phase 7 — Deploy (0.5d)** — Vercel, custom domain, `NEXT_PUBLIC_ZALO_OA_ID`, verify the chat bubble reaches the real OA inbox, Search Console + sitemap submit.

*Estimate: ~5.75 developer-days.*

---

## 9. Open items to resolve before/while building

These are real gaps in the source design, not implementation details:

1. **Portfolio images are hotlinked from a third party.** Every `WORKS` and product thumbnail in the artifact points at `https://quangcaonhatrang.com.vn/uploads/…` — another company's server. These cannot ship: it's someone else's content and it's a broken-link risk. Need Giang Design's own photography, or licensed stock, before launch. Until then, build against the `.blueprint` placeholder frames, which the design already handles gracefully.
2. **All contact details are placeholders.** `0909 123 456`, `info@giangdesign.vn`, `sales@giangdesign.vn`, `128 Đường số 7, P. Bình Hưng Hòa, Q. Bình Tân, TP.HCM`, `Giấy phép ĐKKD 0312xxxxxx`. Need the real numbers, the real address (for the map embed and the LocalBusiness schema), and the real business-registration number for the footer.
3. ~~**Products and portfolio describe two different businesses.**~~ **RESOLVED.** The client confirmed the scope: design + advertising printing + signage and fit-out, with **printing first**. The catalogue was restructured around four `SERVICE_GROUPS` (`lib/types.ts`) — In ấn quảng cáo → Ấn phẩm & Bao bì → Bảng hiệu & Thi công → Thiết kế — and seven service entries were added so the signage and design work the portfolio shows is also something the site sells. The packaging entries were kept but demoted to the second pillar; they are a real capability, just not the headline. The follow-on consequence is that quoting forks in two: printing is quoted from a file, everything in *Bảng hiệu & Thi công* is quoted after a site survey (`/bao-gia#khao-sat`).
4. **Stats need verification.** `15+ năm`, `1.200+ công trình/năm` and the six machine capacities are all claims a customer may hold them to. The unverifiable *technical* claims (`ΔE ≤ 3`, Pantone tolerance, soy ink for food packaging) were removed from `/gioi-thieu` rather than left standing, and the commitments there were rewritten as things the workshop can actually be held to. Every remaining placeholder is flagged with ⚠️ in the Keystatic help text and listed in `docs/HUONG-DAN-QUAN-TRI.md` §2b — the client's pre-launch checklist. **The reference price table (`content/blocks/price-list.json`) ships with every "Giá từ" reading `liên hệ` on purpose: a fabricated price is a worse lie than a missing one.**
5. **Zalo & Facebook links.** `SITE.facebook` is still `#`. `SITE.zalo` points at the placeholder hotline — update it with the real number when §9.2 is resolved. A **registered Zalo Official Account is now a launch blocker**, not a nicety: its OA ID drives the chat widget that replaced the quote form.
6. **No dark mode.** The token file has shadow comments referencing "a dark theme", but no dark palette is defined. Out of scope unless requested.
7. **No 404 / loading / error states** in the design. Will be built to match the system.
