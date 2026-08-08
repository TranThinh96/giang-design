import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** The closing tile. Darkest surface in the stack, one primary pill. */
export function CtaBand() {
  return (
    <section className="tile tile-dark-3">
      <div className="shell">
        <SectionHeading
          onDark
          eyebrow="Bắt đầu đơn hàng"
          title="Gửi yêu cầu hôm nay, có báo giá trong 4 giờ làm việc"
          lead="Kèm phương án chất liệu, khổ thành phẩm và tiến độ giao hàng."
        >
          <Link href="/bao-gia" className="btn btn-primary btn-hero">
            Yêu cầu báo giá
          </Link>
          <Link href="/lien-he" className="btn btn-secondary-on-dark btn-hero">
            Liên hệ xưởng
          </Link>
        </SectionHeading>
      </div>
    </section>
  );
}
