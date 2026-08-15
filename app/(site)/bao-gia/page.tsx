import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteBrief } from "@/components/quote/QuoteBrief";
import { SurveyBrief } from "@/components/quote/SurveyBrief";
import { Icon } from "@/components/ui/Icon";
import { PageHeading } from "@/components/ui/SectionHeading";
import { getPriceList, getQuoteNotes, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Báo giá in ấn & đặt lịch khảo sát công trình",
  description:
    "Hai cách nhận báo giá: gửi file cho đơn in ấn, hoặc đặt lịch khảo sát mặt bằng cho bảng hiệu, hộp đèn, thi công shop và gian hàng. Khảo sát miễn phí nội thành TP.HCM, phản hồi trong 4 giờ làm việc.",
  alternates: { canonical: "/bao-gia" },
};

export default async function QuotePage() {
  const [SITE, QUOTE_NOTES, PRICES] = await Promise.all([
    getSettings(),
    getQuoteNotes(),
    getPriceList(),
  ]);

  return (
    <main>
      <section className="hero-ground tile">
        <div className="shell">
          <PageHeading
            eyebrow="Báo giá"
            title="Hai cách nhận báo giá"
            lead="Đơn in ấn báo giá từ file. Công trình bảng hiệu, thi công và gian hàng báo giá sau khi khảo sát mặt bằng."
          />

          {/* The fork comes before anything else: which path a visitor is on
              decides every question they will be asked, and getting it wrong
              wastes a round trip for both sides. */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a href="#in-an" className="action">
              <span className="icon-badge">
                <Icon name="printer" size={22} />
              </span>
              <span className="min-w-0">
                <span className="t-body-strong text-ink block">
                  Tôi cần in ấn
                </span>
                <span className="t-caption text-muted mt-1 block">
                  Decal, PP, hiflex, standee, catalogue, tem nhãn, bao bì — gửi
                  file, có giá trong 4 giờ làm việc.
                </span>
              </span>
            </a>
            <a href="#khao-sat" className="action">
              <span className="icon-badge">
                <Icon name="pin" size={22} />
              </span>
              <span className="min-w-0">
                <span className="t-body-strong text-ink block">
                  Tôi cần làm công trình
                </span>
                <span className="t-caption text-muted mt-1 block">
                  Bảng hiệu, hộp đèn, chữ nổi, gian hàng, thi công shop, trang trí
                  — khảo sát miễn phí nội thành.
                </span>
              </span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              className="btn btn-primary btn-hero"
              href={SITE.zalo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="chat" size={18} />
              Nhắn Zalo ngay
            </a>
            <a className="btn btn-secondary btn-hero" href={SITE.phoneHref}>
              <Icon name="phone" size={18} />
              Gọi {SITE.phone}
            </a>
            <a
              className="btn btn-secondary btn-hero"
              href={`mailto:${SITE.emailSales}`}
            >
              <Icon name="mail" size={18} />
              Gửi email
            </a>
          </div>
        </div>
      </section>

      {/* — path one: printing — */}
      <section id="in-an" className="tile tile-parchment">
        <div className="shell">
          <div className="mb-10">
            <div className="t-caption-strong eyebrow mb-3">Cách 1</div>
            <h2 className="t-display-md m-0">Đơn in ấn — báo giá từ file</h2>
            <p className="t-body text-muted mt-4 mb-0 max-w-[56ch]">
              Nhanh hơn biểu mẫu: gửi được file thiết kế và trao đổi ngay trong
              khung chat. Chưa có file thì xưởng thiết kế, tính riêng.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="t-caption text-muted text-center">
                Đang tải nội dung…
              </div>
            }
          >
            <QuoteBrief zalo={SITE.zalo} />
          </Suspense>
        </div>
      </section>

      {/* — path two: the site survey — */}
      <section id="khao-sat" className="tile tile-light">
        <div className="shell">
          <div className="mb-10">
            <div className="t-caption-strong eyebrow mb-3">Cách 2</div>
            <h2 className="t-display-md m-0">Công trình — đặt lịch khảo sát</h2>
            <p className="t-body text-muted mt-4 mb-0 max-w-[56ch]">
              Xưởng tới tận nơi đo đạc, tư vấn vật tư và chụp hiện trạng — miễn
              phí trong nội thành TP.HCM. Sau khảo sát bạn nhận phối cảnh và bảng
              dự toán từng hạng mục; vật tư chỉ được cắt sau khi bạn duyệt.
            </p>
          </div>

          <SurveyBrief zalo={SITE.zalo} />

          <ol className="reveal m-0 mt-12 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-3">
            {[
              {
                t: "Đặt lịch",
                b: "Nhắn địa chỉ và khung giờ tiện — xưởng xác nhận trong ngày làm việc.",
              },
              {
                t: "Khảo sát tại chỗ",
                b: "Đo đạc, kiểm tra vị trí điện, tư vấn vật tư và kiểu bảng phù hợp mặt bằng.",
              },
              {
                t: "Phối cảnh & dự toán",
                b: "Nhận bản dựng và bảng giá từng hạng mục trong 1–3 ngày làm việc.",
              },
            ].map((s, i) => (
              <li key={s.t}>
                <div className="icon-badge icon-badge-gold t-body-strong">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="t-tagline mb-2 mt-4">{s.t}</h3>
                <p className="t-caption text-muted m-0">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* — reference prices — the question everyone asks first ——————————
          An empty list collapses the whole section rather than shipping an
          empty table: a price list with nothing in it is worse than none. */}
      {PRICES.items.length > 0 && (
        <section id="bang-gia" className="tile tile-dark">
          <div className="shell">
            <div className="mb-10">
              <div className="t-caption-strong eyebrow-on-dark mb-3">
                Giá tham khảo
              </div>
              <h2 className="t-display-md m-0">Đơn vị tính của từng hạng mục</h2>
              <p className="t-body text-muted-on-dark mt-4 mb-0 max-w-[56ch]">
                Bảng dưới cho biết mỗi hạng mục được tính theo đơn vị nào — m²,
                bộ chữ hay trọn gói — để bạn biết cần cung cấp thông tin gì khi
                hỏi giá.
              </p>
            </div>

            <div className="table-scroll">
              <table className="table table-on-dark">
                <thead>
                  <tr>
                    <th scope="col">Hạng mục</th>
                    <th scope="col">Đơn vị</th>
                    <th scope="col">Giá từ</th>
                    <th scope="col">Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICES.items.map((r) => (
                    <tr key={r.item}>
                      <th scope="row" className="font-normal">
                        {r.item}
                      </th>
                      <td>{r.unit}</td>
                      <td>{r.from}</td>
                      <td className="text-muted-on-dark">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {PRICES.updated && (
              <p className="t-caption text-muted-on-dark mt-6 mb-0">
                Cập nhật {PRICES.updated}.
              </p>
            )}
            {PRICES.note && (
              <p className="t-caption text-muted-on-dark mt-2 mb-0 max-w-[70ch]">
                {PRICES.note}
              </p>
            )}
          </div>
        </section>
      )}

      <section className="tile tile-parchment">
        <div className="shell-wide reveal grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {QUOTE_NOTES.map((q) => (
            <div key={q.t} className="card">
              <span className="icon-badge">
                <Icon name="shield" size={22} />
              </span>
              <h2 className="t-tagline m-0">{q.t}</h2>
              <p className="card-body text-muted">{q.b}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
