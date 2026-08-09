# CLAUDE.md

Guidance for AI assistants working in this repository.

## What this is

Marketing site for **Giang Design – Advertising**, an offset & digital printing
workshop in TP.HCM. Single locale (`vi-VN`). Six public routes plus eight
generated product pages, all prerendered.

**No database, no server, no forms.** Content is JSON committed in this repo and
edited through Keystatic; quotes go through Zalo chat, not a form. If a task
seems to need an API route, a form handler, a database or an email service,
that is a departure from the architecture — read `BACKEND-PLAN.md` §2 and §11
first and say so before building it.

Stack: Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS
v4 · Keystatic (GitHub storage in prod, local in dev) · deployed on Vercel.

## Commands

```bash
npm install            # or npm ci
npm run dev            # dev server on :3000; /keystatic runs in local mode
npm run build          # production build — must prerender 19 routes
npm run typecheck      # tsc --noEmit
npm run check:images   # fails if any file under public/ exceeds 1 MB
```

**Before committing, run `npm run typecheck` and `npm run build`.** CI
(`.github/workflows/ci.yml`) runs `check:images` → `typecheck` → `build` on
every push to `main` and every PR. There is no test suite.

**Do not run `npm run lint`.** The script is `next lint`, which is deprecated in
Next 15, has no ESLint config in this repo, and drops into an interactive setup
prompt that will hang a non-interactive shell. CI does not run it. Type errors
are caught by `typecheck` and by `build`.

## Architecture

### The content pipeline

```
/keystatic (admin UI)  →  content/*.json  →  lib/content.ts  →  Server Components
       ↑ keystatic.config.ts defines the schema for both ends
```

- `keystatic.config.ts` — the editing schema. Labels and help text are
  **Vietnamese** throughout; the editor is the shop owner, not a developer.
  Storage is `local` in development (edits your working tree, no auth) and
  `github` (repo `TranThinh96/giang-design`) in production.
- `content/` — `products/*.json` (8), `works/*.json` (9), `settings.json`,
  `blocks/*.json` (stats, steps, machines, clients, quote-notes).
- `lib/content.ts` — **the only module that reads `content/`.** It is
  `import "server-only"` and uses `createReader` against the filesystem at build
  time, so every call site stays a prerendered Server Component.
- `lib/types.ts` — shapes plus the fixed taxonomy (`NAV`, `WORK_CATS`, `CATS`,
  `ALL_CATS`).

**Rules that hold this together:**

1. **Pages never import `content/` directly.** Always go through
   `lib/content.ts`.
2. **`lib/types.ts` must stay free of Node built-ins and of
   `@keystatic/core/reader`.** Client components (`Header`, `FilterableWorks`)
   import runtime values from it; anything touching `fs` would land in the
   browser bundle. That split is why the two files exist.
3. **Several fields are derived in the reader, not stored** — never add them to
   the schema:

   | Derived | From |
   |---|---|
   | `phoneHref` (`tel:+84…`), `zalo` (`zalo.me` deep link) | `phone`, however the editor types it |
   | `address.full` | the three address parts |
   | step numbering `01`, `02`… | list position |
   | `slot` (`gd-p1`, `gd-w1`…) | list position |

   `order` *is* stored — files in a directory have no inherent order, and the
   reader sorts on it.

### Routing

```
app/
  layout.tsx              document shell ONLY — <html>, globals.css. Keep it bare.
  (site)/                 the public site; owns chrome + metadata
    layout.tsx            generateMetadata from settings; renders <SiteChrome>
    page.tsx              home
    gioi-thieu/           about
    san-pham-dich-vu/     product index + [slug] detail (SSG via generateStaticParams)
    du-an/                portfolio, client-side category filter
    bao-gia/              quote landing (Zalo CTAs + copyable message template)
    lien-he/              contact + embedded map
  keystatic/              admin SPA (dynamic, noindex)
  api/keystatic/          GitHub OAuth + commit API (dynamic)
  not-found.tsx           outside (site) — it must answer unmatched URLs
  globals.css             design tokens (@theme) + component classes
  fonts.css               @font-face for the self-hosted Roboto subsets
```

