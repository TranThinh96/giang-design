---
version: alpha
name: Apple-design-analysis
description: A photography-first interface that turns marketing into a museum gallery. Edge-to-edge product tiles alternate light and dark canvases, framed by display headlines with negative letter-spacing and a single Giang Blue (#2f51a7) interactive color drawn from the workshop's own sign. UI chrome recedes so the product can speak — no decorative gradients, no shadows on chrome, only the one signature drop-shadow under product imagery resting on a surface.

colors:
  primary: "#2f51a7"
  primary-hover: "#244189"
  primary-focus: "#3861c7"
  primary-on-dark: "#7ba0ea"
  primary-wash: "#f0f3f9"
  primary-wash-2: "#e2e7f3"
  primary-hairline: "#c8d0e4"
  zalo: "#0068ff"
  brand-gold: "#8a5c14"
  brand-gold-on-dark: "#e0a44f"
  ink: "#1d1b18"
  body: "#1d1b18"
  body-on-dark: "#ffffff"
  body-muted: "#cad0dd"
  ink-muted-80: "#34302b"
  ink-muted-48: "#6f6961"
  divider-soft: "#f1eeea"
  hairline: "#e2ded7"
  hairline-on-dark: "#3c4867"
  canvas: "#ffffff"
  canvas-parchment: "#f6f4f0"
  surface-pearl: "#fbfaf7"
  surface-tile-1: "#19233e"
  surface-tile-2: "#202c4b"
  surface-tile-3: "#11192c"
  surface-black: "#11192c"
  surface-chip-translucent: "#d7d2ca"
  on-primary: "#ffffff"
  on-dark: "#ffffff"
  on-brand: "#ffffff"
  on-brand-muted: "#d4dbed"

logo-only:
  logo-teal: "#57c4b8"
  logo-yellow: "#efe153"
  logo-red: "#de3a2a"

typography:
  hero-display:
    fontFamily: "SF Pro Display, system-ui, -apple-system, sans-serif"
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.07
    letterSpacing: -0.28px
  display-lg:
    fontFamily: "SF Pro Display, system-ui, -apple-system, sans-serif"
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: 0
  display-md:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 34px
    fontWeight: 600
    lineHeight: 1.47
    letterSpacing: -0.374px
  lead:
    fontFamily: "SF Pro Display, system-ui, -apple-system, sans-serif"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: 0.196px
  lead-airy:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 24px
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: 0
  tagline:
    fontFamily: "SF Pro Display, system-ui, -apple-system, sans-serif"
    fontSize: 21px
    fontWeight: 600
    lineHeight: 1.19
    letterSpacing: 0.231px
  body-strong:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.24
    letterSpacing: -0.374px
  body:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.47
    letterSpacing: -0.374px
  dense-link:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 2.41
    letterSpacing: 0
  caption:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: -0.224px
  caption-strong:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.29
    letterSpacing: -0.224px
  button-large:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 18px
    fontWeight: 300
    lineHeight: 1.0
    letterSpacing: 0
  button-utility:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.29
    letterSpacing: -0.224px
  fine-print:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: -0.12px
  micro-legal:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: -0.08px
  nav-link:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: -0.12px

rounded:
  none: 0px
  xs: 5px
  sm: 8px
  md: 11px
  lg: 18px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 17px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 80px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: 11px 22px
  button-primary-focus:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
  button-primary-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
  button-secondary-pill:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: 11px 22px
  button-dark-utility:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button-utility}"
    rounded: "{rounded.sm}"
    padding: 8px 15px
  button-pearl-capsule:
    backgroundColor: "{colors.surface-pearl}"
    textColor: "{colors.ink-muted-80}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  button-store-hero:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-large}"
    rounded: "{rounded.pill}"
    padding: 14px 28px
  button-icon-circular:
    backgroundColor: "{colors.surface-chip-translucent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: 44px
  text-link:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.body}"
  text-link-on-dark:
    backgroundColor: transparent
    textColor: "{colors.primary-on-dark}"
    typography: "{typography.body}"
  global-nav:
    backgroundColor: "{colors.surface-black}"
    textColor: "{colors.on-dark}"
    typography: "{typography.nav-link}"
    height: 44px
  sub-nav-frosted:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.ink}"
    typography: "{typography.tagline}"
    height: 52px
  product-tile-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 80px
  product-tile-parchment:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 80px
  product-tile-dark:
    backgroundColor: "{colors.surface-tile-1}"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 80px
  product-tile-dark-2:
    backgroundColor: "{colors.surface-tile-2}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.none}"
  product-tile-dark-3:
    backgroundColor: "{colors.surface-tile-3}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.none}"
  store-utility-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.lg}"
    padding: 24px
  configurator-option-chip:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 12px 16px
  configurator-option-chip-selected:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  search-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: 12px 20px
    height: 44px
  floating-sticky-bar:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    height: 64px
    padding: 12px 32px
  environment-quote-card:
    backgroundColor: "{colors.surface-tile-1}"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 80px
  footer:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.ink-muted-80}"
    typography: "{typography.fine-print}"
    padding: 64px
---

## Overview

Apple's web presence is a masterclass in **reverent product photography framed by near-invisible UI**. Every page is a stack of edge-to-edge product "tiles" — alternating light and dark canvases, each centered on a hero headline, a one-line tagline, two tiny blue pill CTAs, and an impossibly crisp product render. Nothing competes with the product. Typography is confident but quiet; color is either pure white, an off-white parchment, or a near-black tile; interactive elements are a single, quiet blue.

