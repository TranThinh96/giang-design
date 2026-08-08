import { ImageSlot } from "@/components/ui/ImageSlot";
import type { Work } from "@/lib/types";

/** Portfolio tile. `compact` is the home-page variant: title and spec on one row. */
export function WorkCard({ work, compact = false }: { work: Work; compact?: boolean }) {
  return (
    <figure>
      <ImageSlot src={work.image} alt={work.title} placeholder={work.ph} ratio="4 / 3" />
      {compact ? (
        <figcaption className="mt-3.5 flex justify-between gap-3 text-xs">
          <span
            className="text-[15px]"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
          >
            {work.title}
          </span>
          <span className="ink-55 shrink-0">{work.spec}</span>
        </figcaption>
      ) : (
        <figcaption className="mt-3.5">
          <div
            className="text-[17px]"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
          >
            {work.title}
          </div>
          <div className="ink-55 mt-0.5 text-xs">
            {work.cat} · {work.spec}
          </div>
        </figcaption>
      )}
    </figure>
  );
}
