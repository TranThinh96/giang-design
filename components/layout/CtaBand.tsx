import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSettings } from "@/lib/content";

/**
 * The closing tile — the page's full field of brand blue at the moment of
 * conversion.
 *
 * It now offers all three ways to reach the workshop rather than two page
 * links: Zalo (where a file can be attached), the phone (where a deadline can
 * be argued), and the quote page (where the brief is spelled out). Whichever
 * the visitor prefers, they should not have to go looking for it.
 */
export async function CtaBand() {
  const SITE = await getSettings();

  return (
    <section className="tile tile-brand">
      <div className="shell">
        <SectionHeading
          tone="brand"
          eyebrow="Bắt đầu đơn hàng"
          title="Gửi yêu cầu hôm nay, có báo giá trong 4 giờ làm việc"
          lead="Kèm phương án chất liệu, khổ thành phẩm và tiến độ giao hàng."
        >
          <a
            className="btn btn-on-brand btn-hero"
            href={SITE.zalo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="chat" size={18} />
            Nhắn Zalo ngay
          </a>
          <a className="btn btn-secondary-on-brand btn-hero" href={SITE.phoneHref}>
            <Icon name="phone" size={18} />
            Gọi {SITE.phone}
          </a>
          <Link href="/bao-gia" className="btn btn-secondary-on-brand btn-hero">
            Xem cách gửi yêu cầu
          </Link>
        </SectionHeading>

        <p className="t-caption text-muted-on-brand mt-8 text-center">
          {SITE.hours} · {SITE.address.district}, {SITE.address.city} ·{" "}
          <a href={`mailto:${SITE.emailSales}`} className="text-on-brand underline">
            {SITE.emailSales}
          </a>
        </p>
      </div>
    </section>
  );
}
