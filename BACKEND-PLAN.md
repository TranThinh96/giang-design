# Giang Design – Backend / CMS Plan

How the site gets an admin so a non-developer can change content without a
developer, a deploy, or a monthly bill.

**Current state:** every string on the site lives in `content/site.ts`,
`content/products.ts`, `content/works.ts` (388 lines total). All 19 routes
prerender. There is no database, no API, no auth, no server. See
[PLAN.md](PLAN.md) for the site build itself.

**Recommendation up front:** Keystatic in GitHub mode. ~2 developer-days, $0/mo
extra, no database, and the site stays 100% static.

---

## 1. Scope — what actually needs managing

Be precise about this before picking a tool, because it is the whole decision.

| Data | Volume | Change frequency | Needs a backend? |
|---|---|---|---|
| Products / services | 8 items | a few times a year | yes — editable |
| Portfolio works | 9 items, will grow | monthly-ish | yes — editable |
| Photography | 0 today, ~50–150 eventually | as shot | yes — upload |
| Contact details, hours, licence | 1 record | almost never | yes — editable |
| Process steps, machines, clients, quote notes, stats | ~24 rows | rarely | yes — editable |
| Enquiries / leads | — | — | **no** — they go to Zalo (PLAN.md §5) |
| Orders, pricing, inventory, users | — | — | out of scope |

That table is the argument for the recommendation below: this is a **content**
problem, not an application problem. There are ~30 editable records and one
editor. Anything that introduces a database, a connection pool, a backup policy
and a second hosting bill is over-built for it.

An optional lead-capture phase is in §8 if that changes later.

---

## 2. The options, compared honestly

| | **A. Keystatic** (recommended) | **B. Payload 3** | **C. Sanity** | **D. Custom (Supabase + own admin)** |
|---|---|---|---|---|
| Where content lives | JSON files in this repo | Postgres | Sanity's cloud | Postgres |
| Admin UI | mounts at `/keystatic` in this app | mounts at `/admin` in this app | separate Studio app | you build it |
| Database | **none** | Neon / Supabase required | none (hosted) | required |
| Extra monthly cost | **$0** | $0 on free tiers, fragile | $0 up to 2 users | $0 + your time |
| Editor logs in with | GitHub account | email/password | Google/email | whatever you build |
| Publish latency | ~60–90s rebuild | instant | instant (or rebuild) | instant |
| Site stays fully static | **yes** | no (DB reads) | yes, with webhooks | no |
| Content is version-controlled | **yes — every edit is a git commit** | no | no (history is paid) | no |
| Rollback a bad edit | `git revert` | manual | paid feature | manual |
| Build effort | **~2 days** | ~4 days | ~3 days | ~8+ days |
| Vendor lock-in | none | none | moderate | none |
| Breaks if the vendor dies | no | no | **site content is gone** | no |

### Why A wins here

- **Cheapest that is still real.** No DB means no Neon free-tier autosuspend, no
  connection-pool tuning on serverless, no backup cron, no "who has the DB
  password" problem. The backup *is* the git repo, which already exists.
- **Fastest to build.** The Keystatic schema is TypeScript and maps almost 1:1
  onto the `Product` and `Work` types already written in `content/`. Most of the
  work is transcription, not design.
- **Keeps the site's main advantage.** The site is currently SSG on the edge —
  that is why it is fast and free to serve. A database-backed CMS trades that
  away for instant publishing that nobody here needs. A print shop that updates
  its portfolio twice a month does not care about a 90-second rebuild.
- **Safe for a non-technical editor.** Every save is a commit. A wrong edit is
  one `git revert` away, and you can see exactly who changed what and when.

### When to abandon A and move to B

Real triggers, not hypotheticals — revisit if any of these become true:

1. More than ~2 editors, or an editor who genuinely cannot manage a GitHub login.
2. Portfolio grows past ~200 items or the image library past ~200 MB in-repo.
3. You need to store something users submit (leads, orders) — see §8.
4. You need publish-now, e.g. taking a product offline within seconds.

Migrating A → B later is not wasted work: the content is already normalised
JSON, so it imports into Payload with a script.

---

## 3. Recommended architecture (Option A)