Density is unusually low even by contemporary SaaS standards. Each tile occupies roughly one viewport, and there is no decorative chrome — no borders, no gradients, no decorative frames, no shadows on headlines. Elevation appears only when a product image rests on a surface (a single soft `rgba(0, 0, 0, 0.22) 3px 5px 30px` drop for visual weight). The result is a catalog that feels more like a museum gallery: the wall disappears and the artifact takes over.

Store and shop surfaces retain the same chassis but switch modes. The product configurator (iPhone 17 Pro, accessories grid) introduces a tight grid of white utility cards at `{rounded.lg}` (18px) radius with a thin border, paired with a persistent thin sub-nav strip. The environment page leans darker and more editorial. Across all five surfaces the typographic system, spacing rhythm, and the single blue accent are consistent — this is one design language expressed at different volumes.

**Key Characteristics:**
- Photography-first presentation; UI recedes so the product can speak.
- Alternating full-bleed tile sections: white/parchment/blue-wash ↔ ink blue, with the color change itself acting as the section divider.
- **Blue is the dominant tone, not just the accent.** The dark tiles, the footer and the header strip are the sign's blue taken down to ink (same 223° hue as `{colors.primary}`); the light tiles carry its wash. Saturated *fields* of `{colors.primary}` stay rare — that scarcity, not the scarcity of the colour, is what keeps the closing CTA loud.
- Single blue accent (`{colors.primary}` — #2f51a7, the sign's own blue) carries every interactive element. The logo's gold is the only other brand color, and it never marks something you can press.
- Contact is never more than one element away: a phone pill in the nav, a closing CTA band with call/Zalo/quote on every marketing page, and a fixed three-target bar on phones.
- Two button grammars: pill CTAs (`{rounded.pill}`) and compact utility rects (`{rounded.sm}`).
- SF Pro Display + SF Pro Text — negative letter-spacing at display sizes for the signature "Apple tight" headline feel.
- Whisper-soft elevation used only when a product image needs to breathe — exactly one drop-shadow in the entire system.
- Two-row nav: a scroll-away `{component.contact-strip}` on ink blue over a sticky frosted `{component.primary-nav}` carrying all five sections, the phone, and the quote CTA.
- Section rhythm across multiple pages: blue-wash hero → brand field → parchment → ink-blue tile → light utility tile → brand CTA → blue footer — a predictable pulse.

## Colors

> **Source:** the workshop's own signage — a royal blue field carrying a gold monogram in teal, yellow and red blocks, over a warm near-black extrusion, with the wordmark in gold-edged cream. Every token below is that photograph reduced to a working palette. The analysed chassis (tile rhythm, one accent, no chrome) is unchanged; only the hues are the brand's.

### Brand & Accent
- **Giang Blue** (`{colors.primary}` — #2f51a7): The single brand-level interactive color, lifted from the sign's field. All text links, all pill CTAs, the focus ring root, and the full ground of the closing CTA band. 7.35:1 on white, so it carries body-size links, not just large text. Its chroma is held below the sign's own: the sign is a small object at arm's length, and that saturation stretched across a full-bleed band glares rather than reads.
- **Giang Blue Pressed** (`{colors.primary-hover}` — #244189): The same hue one step down in lightness, for the hover and active fill of a filled pill. The original system documented only default and pressed states; a pointer device has a third, and leaving it out reads as "not clickable". Every variant moves its *surface* on hover while the label holds still.
- **Focus Blue** (`{colors.primary-focus}` — #3861c7): A brighter sibling of Giang Blue, reserved for the keyboard focus ring on buttons (`outline: 2px solid`). On `{component.product-tile-brand}` the ring inverts to `{colors.on-brand}` — Focus Blue is too near the field it would sit on.
- **Sky Link Blue** (`{colors.primary-on-dark}` — #7ba0ea): A brighter blue used on dark surfaces for in-copy links and inline callouts, where Giang Blue would disappear against the tile background.
- **Brand Gold** (`{colors.brand-gold}` — #8a5c14 on light, `{colors.brand-gold-on-dark}` — #e0a44f on dark): The monogram's gold, and the system's only non-interactive brand color. It labels — section eyebrows, process step numbers — and it is never a link, a button, or a border on something pressable. **Gold marks the label, blue marks the action.** Two values because the raw gold clears AA only against a dark tile; on light surfaces the ornament is the same gold in shadow.

### Platform Colors
**Zalo Blue** (`{colors.zalo}` — #0068ff) exists for exactly one element: `{component.zalo-bubble}`. It is a platform colour, not a UI colour — a Zalo button that is not Zalo blue does not read as Zalo, the same reason the Facebook glyph keeps its own mark. Nothing else may borrow it, and it is never the site's accent; that is always `{colors.primary}`.

### Logo-Only Colors
The teal (#57c4b8), yellow (#efe153) and red (#de3a2a) blocks of the monogram are **not interface colors.** They live in the mark and nowhere else. Promoting one to a UI role would give the site a second accent and cost the blue its meaning — if a surface seems to need them, it needs a photograph instead.

### Surface
- **Pure White** (`{colors.canvas}` — #ffffff): The dominant canvas — the paper the workshop prints on. Content tiles, utility cards, product grids.
- **Parchment** (`{colors.canvas-parchment}` — #f6f4f0): The warm off-white, pulled toward the wordmark's cream. Used for alternating light tiles, the footer region, and the frosted sub-nav. Just different enough from white to create rhythm.
- **Pearl Button** (`{colors.surface-pearl}` — #fbfaf7): A near-white used as the fill for secondary "ghost" buttons — lighter than the parchment canvas so the button still reads as a button against `{colors.canvas-parchment}`.
- **Blue Wash** (`{colors.primary-wash}` — #f0f3f9) / **Blue Wash 2** (`{colors.primary-wash-2}` — #e2e7f3): The faintest tints of the field. They ground the hero, fill soft buttons and icon badges, and mark hover on light surfaces. Brand colour at reading weight — this is what lets blue run through a whole page without the closing CTA band losing its punch: **wash is the tone of voice, the full field is the ask.**
- **Ink Blue Tile 1** (`{colors.surface-tile-1}` — #19233e): The primary dark-tile surface — the sign's blue taken down to ink, same 223° hue as the accent at 17% lightness. It replaced a warm near-black: a print workshop whose entire identity is a blue field should not have grey-black as its dominant dark tone.
- **Ink Blue Tile 2** (`{colors.surface-tile-2}` — #202c4b): A step lighter — cards resting on Tile 1, and dark tiles that sit directly above or below it.
- **Ink Blue Tile 3** (`{colors.surface-tile-3}` — #11192c): The deepest step — the header's contact strip and the footer, which bookend the document.
- **Void** (`{colors.surface-black}` — #11192c): Same hex as Tile 3. There is no pure black in the system any more; the deepest tone the site reaches is still blue.
- **Translucent Chip Gray** (`{colors.surface-chip-translucent}` — #d7d2ca): The base hex of the translucent chip used over photography for circular control buttons. In production, applied at ~64% alpha.

### Text
- **Near-Black Ink** (`{colors.ink}` — #1d1b18): The voice of every headline, every body paragraph, and the dark utility button's fill. Near-black rather than pure black, and warm rather than neutral, so the page reads photographic rather than printed.
- **Body** (`{colors.body}` — #1d1b18): Same hex as ink — one near-black tone for all text on light surfaces.
- **Body On Dark** (`{colors.body-on-dark}` — #ffffff): All text on dark tiles and on the global nav bar.
- **Body Muted** (`{colors.body-muted}` — #cad0dd): Secondary copy on the ink-blue tiles where pure white would be too loud. Cool, not warm — a warm grey on a navy tile reads as a printing error. 10.1:1 on Tile 1.
- **On Brand** (`{colors.on-brand}` — #ffffff) / **On Brand Muted** (`{colors.on-brand-muted}` — #d4dbed): Copy on the brand-blue field. The muted tone holds 5.3:1 against it, so leads and eyebrows stay AA at body size.
- **Ink Muted 80** (`{colors.ink-muted-80}` — #34302b): Body text on the Pearl Button surface — slightly softer than full ink.
- **Ink Muted 48** (`{colors.ink-muted-48}` — #6f6961): Disabled button text and legal fine-print. Darkened from the original #7b746b so it clears AA (5.4:1 on white) — fine print is still text someone has to read.

### Hairlines & Borders
- **Divider Soft** (`{colors.divider-soft}` — #f1eeea): The "border" tone on secondary buttons — functions as a ring shadow rather than a hard line.
- **Hairline** (`{colors.hairline}` — #e2ded7): The 1px hairline border on utility cards and filter chips.
- **Hairline On Dark** (`{colors.hairline-on-dark}` — #3c4867): The same hairline on the ink-blue tiles, where a white-alpha line would haze rather than draw.

### Brand Gradient
**No decorative gradients.** The sign gets its depth from a physical extrusion and a cast shadow, not from a blend, and the interface follows: atmospheric depth belongs to the photography, never to a CSS overlay. No gradient tokens are defined.

## Typography

### Font Family
- **Display**: `SF Pro Display, system-ui, -apple-system, sans-serif` — Apple's proprietary display face, optimized for sizes ≥ 19px. Defines the voice of every headline.
- **Body / UI**: `SF Pro Text, system-ui, -apple-system, sans-serif` — the text-optimized variant used for body copy, captions, buttons, and links below 20px.
- **OpenType features**: `font-variant-numeric: numerator` is enabled on numeric links (pricing tables, spec sheets). Display sizes rely on tight tracking rather than contextual ligatures.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.hero-display}` | 56px | 600 | 1.07 | -0.28px | Hero headline; the signature "Apple tight" tracking |
| `{typography.display-lg}` | 40px | 600 | 1.10 | 0 | Tile headlines atop every product tile |
| `{typography.display-md}` | 34px | 600 | 1.47 | -0.374px | Section heads (SF Pro Text at display proportions) |
| `{typography.lead}` | 28px | 400 | 1.14 | 0.196px | Product tile subcopy |
| `{typography.lead-airy}` | 24px | 300 | 1.5 | 0 | Environment-page lead paragraphs (the rare weight 300) |
| `{typography.tagline}` | 21px | 600 | 1.19 | 0.231px | Sub-tile tagline; sub-nav category name |
| `{typography.body-strong}` | 17px | 600 | 1.24 | -0.374px | Inline strong emphasis |
| `{typography.body}` | 17px | 400 | 1.47 | -0.374px | Default paragraph |
| `{typography.dense-link}` | 17px | 400 | 2.41 | 0 | Footer / store utility link lists (relaxed leading) |
| `{typography.caption}` | 14px | 400 | 1.43 | -0.224px | Secondary captions, button text |
| `{typography.caption-strong}` | 14px | 600 | 1.29 | -0.224px | Emphasized captions |
| `{typography.button-large}` | 18px | 300 | 1.0 | 0 | Store hero CTAs (the rare weight 300) |
| `{typography.button-utility}` | 14px | 400 | 1.29 | -0.224px | Utility/nav button labels |
| `{typography.fine-print}` | 12px | 400 | 1.0 | -0.12px | Fine-print, footer body |
| `{typography.micro-legal}` | 10px | 400 | 1.3 | -0.08px | Micro legal disclaimers |
| `{typography.nav-link}` | 12px | 400 | 1.0 | -0.12px | Global nav menu items |

### Principles

- **Negative letter-spacing at display sizes.** Every headline at 17px and up carries a slight tracking tighten (`-0.12 → -0.374px`). This produces the iconic "Apple tight" headline cadence. Never used at 12px or below.
- **Body copy at 17px, not 16px.** Apple breaks the SaaS convention and runs paragraph text at 17px. The extra pixel gives the page an unmistakable "reading, not scanning" pace.
- **Weight 300 is real and rare.** Used deliberately on a handful of large-size reads (`{typography.button-large}` at 18px/300 and `{typography.lead-airy}` at 24px/300). It's not an accident — it's a light-atmosphere cue reserved for moments where the content should feel airy.
- **Weight 600, not 700, for headlines.** Apple's headlines sit at weight 600. Weight 700 is used sparingly for `{typography.tagline}` (21px) when a touch more assertion is needed.
- **Line-height is context-specific.** Display sizes use 1.07–1.19 (tight). Body uses 1.47. Utility link stacks in the footer/store use an unusually relaxed 2.41 (`{typography.dense-link}`). The 2.41 is not a bug — it's how the footer's dense link columns breathe.
- **Weight 500 is deliberately absent.** The ladder is 300 / 400 / 600 / 700. Mid-weight readings always use 600.

### Note on Font Substitutes
SF Pro is Apple's proprietary system font. When building off-system:

- Use `system-ui, -apple-system, BlinkMacSystemFont` as the first stack entry — on macOS/iOS/Safari this resolves to the real SF Pro.
- For non-Apple platforms, **Inter** (Google Fonts, variable) is the closest open-source equivalent. Inter at weight 600 with `font-feature-settings: "ss03"` approximates SF Pro's rounded "a" character.
- Nudge `letter-spacing` down by `-0.01em` on display sizes to re-create the Apple tight feel; Inter's default tracking runs slightly wider than SF Pro.
- For body text, tighten line-height by `0.03` (from 1.47 → 1.44) when substituting Inter — Inter's taller x-height needs less leading.

## Layout

### Spacing System
- **Base unit:** 8px. Sub-base values (2, 4, 5, 6, 7) are used for tight typographic adjustments; structural layout snaps to 8/12/16/20/24.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 17px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 80px.
- **Section vertical padding:** `{spacing.section}` (80px) inside a product tile; tiles stack edge-to-edge with 0 gap (the color change provides the break).
- **Card padding:** `{spacing.lg}` (24px) inside utility grid cards.
- **Button padding:** 8–11px vertical, 15–22px horizontal.
- **Universal rhythm constants:** the 17px body line-height multiplier (~25px line) and 21px tagline size show up on every analyzed page.

### Grid & Container
- **Max content width:** ~980px on text-heavy sections (environment), ~1440px on product grids (store, accessories), full-bleed for product tiles (homepage).
- **Column patterns:** 3 to 5 column utility card grid on store/accessories; 2-column side-by-side tiles on homepage occasional sections; single-column centered stack on product tile heroes.
- **Gutters:** 20–24px between cards in a utility grid.

### Whitespace Philosophy
Apple's whitespace is the product's pedestal. Every tile begins with at least 64px of air above its headline and 48–64px below. Product renders are never crowded; the nearest content to a product image is at least 40px away. The footer is the only area that breaks this — there, Apple goes deliberately dense to make the full information architecture visible at a glance.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Full-bleed tiles, global nav, footer, body sections |
| Soft hairline | 1px `rgba(0, 0, 0, 0.08)` border | Utility cards, sub-nav frosted-glass separator |
| Backdrop blur | `backdrop-filter: blur(N)` on Parchment 80% | Sub-nav and the iPhone buy floating sticky bar |
| Product shadow | `rgba(0, 0, 0, 0.22) 3px 5px 30px 0` | Product renders resting on a surface (the only true "shadow" in the page) |
| Float shadow | `rgba(10, 19, 48, 0.14) 0 -1px 24px 0` | The fixed mobile contact bar |
| Bubble shadow | `rgba(10, 19, 48, 0.30) 0 6px 24px 0` | The floating Zalo bubble |
| Hover lift | `translateY(-2px)` + hairline turns `{colors.primary}` | Cards and action rows that are themselves links |

**Shadow philosophy.** There is **exactly one** drop-shadow in the page, and it is applied to photographic product imagery — never to cards, never to buttons, never to text. Elevation in the UI comes from (a) surface-color change (light tile ↔ ink-blue tile) and (b) backdrop-blur on the sticky nav. The single shadow is about giving the product weight, not about UI hierarchy.

The exceptions are not *in* the page: `{component.contact-bar}` and `{component.zalo-bubble}` are fixed above the scrolling document, so they need the one thing the flat system otherwise refuses — a separation from what passes underneath them. Anything that scrolls with the page still gets no shadow. An interactive card lifts 2px and takes the brand hairline instead of borrowing the product shadow; lending that shadow to a card would flatten the distinction it exists to make.

### Decorative Depth
- **Atmospheric imagery** on the environment page (photographic vista) supplies mood; no CSS gradient involved.
- **Edge-to-edge tile alternation** creates rhythm without borders or shadows — the color change itself is the divider.
- **Backdrop-filter blur** on `{component.sub-nav-frosted}` and `{component.floating-sticky-bar}` creates a "floating over content" effect that's functional, not decorative.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Full-bleed product tiles (no corner rounding) |
| `{rounded.xs}` | 5px | Inline links when styled as subtle chips (rare) |
| `{rounded.sm}` | 8px | Dark utility buttons (Sign In, Bag), inline card imagery |
| `{rounded.md}` | 11px | White Pearl Button capsules |
| `{rounded.lg}` | 18px | Store utility cards, accessories grid cards |
| `{rounded.pill}` | 9999px | Primary blue pill CTAs, sub-nav buy button, configurator option chips, search input — the signature Apple pill |
| `{rounded.full}` | 9999px / 50% | Circular control chips floating over photography |

### Photography Geometry
- **Hero imagery**: full-bleed, 21:9 or taller on the homepage; 16:9 on environment and shop pages. Product renders are photographic-realistic, often shot on a tinted surface that becomes the tile background.
- **Product renders**: PNG/WebP with transparency; rest on a surface tile and pick up the system shadow.
- **Accessory grid**: square 1:1 crops at `{rounded.lg}` (18px) radius, light neutral backgrounds, product centered with 20–40px internal padding.
- **No rounded imagery in hero tiles** — images are full-bleed rectangular. Rounding (`{rounded.sm}`, `{rounded.lg}`) appears only on inline card imagery.
- Lazy-loading via responsive `srcset` and `sizes` across all breakpoints; CDN-optimized WebP.

## Components

### Top Navigation

**`contact-strip`** — The top row: hours, district, sales email and phone on `{colors.surface-tile-3}`, height 40px, 13px text. It scrolls away with the page — it is reassurance, not navigation — and it is hidden below the nav breakpoint, where `{component.contact-bar}` carries the same job better. Icons at 15px lead each value.

**`primary-nav`** — The sticky row. Background `{colors.canvas}` at 82% with backdrop-filter blur, 1px `{colors.hairline}` bottom, height 64px. Left: the mark (a `{rounded.md}` square of `{colors.primary}` carrying the gold initial — the sign itself) plus the workshop name and tagline. Centre-right: **all five** section links in `{typography.caption-strong}` (14px), ink at rest and `{colors.primary}` with a 2px underline for `aria-current="page"`. Right: the phone as `{component.button-soft}` and the quote pill.

> **Why one row of links, not two.** The earlier two-row nav split the sections between a 12px black strip and a second parchment strip that repeated two of them, with no current-page state anywhere and the phone number set as 12px grey text. A visitor could not tell where they were, and the single most valuable element on the page — the phone number — was the least visible thing in the header. One nav, one current state, and contact as a hittable pill.

### Buttons

**`button-primary`** — The signature action. Background `{colors.primary}` (Giang Blue #2f51a7), text `{colors.on-primary}` in `{typography.body}` (SF Pro Text 17px / 400), rounded `{rounded.pill}` (full pill — capsule-shaped), padding 11px × 22px. The full-pill radius IS the brand action signal.
- Hover state: fill shifts to `{colors.primary-hover}` over 160ms.
- Active state: `{component.button-primary-active}` — `transform: scale(0.95)` (the system-wide micro-interaction).
- Focus state: `{component.button-primary-focus}` — 2px solid `{colors.primary-focus}` outline.

**`button-secondary-pill`** — Used as the second CTA when two pills appear together. Background transparent, text `{colors.primary}`, 1px solid `{colors.primary-hairline}` border, rounded `{rounded.pill}`, padding 11px × 22px. Reads as a "ghost pill." On hover it fills with `{colors.primary-wash}` and its border firms to `{colors.primary}`.

**`button-soft`** — The quiet pill: the phone number in the nav, the copy button on `/bao-gia`. Background `{colors.primary-wash}`, text `{colors.primary}`, no border. It reads as a surface rather than an outline, which keeps it from competing with the primary pill beside it.

**`button-dark-utility`** — Global nav actions (Sign In, Bag, language selector). Background `{colors.ink}` (#1d1b18), text `{colors.on-dark}` in `{typography.button-utility}` (14px / 400 / -0.224px tracking), rounded `{rounded.sm}` (8px), padding 8px × 15px. Active state shrinks via `transform: scale(0.95)`.

**`button-pearl-capsule`** — Product-card secondary button. Background `{colors.surface-pearl}` (#fbfaf7), text `{colors.ink-muted-80}` in `{typography.caption}` (14px), 3px solid `{colors.divider-soft}` border (functions as a soft ring rather than a visible line), rounded `{rounded.md}` (11px), padding 8px × 14px.

**`button-store-hero`** — A larger primary CTA used on hero surfaces. Same Giang Blue + Paper White as `{component.button-primary}`, but with `{typography.button-large}` (18px / 300 — note the rare weight 300) and slightly more padding (14px × 28px). Used sparingly.

**`button-on-brand`** — The pill inverted for `{component.product-tile-brand}`. Background `{colors.on-brand}`, text `{colors.primary}`, same pill radius and padding as `{component.button-primary}` — the sign's white letters on its blue field. Its ghost sibling `button-secondary-on-brand` keeps white text over a 56%-white border. Blue-on-blue is the one pairing the system forbids, so `{component.button-primary}` must never appear on the brand tile.

**`button-icon-circular`** — Floats over photography. 44 × 44px, background `{colors.surface-chip-translucent}` at ~64% alpha, icon in `{colors.ink}`, rounded `{rounded.full}`. Used for carousel controls, close buttons, and in-image controls (product image thumbnails on the iPhone buy page).

**`text-link`** — Inline body links in `{colors.primary}` (Giang Blue). Underlined or non-underlined per context.

**`eyebrow`** — The label above a headline, and the process step numbers that share its grammar: `{typography.caption-strong}` (14px / 600) **uppercase with 0.09em tracking** in `{colors.brand-gold}`, or `{colors.brand-gold-on-dark}` on a dark tile. Case is what separates it from the body copy under it without adding a second size. On `{component.product-tile-brand}` it steps back to `{colors.on-brand-muted}` — the field is already the brand, and gold does not clear AA against it.

**`icon-badge`** — A 44px disc carrying one glyph: `{colors.primary-wash}` + `{colors.primary}` on light, an 18% tint of `{colors.primary-on-dark}` on an ink-blue tile, a 12% gold tint for the numbered process steps. It labels a row; it is **never itself the tap target** — the row around it is, so the target clears 44px without the icon having to.

**`action-row`** — The contact affordance, used wherever a visitor should be one tap from talking to the workshop (`/lien-he`, and any list of ways to reach the shop). Badge, label, value; card shape, `{rounded.lg}`, min-height 76px; the whole row is one link. Hover lifts 2px, fills `{colors.primary-wash}` and firms the hairline to `{colors.primary}`.

**`zalo-bubble`** — The floating chat button, 56px, `{colors.zalo}` fill with the white Zalo mark, carrying `{shadow.bubble}` and one slow pulse ring. Bottom-right: 24px in from the corner above the nav breakpoint, and above `{component.contact-bar}` below it — two fixed things in the same corner is one too many. A label rides out of it on hover for pointer devices only; the link's `aria-label` carries the same words otherwise. It is a plain link to the `zalo.me` deep link, so it needs no Official Account and no third-party script; when an OA ID exists, Zalo's own widget replaces it.

**`contact-bar`** — Fixed to the bottom of the viewport below 834px: three equal targets — call, Zalo, quote — 64px tall, the quote third filled with `{colors.primary}`. It carries `{shadow.float}`, pads itself past the iOS home indicator with `env(safe-area-inset-bottom)`, and ships its own spacer so the document ends above it. Above the breakpoint it hides: the same three actions live in the header. **Most visitors reach a print workshop from a phone and want a price — the two ways to ask for one are never more than a thumb away.**

**`text-link-on-dark`** — Inline body links on dark tiles in `{colors.primary-on-dark}` (Sky Link Blue #7ba0ea) — Giang Blue would disappear against `{colors.surface-tile-1}`.

### Cards & Containers

**`product-tile-light`** — Full-bleed light tile. Background `{colors.canvas}` (white), text `{colors.ink}`, rounded `{rounded.none}` (0 — tiles touch edges), vertical padding `{spacing.section}` (80px). Centered stack: product name in `{typography.display-lg}` (40px / 600) → one-line tagline in `{typography.lead}` (28px / 400) → two `{component.button-primary}` CTAs ("Learn more" / "Buy") → product render resting on the surface with the system shadow.

**`product-tile-parchment`** — Same as `{component.product-tile-light}` but on `{colors.canvas-parchment}` (#f6f4f0). Used to break two consecutive white tiles.

**`product-tile-dark`** — Full-bleed ink-blue tile. Background `{colors.surface-tile-1}` (#19233e), text `{colors.on-dark}`, rounded `{rounded.none}`, vertical padding `{spacing.section}` (80px). Same content stack as the light tile but with `{component.text-link-on-dark}` for inline copy. Used on the homepage services grid as the alternating dark band.

**`product-tile-dark-2`** — Variant on `{colors.surface-tile-2}` (#202c4b). Cards resting on `{component.product-tile-dark}`, and dark tiles that sit directly above or below it.

**`product-tile-dark-3`** — Variant on `{colors.surface-tile-3}` (#11192c). The header's contact strip and the footer.

**`product-tile-wash`** — Full-bleed tile in `{colors.primary-wash}`, ink text. Brand colour at reading weight, for sections that should feel brand-owned without becoming a field.

**`product-tile-brand`** — Full-bleed tile in `{colors.primary}`, text `{colors.on-brand}`, leads and eyebrows in `{colors.on-brand-muted}`, CTAs in `{component.button-on-brand}`. **At most twice per page, and the last one is always the closing CTA band.** The keyboard focus ring inverts to `{colors.on-brand}` here.

> **The "once per page" rule, and why it moved.** The original system allowed exactly one field of brand blue, so that the closing CTA carried all of it. The brief for this workshop is the opposite: blue is the sign, and the sign is the business — so blue now runs the whole document (ink-blue tiles, blue-wash grounds, blue footer) and the *field* appears where it earns attention: the homepage's stats band and the closing CTA. What holds the CTA's punch is no longer scarcity of the colour but scarcity of the **saturated field** — everywhere else blue is ink or wash. `{component.button-primary}` on the field is still forbidden: blue on blue is the one pairing the system does not bend on.

**`store-utility-card`** — Used in store grid and accessories grid. Background `{colors.canvas}` (white), 1px solid `{colors.hairline}` border, rounded `{rounded.lg}` (18px), padding `{spacing.lg}` (24px). Top: product image (1:1 crop with `{rounded.sm}` (8px) inner image radius). Below: product name in `{typography.body-strong}` (17px / 600), price in `{typography.body}` (17px / 400), and a `{component.text-link}` ("Buy" or "Learn more"). No shadow by default; product render itself carries the system product-shadow.

**`configurator-option-chip`** — Pill-shaped tappable cell used in the iPhone 17 Pro buy page. Background `{colors.canvas}`, text `{colors.ink}` in `{typography.caption}`, rounded `{rounded.pill}`, padding 12px × 16px. Contains a small product thumbnail + label + price delta. Arranged in a grid of 4–5 options per row.

**`configurator-option-chip-selected`** — Selected state. **Filled** `{colors.primary}` with `{colors.on-dark}` text — not a ring. A 2px ring is the focus signal, and using the same signal for selection made the two states indistinguishable at a glance, which matters on `/du-an` where the chips are the only navigation.

**`environment-quote-card`** — A photographic-canvas hero specific to the environment page. Dark photographic backdrop (mountain vista at dawn) with `{colors.surface-tile-1}` as the fallback color, centered white-text headline in `{typography.display-lg}` (40px), small green "Apple 2030" pictographic logo above the headline, single `{component.button-primary}` below. Padding `{spacing.section}` (80px).

**`floating-sticky-bar`** — Floats at the bottom of the viewport on the iPhone 17 Pro buy page during scroll. Background `{colors.canvas-parchment}` at 80% opacity with `backdrop-filter: blur(N)`, height 64px, padding 12px × 32px. Left: running price total in `{typography.body}`. Right: `{component.button-primary}` ("Add to Bag").

### Inputs & Forms

**`search-input`** — The accessories search input. Background `{colors.canvas}`, text `{colors.ink}` in `{typography.body}` (17px), 1px solid `rgba(0, 0, 0, 0.08)` border, rounded `{rounded.pill}` (full pill — search is also pill-shaped, matching the CTA grammar), padding 12px × 20px, height 44px. Leading icon: search glyph at 14px, muted tint.

Error and validation states were not surfaced in the analyzed pages.

### Footer

**`footer`** — Background `{colors.surface-tile-3}` (#11192c), text `{colors.on-dark}`. Four columns: the mark and one-line description, two link columns, and a contact block whose every line is an icon-led link (phone, Zalo, email, a Google Maps deep link on the address, hours). Column headings take `{component.eyebrow}` on dark. Legal row at the bottom in `{typography.fine-print}` over a `{colors.hairline-on-dark}` rule. Vertical padding 64px.

The footer is the page's closing field of brand colour — it ends the document the way the sign closes the shopfront, and it makes the contact block the last thing on every page rather than a line of grey text on parchment.

## Do's and Don'ts

### Do
- Use `{colors.primary}` (Giang Blue #2f51a7) for every interactive element — links, pill CTAs, focus signals — and nothing else. The single accent is non-negotiable.
- Use `{colors.brand-gold}` only for labels that name a section — eyebrows and step numbers. Gold marks the label, blue marks the action.
- Set headlines in `{typography.hero-display}` or `{typography.display-lg}` with negative letter-spacing (`-0.28 → -0.374px`) to get the signature "Apple tight" cadence.
- Run body copy at `{typography.body}` (17px / 400 / 1.47 / -0.374px) — not 16px. The extra pixel defines the brand's reading pace.
- Alternate `{component.product-tile-light}` (or parchment) and `{component.product-tile-dark}` for full-bleed section rhythm. The color change IS the divider.
- Reserve `{rounded.pill}` for the primary blue CTA and any other element that should read as an "action" (configurator chips, search input, sticky bar CTA).
- Apply the single product-shadow (`rgba(0, 0, 0, 0.22) 3px 5px 30px`) only to product renders resting on a surface — never on cards, buttons, or text.
- Use `transform: scale(0.95)` as the active/press state on every button — it's the system-wide micro-interaction.
- Give every interactive element a hover state that moves its **surface** (fill or hairline) over 150–180ms, and wrap every transform in a `prefers-reduced-motion: reduce` escape.
- Put a way to contact the workshop within reach on every page: the nav pill, the closing CTA band, and `{component.contact-bar}` on phones. A print buyer who has to hunt for a phone number leaves.
- Give an icon a text label beside it, or an `aria-label` on the control around it. `{component.icon-badge}` is decorative and always `aria-hidden`.
- Use `.reveal` (pure-CSS `animation-timeline: view()`) for section entrances. Browsers without it render the final state, so nothing is gated behind the animation.

### Don't
- Don't introduce a second accent color; every "click me" signal is `{colors.primary}` (Giang Blue). Gold is a label, not an accent — the moment it underlines a link or fills a button, the system has two accents.
- Don't pull the monogram's teal, yellow or red into the interface. They belong to the mark; a surface that seems to need them needs a photograph.
- Don't use `{component.product-tile-brand}` more than twice on a page, don't let anything but the closing CTA be the last one, and don't put `{component.button-primary}` on it — blue on blue is the one pairing the system forbids.
- Don't add shadows to cards, buttons, or text — the page's one shadow is reserved for product imagery, and `{shadow.float}` belongs to `{component.contact-bar}` alone. An interactive card lifts and changes its hairline instead.
- Don't nest a link inside a card that is itself a link. Use `.card-stretch` — the title's link stretches an invisible `::after` over the card and the secondary action lifts above it.
- Don't ship an icon-only control without an accessible name, and never use an emoji as an icon.
- Don't use gradients as decorative backgrounds; atmosphere comes from photography.
- Don't set body copy at weight 500 — Apple's ladder is 300 / 400 / 600 / 700, with 500 deliberately absent. Body is always 400; strong inline is 600; display is 600.
- Don't round full-bleed tiles — tiles are rectangular and edge-to-edge; the color change is the divider.
- Don't tighten line-height below 1.47 for body copy — the editorial leading is part of the brand.
- Don't mix radii grammars — use `{rounded.sm}` for compact utility, `{rounded.lg}` for utility cards, `{rounded.pill}` for pills, and nothing in between (except the rare `{rounded.md}` Pearl Button).
- Don't use `{colors.primary-on-dark}` (Sky Link Blue) on light surfaces — it's the dark-tile-only variant. Giang Blue is for light surfaces.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Small phone | ≤ 419px | Single-column tiles; sub-nav collapses to category name + primary CTA only; hero typography drops to 28px |
| Phone | 420–640px | Single-column stack; product renders scale to 80% of tile width; hero h1 drops to 34px |
| Large phone | 641–735px | Tiles transition to tighter padding (48px vertical vs 80px); fine-print wraps |
| Tablet portrait | 736–833px | Global nav collapses to hamburger; sub-nav hides category chips, keeps primary CTA |
| Tablet landscape | 834–1023px | Global nav returns fully expanded; 3-column utility grids become 2-column |
| Small desktop | 1024–1068px | Product tiles use 2/3 width with margin gutters; hero h1 stays at 40px |
| Desktop | 1069–1440px | Full layout; 4–5 column store grids; 1440px content max |
| Wide desktop | ≥ 1441px | Content locks at 1440px, margins absorb extra width |

The structural breakpoints that matter for agents: 1440px (content lock), 1068px (small-desktop), 833px (tablet landscape switch), 734px (tablet portrait), 640px (phone), 480px (small phone).

### Touch Targets
- Minimum 44 × 44px. `{component.button-primary}` lands at ~44 × 100px (with the full-pill radius making the visible hit area more generous than the label suggests).
- `{component.button-icon-circular}` is exactly 44 × 44px.
- Global nav utility links are smaller (~32 × 80px) — they deliberately sit at a tighter target because they're precision desktop actions, and the mobile hamburger replaces them at ≤ 833px.

### Collapsing Strategy
- **Global nav**: full horizontal link row on desktop → collapses to Apple logo + hamburger + bag icon at 834px and below.
- **Sub-nav**: category name + inline links + primary CTA → category name + primary CTA only at mobile; inline links move into a hamburger tray.
- **Product tiles**: stack from 2-column to 1-column at 834px; vertical padding tightens from 80px → 48px at small-phone.
- **Utility grids** (store, accessories): 5-col → 4-col (1440px) → 3-col (1068px) → 2-col (834px) → 1-col (640px).
- **Hero typography**: `{typography.hero-display}` (56px) → `{typography.display-lg}` (40px) at 1068px → 34px at 640px → 28px at 419px.

### Image Behavior
- All product imagery uses responsive `srcset` with breakpoint-matched crops.
- Hero photography may switch art direction at mobile (e.g., the environment page's vista crops to a taller aspect ratio on mobile, framing the subject differently).
- Product renders maintain their 1:1 or 4:3 aspect ratios across breakpoints; only scale changes.
- Lazy-loading is default; the above-fold hero loads eagerly.

## Iteration Guide

1. Focus on ONE component at a time. Reference its YAML key directly (`{component.product-tile-dark}`, `{component.search-input}`).
2. Variants of an existing component (`-active`, `-focus`, `-2`, `-3`) live as separate entries in `components:`.
3. Use `{token.refs}` everywhere — never inline hex.
4. Never document hover. Default and Active/Pressed states only.
5. Display headlines stay SF Pro Display 600 with negative letter-spacing. Body stays SF Pro Text 400 at 17px. The boundary is unbreakable.
6. The single drop-shadow (`rgba(0, 0, 0, 0.22) 3px 5px 30px`) is reserved for product photography only.
7. When in doubt about emphasis: alternate surface (light → dark tile) before adding chrome.

## Known Gaps

- Form validation and error states were not surfaced on the analyzed pages; only the neutral search input is documented.
- The homepage's embedded video/player frame uses `{colors.surface-black}`; interior player controls are not documented (they're a platform widget, not a web-design token).
- Some component imagery is dynamic (rotating product hero) and its specific copy varies per surface — component specs name the structure, not the rotating content.
- Dark-mode counterparts for store and accessories utility cards were not surfaced on the analyzed pages; the system documented is the daytime/light-dominant variant Apple ships by default.
- Atmospheric photography (environment page mountain vista) is a content asset, not a design token; the documented `{component.environment-quote-card}` describes the structural surface only.
- The exact backdrop-filter blur radius on `{component.sub-nav-frosted}` and `{component.floating-sticky-bar}` is platform-dependent; production CSS uses `saturate(180%) blur(20px)` as a typical baseline but the value isn't formalized as a token.