Header, footer, Zalo widget and the LocalBusiness JSON-LD live in
`components/layout/SiteChrome.tsx`, **not** in the root layout. Anything added
to the root layout also renders around the Keystatic admin. `not-found.tsx`
wraps itself in `SiteChrome` for the same reason.

`SiteChrome` reads settings once on the server and passes them down as props —
`Header` is a Client Component (it owns the mobile tray state) and cannot await
the reader.

### Everything stays static

The build must show exactly two `ƒ (Dynamic)` routes:
`/keystatic/[[...params]]` and `/api/keystatic/[...params]`. If a change turns a
marketing route dynamic, that is a regression. Two existing patterns exist
precisely to avoid it:

- `/bao-gia` reads `?hang-muc=` **client-side** in `QuoteBrief`
  (`useSearchParams` inside `<Suspense>`), not from the page's `searchParams`.
- Metadata built from CMS values uses `generateMetadata`, still resolved at
  build time.

One more deliberate shape: `app/api/keystatic/[...params]/route.ts` builds its
handler lazily on first request. At module scope, `makeRouteHandler` throws in
`github` mode without the four env vars — during "Collecting page data", which
would fail the **entire site build** over an admin-only misconfiguration.

## The design system

`DESIGN.md` is the source; `app/globals.css` is the whole implementation.
Tailwind v4 is CSS-first — **there is no `tailwind.config.js`**. Tokens go in
the `@theme` block (each becomes both `var(--color-x)` and a utility like
`bg-primary`); reusable classes go in `@layer components`.

Compose pages from the existing vocabulary rather than ad-hoc utilities:
`.tile` + `.tile-light|parchment|dark|dark-2|dark-3|brand`, `.shell` (980px,
text) / `.shell-wide` (1440px, grids), `.t-*` type scale, `.eyebrow` +
`.eyebrow-on-dark|-on-brand`, `.btn` + `.btn-primary|-secondary|-utility|
-pearl|-hero|-compact|-icon|-on-brand`, `.card`, `.chip`, `.tag`, `.media`,
`.table`, `.input`.

Every colour is pulled from the workshop's sign — the blue field, the gold
monogram, the warm near-black behind it. The palette is not decoration laid
over the design; it *is* the logo, which is why the closing CTA band can be a
full field of the accent and still read as the brand.

**Five rules the system does not bend on:**

1. **One accent.** Giang Blue `#1a4ad8` — the sign's own blue — carries every
   interactive element. `.link-on-dark` / `.btn-secondary-on-dark` swap to Sky
   Link Blue `#5c8bff` on near-black tiles only — never on a light surface.

2. **Gold marks the label, blue marks the action.** The logo's gold
   (`.eyebrow`, `#8a5c14` on light / `#e0a44f` on dark) is the only other
   brand colour, and it is never a link, a button or a pressable border. The
   monogram's teal, yellow and red stay in the mark and never enter the UI.

   `.tile-brand` — the blue field — appears **once per page**, on the closing
   CTA band, and its pills invert (`.btn-on-brand`). `.btn-primary` on it
   would be blue on blue.
3. **The colour change is the divider.** Tiles stack edge-to-edge, no gap, no
   rounding, no rules or borders between sections. Reach for the next surface
   before reaching for chrome.
4. **One shadow.** `--shadow-product` / `.product-shadow`, applied via
   `<ImageSlot elevated />`, belongs to product photography resting on a
   surface — never to a card, a button or text.
5. **Body copy is 17px**, and the weight ladder is 300 / 400 / 600 / 700 with
   **500 deliberately absent**. Headings are 600, never 700.

SF Pro is Apple's and cannot be shipped, so the font stack leads with
`-apple-system` / `system-ui` and falls back to the self-hosted Roboto, which
carries the Vietnamese diacritics. Nothing is preloaded — most visitors never
fetch a font file. Only 300/400/700 woff2 are shipped (a 600 request resolves up
to 700).

