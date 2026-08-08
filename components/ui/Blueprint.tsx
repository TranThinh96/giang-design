import type { ReactNode } from "react";

/**
 * The signature motif: a hairline box with four corner registration marks
 * drawn just outside the border. Appears around every image slot and most
 * cards in the design.
 */
export function Blueprint({
  children,
  className = "",
  style,
  as: Tag = "div",
}: {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "figure" | "aside" | "section";
}) {
  return (
    <Tag className={`blueprint ${className}`} style={style}>
      {children}
      <i className="corner tl" aria-hidden />
      <i className="corner tr" aria-hidden />
      <i className="corner bl" aria-hidden />
      <i className="corner br" aria-hidden />
    </Tag>
  );
}