```
                 edits                push              webhook
  Editor ──▶ /keystatic ──▶ GitHub App ──▶ repo (main) ──▶ Vercel build ──▶ static site
  (browser)   (this app)                   content/*.json
```

Nothing new is deployed. `/keystatic` and `/api/keystatic/[...params]` are two
routes added to the existing Next.js app. Content files land in the repo next to
the code. Vercel already rebuilds on push.

**Verified compatible:** `@keystatic/next@5.0.4` declares `next >= 14` and
`react ^18.2.0 || ^19.0.0` — matches this project's Next 15.5.4 / React 19.1.1.

### Packages

```
npm i @keystatic/core @keystatic/next
```

Two dependencies. No database driver, no ORM, no migration tool.

### New files

```
keystatic.config.ts                     schema (see §4)
app/keystatic/layout.tsx                admin shell
app/keystatic/[[...params]]/page.tsx    admin UI
app/api/keystatic/[...params]/route.ts  GitHub OAuth + commit API
lib/content.ts                          reader — replaces the content/*.ts exports
content/products/*.json                 8 files, one per product
content/works/*.json                    N files, one per portfolio item
content/settings.json                   the SITE singleton
content/blocks/*.json                   stats, steps, machines, clients, quote notes
```

`content/products.ts`, `works.ts` and `site.ts` are deleted at the end of Phase
3 — but the **types stay**, moved into `lib/content.ts`, so no component changes
shape.

### Storage config

```ts
storage:
  process.env.NODE_ENV === 'development'
    ? { kind: 'local' }                                  // edit files directly, no auth
    : { kind: 'github', repo: 'ThinhTV9/giang-design' }  // prod: commits via GitHub App
```

Local mode means a developer never needs the GitHub App to work on the site.

---

## 4. Schema mapping

Direct translation of the existing types. Nothing is redesigned.

### `products` collection → `content/products/*.json`

| Keystatic field | From `Product` | Notes |
|---|---|---|
| `fields.slug({ name, slug })` | `name` + `slug` | slug auto-derives from name; editor can override. Filename = slug, so URLs are stable |
| `fields.text` | `code` | `SP-01` |
| `fields.integer` | *new* — `order` | **required**: files in a directory have no inherent order. Sort by it in the reader |
| `fields.text` | `moq`, `materialsShort` | |
| `fields.text({ multiline: true })` | `blurb`, `long` | |
| `fields.array(fields.object({ k, v }))` | `specs` | `itemLabel: p => p.fields.k.value` so the editor sees row names, not "Item 1" |
| `fields.array(fields.text())` | `materials` | the `.tag-outline` chips |
| `fields.image({ directory: 'public/products', publicPath: '/products/' })` | `image` | optional — falls back to the blueprint placeholder, exactly as today |

`slot` (`"gd-p1"`) is placeholder-label plumbing, not editorial content. Drop it
from the schema and derive it in the reader from the index, or keep it as a
hidden constant. Do not put it in front of the editor.

### `works` collection → `content/works/*.json`

`title` (slug field) · `order` · `cat` as `fields.select` over the five
categories from `CATS` — **a select, not free text**, or the filter chips on
`/du-an` break the moment someone types "Bảng hiệu và Hộp đèn" · `spec` · `ph`
(placeholder caption) · `image`.

Keep `CATS` as the single source of truth: the select options and the filter
chips both read it.

### `settings` singleton → `content/settings.json`

The whole `SITE` object: name, tagline, description, phone, phoneHref, zalo,
facebook, both emails, the four address parts, hours, licence, url.

This one screen closes **PLAN.md §9.2 and §9.5** — the owner fills in the real
phone, address, licence number and Zalo/Facebook links without a developer.

Derive `phoneHref` and the `zalo` deep link from `phone` in the reader rather
than asking the editor to keep three fields in sync. `CONTACTS` is already
derived from `SITE` — keep it that way.

### `blocks` singletons → `content/blocks/*.json`

`stats` (3) · `steps` (5) · `machines` (6) · `clients` (6) · `quoteNotes` (4).
Each is one singleton holding one array. These are the numbers PLAN.md §9.4
flags as unverified claims — putting them behind an editor is how they get
corrected.

---

## 5. Rewiring the pages