## Conventions

- **Vietnamese for anything a human reads** — page copy, CMS labels and help
  text, error messages thrown by `lib/content.ts`. Code, identifiers and code
  comments are English.
- **Comments explain *why*, not *what*.** Existing files carry short doc
  comments on non-obvious decisions (why the header is a client component, why
  the route handler is lazy, why 2.41 line-height is intentional). Match that
  density — don't narrate the obvious, don't strip the rationale.
- Imports use the `@/*` alias (`@/lib/content`, `@/components/ui/ImageSlot`).
- Server Components by default; `"use client"` only where state is genuinely
  needed (`Header`, `FilterableWorks`, `QuoteBrief`).
- Pages that need several content blocks fetch them with one `Promise.all`.
- Every image goes through `components/ui/ImageSlot.tsx`, which fixes the
  aspect ratio (CLS 0) and renders a plain parchment placeholder with a label
  when there is no photo yet. Pass a real `sizes`.
- Structured data (`LocalBusiness`, `Product`) is inline JSON-LD built from CMS
  values.

## Things that will bite you

- **Product slugs are the public URL and the filename.** Changing one breaks
  live links and search results. The CMS help text warns the editor; don't
  rename them casually either.
- **Portfolio categories are a fixed `select`, not free text.** The list is
  `WORK_CATS` in `lib/types.ts` and feeds both the Keystatic schema and the
  filter chips on `/du-an`. Adding a category is a code change **on purpose** —
  do not turn it into a text field.
- **Images: ≤ 400 KB, JPEG or WebP, ≥ 1600 px wide.** Git keeps large files
  forever. `check:images` hard-fails over 1 MB under `public/` (excluding
  `public/fonts/`) and warns over 400 KB. It runs in CI rather than as a
  pre-commit hook because the client's uploads are committed by the GitHub App
  server-side and never pass through a developer's machine. Past ~200 MB total,
  move the library to Cloudinary via `fields.cloudImage()` (BACKEND-PLAN.md §7).
- **`public/products/` and `public/works/` don't exist yet** — Keystatic creates
  them on first upload. Every image slot currently renders its placeholder.
- **Env vars are optional in dev.** Without `NEXT_PUBLIC_ZALO_OA_ID` the chat
  widget simply doesn't render and no third-party script loads; every quote CTA
  still opens the derived `zalo.me` deep link. The four `KEYSTATIC_*` /
  `NEXT_PUBLIC_KEYSTATIC_*` vars are production-only. See `.env.example`.
  Never commit real values.
- **Content still holds placeholders** — phone `0774999107`, `ĐKKD 0312xxxxxx`,
  the Bình Tân address, and unverified stats (`15+ năm`, `ΔE ≤ 3`, machine
  capacities). They are editable at `/keystatic`; don't treat them as facts.
- **Portfolio and product ranges describe adjacent businesses** (signage/booths
  vs. offset print). Known open item — PLAN.md §9.3.

## Git workflow

- Develop on the branch you were assigned; never push to `main` directly.
- Commit messages: imperative, one line of what changed and why it matters.
- Keystatic edits in production commit straight to `main` from the GitHub App,
  which suits one editor with git history as the safety net. With a second
  editor, switch Keystatic to PR mode.
- Don't open a PR unless asked.

## Reference documents

| File | What it holds |
|---|---|
| `README.md` | Setup, scripts, layout, deploy steps |
| `DESIGN.md` | The visual language — tokens, type ramp, components, do's/don'ts |
| `PLAN.md` | Content spec, component inventory, and §9 open questions |
| `BACKEND-PLAN.md` | Why Keystatic over a CMS/database, schema mapping, §12 "As built" (plan-vs-reality deltas), what's still open |
| `docs/HUONG-DAN-QUAN-TRI.md` | Vietnamese handover guide for the client |

`BACKEND-PLAN.md` §12 is the most useful read before changing the content layer:
it records every place the built system deliberately departs from the plan, and
why.
