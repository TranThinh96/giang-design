import Link from "next/link";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { getStats } from "@/lib/content";

/**
 * The opening tile: a centred stack of headline, one-line lead, two pill
 * CTAs, and the product photograph resting on the white surface with the
 * system's single drop-shadow. The workshop's numbers sit underneath as a
 * quiet three-column row — no rules, no boxes, just air.
 */
export async function Hero() {
  const STATS = await getStats();

  return (
    <section className="tile tile-light">
      <div className="shell text-center">
        <div className="t-caption-strong eyebrow mb-4">
          Xưởng in offset &amp; kỹ thuật số — TP. Hồ Chí Minh
        </div>
        <h1 className="t-hero m-0 mx-auto max-w-[18ch]">
          In bao bì, tem nhãn và ấn phẩm thương hiệu
        </h1>
        <p className="t-lead text-muted mx-auto mt-5 max-w-[34ch]">
          Offset 4–8 màu, in kỹ thuật số khổ lớn, hoàn thiện tại xưởng.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <Link href="/bao-gia" className="btn btn-primary btn-hero">
            Gửi yêu cầu báo giá
          </Link>
          <Link href="/du-an" className="btn btn-secondary btn-hero">
            Xem dự án đã in
          </Link>
        </div>
      </div>

      {/* Full bleed and square-cornered: hero photography runs edge to edge,
          and the system's one shadow is for product renders resting on a
          surface, not for a photograph that already fills the tile. */}
      <div className="mt-14">
        <ImageSlot
          placeholder="Ảnh xưởng in / sản phẩm bao bì"
          ratio="21 / 9"
          radius="none"
          priority
          sizes="100vw"
        />
      </div>

      <div className="shell-wide mt-14 grid grid-cols-1 gap-10 text-center sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.value}>
            <span className="t-display-lg block">{s.value}</span>
            <span className="t-caption text-muted mt-2 block">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