Today: `import { PRODUCTS } from '@/content/products'` (synchronous const).
After: an async reader, still resolved at build time.

```ts
// lib/content.ts
import { createReader } from '@keystatic/core/reader';
import config from '@/keystatic.config';

const reader = createReader(process.cwd(), config);

export async function getProducts(): Promise<Product[]> {
  const entries = await reader.collections.products.all();
  return entries
    .map(e => ({ slug: e.slug, ...e.entry }))
    .sort((a, b) => a.order - b.order);
}
```

`createReader` hits the local filesystem, so this runs at build time and every
route stays prerendered — the reader is **not** a runtime API call and adds
nothing to page latency.

Call sites to change (all already Server Components, so `await` is the only edit):

- [app/page.tsx](app/page.tsx) — featured works `slice(0, 6)`, service grid
- [app/san-pham-dich-vu/page.tsx](app/san-pham-dich-vu/page.tsx)
- `app/san-pham-dich-vu/[slug]/page.tsx` — including `generateStaticParams` and `generateMetadata`
- [app/du-an/page.tsx](app/du-an/page.tsx) — passes works to the client filter
- [app/lien-he/page.tsx](app/lien-he/page.tsx), [app/bao-gia/page.tsx](app/bao-gia/page.tsx), [app/gioi-thieu/page.tsx](app/gioi-thieu/page.tsx)
- [app/layout.tsx](app/layout.tsx) — LocalBusiness JSON-LD reads `settings`
- [app/sitemap.ts](app/sitemap.ts), [app/robots.ts](app/robots.ts)
- `components/layout/Header.tsx`, `Footer.tsx` — take settings as props, or
  `await getSettings()` directly since both are server components

**Keep the exported types identical.** If `getProducts()` returns the same
`Product[]` shape the components already consume, not a single presentational
component changes. That is the difference between a 2-day job and a 4-day one.

---

## 6. Auth, access and hardening

- **Login is GitHub.** Keystatic's setup wizard at `/keystatic/setup` generates a
  GitHub App; it writes four env vars (`KEYSTATIC_GITHUB_CLIENT_ID`,
  `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`,
  `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`). Add them in Vercel and to
  `.env.example` as names only.
- **Who can edit = who has repo write access.** Create one GitHub account for
  the client, invite them as a collaborator with Write. Removing access is
  removing the collaborator. No user table to maintain.
- **Never commit the secrets.** They go in Vercel env vars only; `.gitignore`
  already covers `.env.local` — verify before the first push.
- **Keep `/keystatic` out of Google.** Add a `noindex` header for the
  `/keystatic` and `/api/keystatic` paths in `next.config.ts`, and confirm
  `sitemap.ts` doesn't emit them. Unauthenticated visitors only see a login
  screen, but it should not be indexed.
- **Branch strategy.** Start with direct commits to `main` — one editor, small
  site, git history is the safety net. If a second editor appears, flip
  Keystatic to PR mode so edits land as pull requests with a Vercel preview
  before they go live.

---

## 7. Images — the piece that actually unblocks launch

PLAN.md §9.1 is currently the site's biggest gap: every photo in the design
artifact was hotlinked from a third party's server and none of it shipped.

`fields.image()` gives the client a drag-and-drop upload that writes the file
into `public/products/` or `public/works/` and commits it. `next/image` then
does the rest, and `ImageSlot` already fixes the aspect ratios so nothing shifts.

Guardrails to set on day one, because git repos are bad at binaries:

- Tell the client: **≤ 400 KB per photo, JPEG or WebP, ≥ 1600 px wide.** Put it
  in the handover doc. A phone photo straight off the camera is 4–8 MB and will
  bloat the repo permanently — git never forgets a large file.
- Budget: ~150 photos × 400 KB ≈ 60 MB. Comfortable. Past ~200 MB, move images
  to Cloudinary (`fields.cloudImage()`, free tier) — that swap is a schema
  field change, not a re-architecture.
- Consider a pre-commit hook or a CI check that rejects files over ~1 MB under
  `public/`.

---

## 8. Optional — if you later need to store leads

