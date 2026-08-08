import Link from "next/link";

export function CtaBand() {
  return (
    <section style={{ background: "var(--color-accent-900)", color: "#f2f2f3" }}>
      <div className="shell flex flex-wrap items-center justify-between gap-10 py-14">
        <div>
          <div
            className="mb-2.5 text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "var(--color-accent-300)" }}
          >
            Bắt đầu đơn hàng
          </div>
          <h2 className="t-cta m-0 mb-2 max-w-[22ch]">
            Gửi yêu cầu hôm nay, có báo giá trong 4 giờ làm việc
          </h2>
          <p
            className="m-0 text-[15px]"
            style={{ color: "color-mix(in srgb, #f2f2f3 70%, transparent)" }}
          >
            Kèm phương án chất liệu, khổ thành phẩm và tiến độ giao hàng.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/bao-gia" className="btn btn-invert px-6 py-3 text-[15px]">
            Yêu cầu báo giá
          </Link>
          <Link
            href="/lien-he"
            className="btn btn-invert-outline px-6 py-3 text-[15px]"
          >
            Liên hệ xưởng
          </Link>
        </div>
      </div>
    </section>
  );
}
