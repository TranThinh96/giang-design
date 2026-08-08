import type { ReactNode } from "react";

/**
 * The numbered section header used down the home page:
 * "01 — Dự án tiêu biểu" over an h2, sitting on a hairline rule, with an
 * optional link pinned to the right of the rule.
 */
export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div
      className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pb-3.5"
      style={{ borderBottom: "1px solid var(--color-divider)" }}
    >
      <div>
        <div className="eyebrow mb-2">{eyebrow}</div>
        <h2 className="t-section m-0">{title}</h2>
      </div>
      {action}
    </div>
  );
}

/** Page-level header for the inner routes: eyebrow over a large h1. */
export function PageHeading({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={className}>
      <div className="eyebrow mb-2.5">{eyebrow}</div>
      <h1 className="t-page-title m-0">{title}</h1>
      {children}
    </header>
  );
}
