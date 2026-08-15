import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { PageHeading, SectionHeading } from "@/components/ui/SectionHeading";
import { getPageImages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Giới thiệu — Xưởng làm được cả bản in và công trình",
  description:
    "Giang Design – Advertising vận hành khu in kỹ thuật số khổ lớn, xưởng gia công bảng hiệu – hộp đèn – chữ nổi LED và bộ phận thiết kế tại TP.HCM.",
  alternates: { canonical: "/gioi-thieu" },
};

const PILLARS = [
  {
    h: "Tầm nhìn",
    p: "Trở thành đầu mối quảng cáo được chọn đầu tiên của chuỗi bán lẻ và chủ shop tại TP.HCM.",
  },
  {
    h: "Sứ mệnh",
    p: "Một đầu mối lo từ file thiết kế tới công trình bàn giao — minh bạch về vật tư, giá và tiến độ.",
  },
];

const COMMITMENTS = [
  "Bản in đúng mẫu đã duyệt; in lại bằng chi phí của xưởng nếu lệch so với mẫu ký.",
  "Vật tư đúng chủng loại ghi trong báo giá — bảo hành 12 tháng phần điện và kết cấu.",
  "Nghiệm thu từng hạng mục, có biên bản; giữ nguyên giá đã chốt tới khi bàn giao.",
];

export default async function AboutPage() {
  const IMAGES = await getPageImages();

  return (
    <main>
      {/* — the opening statement, and the workshop itself — */}
      <section className="tile tile-light">
        <div className="shell">
          <PageHeading
            eyebrow="Giới thiệu"
            title="Một xưởng làm được cả bản in và công trình"
          />
          {/* Weight 300 at 24px — the airy read the system reserves for a
              handful of long-form paragraphs. */}
          <p className="t-lead-airy text-muted mx-auto mt-10 max-w-[62ch] text-center">
            Giang Design – Advertising bắt đầu từ một xưởng gia công decal nhỏ năm
            2010. Nay xưởng có khu in kỹ thuật số khổ lớn, tổ gia công bảng hiệu –
            hộp đèn – chữ nổi LED, đội thi công lắp đặt và một bộ phận thiết kế
            riêng — nên một khách hàng chỉ cần làm việc với một đầu mối.
          </p>
        </div>

        <div className="mt-14">
          <ImageSlot
            src={IMAGES.aboutHero}
            alt="Toàn cảnh xưởng Giang Design tại TP.HCM"
            placeholder="Nhà xưởng"
            ratio="21 / 9"
            radius="none"
            priority
            sizes="100vw"
          />
        </div>
      </section>

      {/* — how the work is actually run — */}
      <section className="tile tile-parchment">
        <div className="shell">
          <SectionHeading
            eyebrow="Cách làm việc"
            title="Không có gì được cắt trước khi bạn duyệt"
          />
          <p className="t-body text-muted mx-auto mt-8 max-w-[62ch] text-center">
            Đơn in có phiếu công nghệ — chất liệu, định lượng, hệ màu, cán màng,
            dung sai — và khách ký duyệt mẫu in thử trước khi chạy sản lượng. Công
            trình bảng hiệu, gian hàng hay thi công shop thì có hồ sơ riêng: biên
            bản khảo sát mặt bằng, phối cảnh 3D và bảng dự toán từng hạng mục. Vật
            tư chỉ được cắt sau khi bạn duyệt phối cảnh.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PILLARS.map((x) => (
              <div key={x.h} className="card">
                <h3 className="t-tagline m-0">{x.h}</h3>
                <p className="card-body text-muted">{x.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* — the promises, on the dark step — */}
      <section className="tile tile-dark">
        <div className="shell">
          <SectionHeading tone="dark" eyebrow="Cam kết" title="Cam kết chất lượng" />
          <ul className="reveal m-0 mt-12 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-3">
            {COMMITMENTS.map((c) => (
              <li key={c} className="flex items-start gap-4">
                <span className="icon-badge icon-badge-on-dark">
                  <Icon name="shield" size={22} />
                </span>
                <span className="t-body text-muted-on-dark">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="shell-wide mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <ImageSlot
            src={IMAGES.aboutMachine}
            alt="Khu in kỹ thuật số khổ lớn đang chạy sản lượng tại xưởng"
            placeholder="Khu in khổ lớn"
            ratio="4 / 3"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          <ImageSlot
            src={IMAGES.aboutFinishing}
            alt="Tổ gia công bảng hiệu – hộp đèn tại xưởng"
            placeholder="Tổ gia công bảng hiệu"
            ratio="4 / 3"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
