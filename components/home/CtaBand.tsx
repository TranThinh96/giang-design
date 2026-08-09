import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * The closing tile — and the page's one full field of brand blue.
 *
 * It sits at the end of the stack on purpose: the visitor has already read
 * the capability and the work, so the moment the sign's own colour arrives
 * is the moment they are asked to act. The pills invert against it (paper
 * fill, brand label) because the accent is now the ground.
 */
export function CtaBand() {
  return (
    <section className="tile tile-brand">
      <div className="shell">
        <SectionHeading
          tone="brand"
          eyebrow="Bắt đầu đơn hàng"
          title="Gửi yêu cầu hôm nay, có báo giá trong 4 giờ làm việc"
          lead="Kèm phương án chất liệu, khổ thành phẩm và tiến độ giao hàng."
        >
          <Link href="/bao-gia" className="btn btn-on-brand btn-hero">
            Yêu cầu báo giá
          </Link>
          <Link href="/lien-he" className="btn btn-secondary-on-brand btn-hero">
            Liên hệ xưởng
          </Link>
        </SectionHeading>
      </div>
    </section>
  );
}
