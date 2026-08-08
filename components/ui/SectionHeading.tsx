import type { ReactNode } from "react";

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
  onDark = false,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <header className={`text-center ${className}`}>
      {eyebrow && (
        <div
          className={`t-caption-strong mb-3 ${onDark ? "text-muted-on-dark" : "text-muted"}`}
        >
          {eyebrow}
        </div>
      )}
      {/* Each element carries its own measure: the headline wants a tight one,
          the lead a longer one. Constraining the whole header instead would
          make the lead as narrow as the headline. */}
      <h2 className="t-display-lg m-0 mx-auto max-w-[24ch]">{title}</h2>
      {lead && (
        <p
          className={`t-lead mx-auto mt-4 max-w-[46ch] ${onDark ? "text-muted-on-dark" : "text-muted"}`}
        >
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
      {eyebrow && <div className="t-caption-strong text-muted mb-3">{eyebrow}</div>}
      <h1 className="t-hero m-0 mx-auto max-w-[20ch]">{title}</h1>
      {lead && (
        <p className="t-lead text-muted mx-auto mt-5 max-w-[46ch]">{lead}</p>
      )}
      {children}
    </header>
  );
}