Not recommended now. PLAN.md §5 deliberately routes enquiries to Zalo, which is
where this customer base already talks to suppliers, and that decision is the
reason the site has no backend at all. Adding a form re-introduces spam
handling, rate limiting, deliverability and a place for personal data to sit.

If the client does want a record of enquiries, in ascending order of cost:

1. **Zalo OA inbox as-is.** It already is the record — searchable, on their
   phone, $0, zero code. Start here.
2. **Server Action → Google Sheet** (service account, `googleapis`). ~half a
   day, $0/mo, the client reads leads in an app they already use. No DB, no
   admin UI to build. This is the right answer for 95% of print shops.
3. **Neon/Supabase free Postgres + a `leads` table + a password-gated
   `/admin/leads` page.** ~1.5 days, $0/mo on free tiers but now you own a
   database, a backup story and a personal-data footprint. Only worth it if
   leads need statuses, assignment or export.

Whichever is chosen: honeypot field + a simple per-IP rate limit, and a privacy
line on the form. Do not skip those.

---

## 9. Build phases

| Phase | Work | Est. |
|---|---|---|
| **0 — Spike** | Install `@keystatic/core` + `@keystatic/next`, mount the two routes, `storage: local`, one throwaway collection. Confirm the admin loads under Next 15 / React 19 and Tailwind v4 doesn't leak styles into the Keystatic UI. **Stop here if it doesn't work** — cheap exit before any migration. | 0.25d |
| **1 — Schema** | `keystatic.config.ts`: `products`, `works` collections; `settings` and the five `blocks` singletons. Vietnamese labels and `description` help-text on every field — this is what makes it usable by the owner, not by you. | 0.5d |
| **2 — Migrate content** | One throwaway Node script: import the existing `content/*.ts` consts, write out `content/products/*.json`, `works/*.json`, `settings.json`, `blocks/*.json` with `order` added. Zero hand-typing, zero transcription errors. Delete the script after. | 0.25d |
| **3 — Rewire** | `lib/content.ts` reader + the call sites in §5. Types unchanged. `npm run typecheck` and `npm run build` must both pass with all 19 routes still prerendering — that is the acceptance test. | 0.5d |
| **4 — GitHub App + deploy** | Run `/keystatic/setup`, create the App, set the four env vars in Vercel, switch prod storage to `github`. Invite the client's GitHub account. Make one real edit end-to-end and watch it land on the live site. | 0.25d |
| **5 — Handover** | `noindex` headers, image guardrails, and a **one-page Vietnamese guide** — how to log in, add a product, add a portfolio item, change the phone number, undo a mistake. Walk the client through it live once. | 0.5d |

**Total ≈ 2.25 developer-days.** Compare: Payload ≈ 4 days plus a database to
own forever; a custom admin ≈ 8+.

### Acceptance criteria

- Client logs in at `/keystatic` with their own GitHub account and, unaided,
  adds a portfolio item with a photo that appears live within two minutes.
- `npm run build` still prerenders all 19 routes; no route becomes dynamic.
- Lighthouse scores are unchanged from before the CMS.
- Deleting `content/products.ts` breaks nothing.
- A bad edit is undone with one `git revert`.

---

## 10. Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Client won't/can't use a GitHub login | medium | Create the account for them and save the password in their browser; they see a login button, not GitHub itself. If it truly fails → Option B. |
| Keystatic UI clashes with Tailwind v4 globals | low | Phase 0 spike catches it; the admin route group gets its own layout without `globals.css` if needed. |
| Large photos bloat the repo | **high** — this is the one that actually bites | Size rule in the handover doc + a CI file-size check. Fix it before the first upload, not after. |
| Keystatic is a small project (Thinkmill) and could stall | low-medium | Content is plain JSON in your own repo. If Keystatic disappears, the site keeps building; you replace the admin, not the content. This is the whole point of choosing a git-based CMS. |
| Editor renames a product → slug changes → URL 404s and loses SEO | medium | Slug field is separate from name and does not auto-update after creation. Say so in the handover doc. |
| Rebuild latency confuses the client ("I saved, nothing changed") | medium | Handover doc: "changes appear in about 1 minute." Optionally surface the Vercel deploy status. |

---

## 11. Decision

Build Option A. Revisit only against the four triggers in §2. Do not add a
database until something actually needs to be written by a website visitor.
