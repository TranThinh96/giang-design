import Link from "next/link";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { STATS } from "@/content/site";

export function Hero() {
  return (
    <section className="shell grid grid-cols-1 items-center gap-12 pb-10 pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:pt-16">
      <div>
        <div className="eyebrow mb-[18px]">
          Xưởng in offset &amp; kỹ thuật số — TP. Hồ Chí Minh
        </div>
        <h1 className="t-hero m-0 mb-5 max-w-[15ch]">
          In bao bì, tem nhãn và ấn phẩm thương hiệu
        </h1>
        <p className="ink-78 max-w-[46ch] text-[17px] leading-[1.6]">
          Offset 4–8 màu, in kỹ thuật số khổ lớn, bế – cấn – gấp – dán hoàn thiện tại
          xưởng. Nhận đơn từ 100 sản phẩm đến hàng trăm nghìn bản in, giao đúng hạn
          theo hợp đồng.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/du-an" className="btn btn-primary btn-lg">
            Xem dự án đã in
          </Link>
          <Link href="/bao-gia" className="btn btn-secondary btn-lg">
            Gửi yêu cầu báo giá
          </Link>
        </div>

        <div className="rule-grid mt-11 grid-cols-1 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.value} className="px-[18px] py-4">
              <span
                className="block text-[30px] leading-none"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "var(--font-heading-weight)",
                }}
              >
                {s.value}
              </span>
              <span className="ink-60 mt-1 block text-xs">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <ImageSlot
        placeholder="Ảnh xưởng in / sản phẩm bao bì"
        ratio="4 / 5"
        priority
        sizes="(max-width: 1024px) 100vw, 45vw"
      />
    </section>
  );
}
