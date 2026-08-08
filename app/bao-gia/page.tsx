import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteBrief } from "@/components/quote/QuoteBrief";
import { PageHeading } from "@/components/ui/SectionHeading";
import { QUOTE_NOTES, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Yêu cầu báo giá in ấn qua Zalo",
  description:
    "Nhắn Zalo để nhận báo giá in bao bì, tem nhãn, hộp giấy, catalogue. Phản hồi trong 4 giờ làm việc kèm phương án chất liệu và tiến độ giao hàng.",
  alternates: { canonical: "/bao-gia" },
};

export default function QuotePage() {
  return (
    <main className="shell grid grid-cols-1 items-start gap-12 pb-18 pt-14 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
      <div>
        <PageHeading eyebrow="Báo giá" title="Nhận báo giá qua Zalo">
          <p className="ink-72 mt-3 max-w-[52ch] text-base leading-[1.65]">
            Nhắn thẳng cho bộ phận kinh doanh trên Zalo — nhanh hơn biểu mẫu, gửi
            được file thiết kế và trao đổi qua lại ngay trong khung chat. Phản hồi
            trong 4 giờ làm việc.
          </p>
        </PageHeading>

        <div className="mt-7 flex flex-wrap gap-2.5">
          <a
            className="btn btn-primary px-6 py-[11px] text-[15px]"
            href={SITE.zalo}
            target="_blank"
            rel="noopener noreferrer"
          >
            Nhắn Zalo ngay
          </a>
          <a className="btn btn-secondary" href={SITE.phoneHref}>
            Gọi {SITE.phone}
          </a>
          <a className="btn btn-secondary" href={`mailto:${SITE.emailSales}`}>
            {SITE.emailSales}
          </a>
        </div>

        <Suspense
          fallback={<div className="ink-55 mt-8 text-sm">Đang tải nội dung…</div>}
        >
          <QuoteBrief />
        </Suspense>
      </div>

      <aside className="rule-grid grid-cols-1">
        {QUOTE_NOTES.map((q) => (
          <div key={q.t} className="p-[22px]">
            <div
              className="mb-1.5 text-lg"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: "var(--font-heading-weight)",
              }}
            >
              {q.t}
            </div>
            <p className="ink-65 m-0 text-[13px] leading-[1.6]">{q.b}</p>
          </div>
        ))}
      </aside>
    </main>
  );
}
