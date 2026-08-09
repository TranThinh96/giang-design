import type { ReactNode } from "react";

/** Which tile surface the heading is sitting on — it decides the eyebrow's
 *  gold and the lead's muted tone, both of which invert per surface. */
export type Tone = "light" | "dark" | "brand";

const EYEBROW: Record<Tone, string> = {
  light: "eyebrow",
  dark: "eyebrow-on-dark",
  brand: "eyebrow-on-brand",
};

const LEAD: Record<Tone, string> = {
  light: "text-muted",
  dark: "text-muted-on-dark",
  brand: "text-muted-on-brand",
};

/**
 * The head of a tile: a small eyebrow, the headline, an optional one-line
 * lead, then whatever CTAs the tile carries. Centred, because the tile's
 * content is a single centred stack and the surface colour — not a rule or a
 * border — is what separates one section from the next.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  children,
  tone = "light",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <header className={`text-center ${className}`}>
      {eyebrow && (
        <div className={`t-caption-strong mb-3 ${EYEBROW[tone]}`}>{eyebrow}</div>
      )}
      {/* Each element carries its own measure: the headline wants a tight one,
          the lead a longer one. Constraining the whole header instead would
          make the lead as narrow as the headline. */}
      <h2 className="t-display-lg m-0 mx-auto max-w-[24ch]">{title}</h2>
      {lead && (
        <p className={`t-lead mx-auto mt-4 max-w-[46ch] ${LEAD[tone]}`}>
          {lead}
        </p>
      )}
      {children && (
        <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>
      )}
    </header>
  );
}

/** Page-level header for the inner routes: the hero headline of that page. */
export function PageHeading({
  eyebrow,
  title,
  lead,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={`text-center ${className}`}>
      {eyebrow && <div className="t-caption-strong eyebrow mb-3">{eyebrow}</div>}
      <h1 className="t-hero m-0 mx-auto max-w-[20ch]">{title}</h1>
      {lead && (
        <p className="t-lead text-muted mx-auto mt-5 max-w-[46ch]">{lead}</p>
      )}
      {children}
    </header>
  );
}
