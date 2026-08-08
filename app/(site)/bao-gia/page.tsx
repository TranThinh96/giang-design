import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteBrief } from "@/components/quote/QuoteBrief";
import { PageHeading } from "@/components/ui/SectionHeading";
import { getQuoteNotes, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Yêu cầu báo giá in ấn qua Zalo",
  description:
    "Nhắn Zalo để nhận báo giá in bao bì, tem nhãn, hộp giấy, catalogue. Phản hồi trong 4 giờ làm việc kèm phương án chất liệu và tiến độ giao hàng.",
  alternates: { canonical: "/bao-gia" },
};

export default async function QuotePage() {
  const [SITE, QUOTE_NOTES] = await Promise.all([getSettings(), getQuoteNotes()]);

  return (
    <main>
      <section className="tile tile-light">
        <div className="shell">
          <PageHeading
            eyebrow="Báo giá"
            title="Nhận báo giá qua Zalo"
            lead="Nhanh hơn biểu mẫu: gửi được file thiết kế và trao đổi ngay trong khung chat. Phản hồi trong 4 giờ làm việc."
          >
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="btn btn-primary btn-hero"
                href={SITE.zalo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Nhắn Zalo ngay
              </a>
              <a className="btn btn-secondary btn-hero" href={SITE.phoneHref}>
                Gọi {SITE.phone}
              </a>
            </div>
            <p className="t-caption text-muted mt-5">
              Hoặc gửi email tới{" "}
              <a className="link" href={`mailto:${SITE.emailSales}`}>
                {SITE.emailSales}
              </a>
            </p>
          </PageHeading>

          <Suspense
            fallback={
              <div className="t-caption text-muted mt-10 text-center">
                Đang tải nội dung…
              </div>
            }
          >
            <QuoteBrief />
          </Suspense>
        </div>
      </section>

      <section className="tile tile-parchment">
        <div className="shell-wide grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {QUOTE_NOTES.map((q) => (
            <div key={q.t} className="card">
              <h2 className="t-tagline m-0">{q.t}</h2>
              <p className="card-body text-muted">{q.b}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
