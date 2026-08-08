import { ImageSlot } from "@/components/ui/ImageSlot";
import type { Work } from "@/lib/types";

/**
 * Portfolio tile in the utility-card grammar: white ground, one hairline,
 * 18px radius, the photo cropped square-ish inside at the small radius.
 * `onDark` swaps the card onto the near-black tile surface.
 */
export function WorkCard({
  work,
  onDark = false,
  sizes,
}: {
  work: Work;
  onDark?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={`card ${onDark ? "card-on-dark" : ""} m-0`}>
      <ImageSlot
        src={work.image}
        alt={work.title}
        placeholder={work.ph}
        ratio="4 / 3"
        radius="sm"
        sizes={sizes}
      />
      <figcaption className="mt-1">
        <div className="card-title">{work.title}</div>
        <div className={`t-caption mt-1 ${onDark ? "text-muted-on-dark" : "text-muted"}`}>
          {work.cat} · {work.spec}
        </div>
      </figcaption>
    </figure>
  );
}
