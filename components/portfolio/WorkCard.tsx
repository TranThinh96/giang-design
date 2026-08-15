import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ImageSlot } from "@/components/ui/ImageSlot";
import type { Work } from "@/lib/types";

/**
 * Portfolio tile in the utility-card grammar: white ground, one hairline,
 * 18px radius, the photo cropped 4:3 inside at the small radius. `onDark`
 * swaps the card onto the ink-blue tile surface.
 *
 * The whole card is a link to the project's page. For an advertising workshop
 * the portfolio *is* the pitch, so a card that only showed a photo and a spec
 * line was throwing away the sale — and the URL it now has is what lets a
 * finished job rank for the district it was built in.
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
    <Link
      href={`/du-an/${work.slug}`}
      className={`card card-link ${onDark ? "card-on-dark" : ""} m-0 h-full`}
    >
      <ImageSlot
        src={work.image}
        alt={work.title}
        placeholder={work.ph}
        ratio="4 / 3"
        radius="sm"
        sizes={sizes}
        className="media-zoom"
      />
      <div className={`t-fine-print ${onDark ? "eyebrow-on-dark" : "eyebrow"}`}>
        {work.cat}
      </div>
      <div className="card-title">{work.title}</div>
      <div
        className={`t-caption flex-1 ${onDark ? "text-muted-on-dark" : "text-muted"}`}
      >
        {work.spec}
        {work.location ? ` · ${work.location}` : ""}
      </div>
      <span
        className={`t-caption-strong inline-flex items-center gap-1.5 ${
          onDark ? "link-on-dark" : "link"
        }`}
      >
        Xem công trình
        <span className="card-go">
          <Icon name="arrow-right" size={15} />
        </span>
      </span>
    </Link>
  );
}
