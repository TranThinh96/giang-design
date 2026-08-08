# Giang Design – Advertising

Marketing site for an offset & digital printing workshop in TP.HCM. Built from
the approved design artifact — see [PLAN.md](PLAN.md) for the full spec and the
open content questions.

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Zalo OA chat.
Single locale (`vi-VN`). No backend — enquiries go to Zalo.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — only the Zalo OA widget needs it
npm run dev
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Production build (all 19 routes prerender) |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |

## Layout

```
app/
  layout.tsx              shell, metadata, LocalBusiness JSON-LD, font preloads
  page.tsx                home — hero, featured, services, process, capability, CTA
  gioi-thieu/             about
  san-pham-dich-vu/       product index + [slug] detail (SSG, 8 pages)
  du-an/                  portfolio with client-side category filter
  bao-gia/                quote landing — Zalo/phone CTAs + message template
  lien-he/                contact + map
  globals.css             design tokens (@theme) + component classes
  fonts.css               generated @font-face for the self-hosted subsets
components/               layout, ui, home, portfolio, quote, zalo
content/                  products.ts, works.ts, site.ts — all site copy
public/fonts/             Roboto + Roboto Condensed woff2 (vi / latin-ext / latin)
```

## Editing content

Everything a non-developer would change lives in `content/`:

- **`site.ts`** — phone, emails, address, hours, licence, nav, stats, process
  steps, machines, client sectors, quote-page notes.
- **`products.ts`** — the eight print categories, their spec tables and materials.
- **`works.ts`** — portfolio items and their categories.

No CMS. Adding a product means adding one object with a unique `slug`; the
detail page and sitemap entry follow automatically.

`SITE.zalo` is the deep link every Zalo button opens — keep it as
`https://zalo.me/<hotline digits>`.

## Images

Every image slot renders a blueprint placeholder. The design artifact hotlinked
its photography from a third party's server, so none of it shipped. To enable a
slot, drop the file in `public/` and set `image` on the product or work — the
placeholder disappears and `next/image` takes over. Aspect ratios are fixed in
`ImageSlot`, so adding photos will not shift the layout.

## Quotes go through Zalo

There is no form, no email service and no file storage. Two pieces:

- **`components/zalo/ZaloChat.tsx`** — Zalo's Official Account plugin, mounted
  once in `app/layout.tsx`, giving every page a floating chat bubble. It renders
  only when `NEXT_PUBLIC_ZALO_OA_ID` is set, and the SDK is `lazyOnload` so it
  never competes with first paint.
- **`app/bao-gia/`** — the quote landing. Zalo / phone / email buttons plus
  `QuoteBrief`, which renders the old form's fields as a message template the
  visitor copies and pastes into the chat. Product pages link in as
  `/bao-gia?hang-muc=<tên>`; the param pre-fills the first line. That param is
  read client-side so the route stays prerendered.

Design files (.ai/.pdf/.cdr) are sent inside the Zalo conversation, which is why
the 50MB upload path in the original plan is gone.

Without the OA ID the widget is absent but nothing breaks — every CTA still
opens `SITE.zalo`.

## Deploying

Vercel. Set `NEXT_PUBLIC_ZALO_OA_ID`, point `SITE.url` in `content/site.ts` at
the real domain (it feeds canonicals, the sitemap and JSON-LD), then submit
`/sitemap.xml` to Search Console.
