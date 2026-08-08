# Giang Design – Advertising

Marketing site for an offset & digital printing workshop in TP.HCM. The visual
language is [DESIGN.md](DESIGN.md): full-bleed tiles that alternate light,
parchment and near-black, one blue accent for every interactive element, and
exactly one drop-shadow — reserved for product photography. See
[PLAN.md](PLAN.md) for the content spec and the open questions.

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Keystatic (GitHub mode)
· Zalo OA chat. Single locale (`vi-VN`). No database, no server — content is
JSON in this repo and every marketing route is prerendered.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — only the Zalo OA widget needs it in dev
npm run dev
```

The admin is at [localhost:3000/keystatic](http://localhost:3000/keystatic). In
development it uses **local** storage: it edits `content/*.json` in your working
tree directly, with no login and no GitHub App.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Production build (all 19 routes prerender) |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check:images` | Fails if anything under `public/` exceeds 1 MB |

## Layout

```
app/
  layout.tsx              document shell only — <html>, globals.css, font preloads
  (site)/                 the public site; this group owns the chrome + metadata
    layout.tsx            site metadata; renders SiteChrome
    page.tsx              home — hero, featured, services, process, capability, CTA
    gioi-thieu/           about
    san-pham-dich-vu/     product index + [slug] detail (SSG, 8 pages)
    du-an/                portfolio with client-side category filter
    bao-gia/              quote landing — Zalo/phone CTAs + message template
    lien-he/              contact + map
  keystatic/              the admin UI (dynamic, noindex)
  api/keystatic/          GitHub OAuth + commit API (dynamic)
  not-found.tsx           answers unmatched URLs, so it sits outside (site)
  globals.css             design tokens (@theme) + component classes
  fonts.css               generated @font-face for the self-hosted subsets
keystatic.config.ts       the editing schema — labels and help text in Vietnamese
lib/
  types.ts                shapes + fixed taxonomy; safe to import from the client
  content.ts              build-time reader; the only module that touches content/
content/                  products/*.json, works/*.json, settings.json, blocks/*.json
components/               layout, ui, home, portfolio, quote, zalo
scripts/                  check-image-budget.mjs
docs/HUONG-DAN-QUAN-TRI.md  Vietnamese guide for the client
public/fonts/             Roboto 300/400/700 woff2 (vi / latin-ext / latin)
```

The `(site)` route group exists so `/keystatic` renders the admin on a bare
page. Header, footer, Zalo widget and the LocalBusiness JSON-LD all live in
`components/layout/SiteChrome.tsx`, not in the root layout — anything added to
the root layout also lands on the admin.

## The design system

`app/globals.css` is the whole of it: `@theme` holds the tokens from
[DESIGN.md](DESIGN.md), `@layer components` holds the classes the pages
actually use — `.tile` + `.tile-light|parchment|dark|dark-2|dark-3` for the
full-bleed sections, `.t-*` for the type scale, `.btn` + `.btn-primary`
/`-secondary`/`-utility`/`-hero`/`-compact` for the two button grammars,
`.card`, `.chip`, `.media`.

Four rules the system will not bend on, all of them from DESIGN.md:

- **One accent.** Action Blue `#0066cc` carries every interactive element.
  `.link-on-dark` swaps to Sky Link Blue on the near-black tiles, where Action
  Blue disappears; it is never used on a light surface.
- **The colour change is the divider.** Tiles stack edge-to-edge with no gap
  and no rounding. Reach for the next surface before reaching for chrome.
- **One shadow.** `--shadow-product` belongs to product photography resting on
  a surface (`<ImageSlot elevated />`) — never to a card, a button or text.
- **Body copy is 17px**, and the weight ladder is 300 / 400 / 600 / 700 with
  500 deliberately absent.

SF Pro is Apple's and cannot be shipped, so the stack leads with `-apple-system`
/`system-ui` — the real thing on Apple platforms, the platform UI face
elsewhere — and falls back to the self-hosted Roboto, which is what carries the
Vietnamese diacritics. Nothing is preloaded: most visitors never fetch a font
file at all.

## Editing content

The client edits at `/keystatic`; every save is a commit and Vercel rebuilds.
See [BACKEND-PLAN.md](BACKEND-PLAN.md) for why it is built this way, and
[docs/HUONG-DAN-QUAN-TRI.md](docs/HUONG-DAN-QUAN-TRI.md) for the client-facing
guide.

Pages never import `content/` directly — they call `lib/content.ts`, which reads
the JSON from the filesystem at build time and returns the same `Product`,
`Work` and `SiteSettings` shapes the components have always consumed.

Several fields are **derived in the reader** rather than stored, so the editor
cannot let them drift apart:

| Derived | From |
|---|---|
| `phoneHref` (`tel:+84…`), `zalo` (deep link) | `phone`, however it is typed |
| `address.full` | the three address parts |
| step numbering `01`, `02`… | list position |
| `slot` (placeholder ids) | list position |

`order` is stored, because files in a directory have no inherent order — the
reader sorts on it.

Product **slugs are the public URL** and the filename. `keystatic.config.ts`
warns the editor not to change them after publishing; the handover doc repeats it.

Portfolio categories are a `select`, not free text. The list lives in
`lib/types.ts` as `WORK_CATS` and feeds both the schema and the filter chips on
`/du-an`, so the two can never disagree — adding a category is a code change on
purpose.

## Images

Slots without a photo render a plain parchment field with the slot's label; the
client uploads real
ones through `/keystatic`, which writes into `public/products/` or
`public/works/` and commits them. Aspect ratios are fixed in `ImageSlot`, so
adding photos will not shift the layout.

**Budget: ≤ 400 KB per photo, JPEG or WebP, ≥ 1600 px wide.** Git keeps large
files forever, so `npm run check:images` fails on anything over 1 MB under
`public/` and CI runs it before the build. It runs in CI rather than as a
pre-commit hook because the client's uploads are committed by the GitHub App
server-side and never pass through a developer's machine.

Past ~200 MB total, move the library to Cloudinary via `fields.cloudImage()` —
a schema field change, not a re-architecture.

## Quotes go through Zalo

There is no form, no email service and no file storage. Two pieces:

- **`components/zalo/ZaloChat.tsx`** — Zalo's Official Account plugin, mounted
  once in `SiteChrome`, giving every page a floating chat bubble. It renders
  only when `NEXT_PUBLIC_ZALO_OA_ID` is set, and the SDK is `lazyOnload` so it
  never competes with first paint.
- **`app/(site)/bao-gia/`** — the quote landing. Zalo / phone / email buttons plus
  `QuoteBrief`, which renders the old form's fields as a message template the
  visitor copies and pastes into the chat. Product pages link in as
  `/bao-gia?hang-muc=<tên>`; the param pre-fills the first line. That param is
  read client-side so the route stays prerendered.

Design files (.ai/.pdf/.cdr) are sent inside the Zalo conversation, which is why
the 50MB upload path in the original plan is gone.

Without the OA ID the widget is absent but nothing breaks — every CTA still
opens the derived `zalo.me` deep link.

## Deploying

Vercel.

1. Set `NEXT_PUBLIC_ZALO_OA_ID`.
2. Deploy, then open `/keystatic/setup` on the deployed URL. The wizard creates
   a GitHub App and prints four values — `KEYSTATIC_GITHUB_CLIENT_ID`,
   `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`,
   `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`. Put them in the project's
   environment variables and redeploy. They belong in Vercel only, never in the
   repo.
3. Invite the client's GitHub account to the repo as a collaborator with
   **Write**. Repo write access *is* the permission model — removing access is
   removing the collaborator, and there is no user table.
4. Set the real domain in the CMS (**Thông tin doanh nghiệp → Địa chỉ website**);
   it feeds canonicals, the sitemap and the JSON-LD. Then submit `/sitemap.xml`
   to Search Console.

Until step 2 is done the marketing site builds and serves normally — only
`/api/keystatic/*` errors, by design: an admin misconfiguration must not take
the site's deploy down.

Edits commit straight to `main`, which suits one editor and a git history as the
safety net. With a second editor, switch Keystatic to PR mode so edits arrive as
pull requests with a Vercel preview.
