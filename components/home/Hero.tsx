import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { getPageImages, getSettings, getStats } from "@/lib/content";

/** The three promises that decide whether a buyer keeps reading. They sit
 *  under the CTAs, not in a section of their own, because they are the
 *  answer to "can you actually do this for me, and when". */
const ASSURANCES = [
  "Báo giá trong 4 giờ làm việc",
  "In khổ lớn lấy trong ngày",
  "Khảo sát mặt bằng miễn phí nội thành",
];

/**
 * The opening tile: a centred stack on a wash of the brand blue, two CTAs —
 * one to ask for a price, one to call the workshop directly — and the
 * workshop photograph running full bleed underneath.
 *
 * The stats moved onto their own blue band below the photograph. On the white
 * ground they read as three floating numbers; on the band they read as the
 * workshop's record, and they give the page its second field of brand colour
 * without competing with the closing CTA.
 */
export async function Hero() {
  const [STATS, IMAGES, SITE] = await Promise.all([
    getStats(),
    getPageImages(),
    getSettings(),
  ]);

  return (
    <section>
      <div className="hero-ground tile">
        <div className="shell text-center">
          <div className="t-caption-strong eyebrow mb-4">
            Thiết kế · In ấn quảng cáo · Bảng hiệu — TP. Hồ Chí Minh
          </div>
          <h1 className="t-hero m-0 mx-auto max-w-[19ch]">
            In ấn quảng cáo, bảng hiệu và thi công trọn gói
          </h1>
          <p className="t-lead text-muted mx-auto mt-5 max-w-[38ch]">
            In khổ lớn lấy trong ngày, bảng hiệu – hộp đèn khảo sát tận nơi, thiết
            kế và dựng file in ngay tại xưởng.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/bao-gia" className="btn btn-primary btn-hero">
              Gửi yêu cầu báo giá
            </Link>
            <a href={SITE.phoneHref} className="btn btn-secondary btn-hero">
              <Icon name="phone" size={18} />
              Gọi {SITE.phone}
            </a>
          </div>

          <ul className="mx-auto mt-8 flex list-none flex-wrap justify-center gap-x-7 gap-y-3 p-0">
            {ASSURANCES.map((a) => (
              <li key={a} className="t-caption text-muted inline-flex items-center gap-2">
                <span className="text-primary flex-none">
                  <Icon name="check" size={16} />
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* Full bleed and square-cornered: hero photography runs edge to edge,
            and the system's one shadow is for product renders resting on a
            surface, not for a photograph that already fills the tile. */}
        <div className="mt-14">
          <ImageSlot
            src={IMAGES.homeHero}
            alt="Xưởng Giang Design — khu in khổ lớn và gia công bảng hiệu"
            placeholder="Ảnh xưởng / công trình đã thi công"
            ratio="21 / 9"
            radius="none"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      <div className="tile tile-brand" style={{ paddingBlock: "var(--space-xxl)" }}>
        <div className="shell-wide grid grid-cols-1 gap-10 text-center sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.value}>
              <span className="t-display-lg block">{s.value}</span>
              <span className="t-caption text-muted-on-brand mt-2 block">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
