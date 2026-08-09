import type { Metadata } from "next";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { PageHeading, SectionHeading } from "@/components/ui/SectionHeading";
import { getPageImages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Giới thiệu — Một xưởng in vận hành như một nhà máy",
  description:
    "Giang Design – Advertising vận hành dây chuyền offset 4 màu, in kỹ thuật số khổ lớn và tổ hoàn thiện bế – cấn – dán hộp khép kín tại TP.HCM.",
  alternates: { canonical: "/gioi-thieu" },
};

const PILLARS = [
  {
    h: "Tầm nhìn",
    p: "Trở thành đối tác in bao bì được chọn đầu tiên của các thương hiệu Việt tầm trung.",
  },
  {
    h: "Sứ mệnh",
    p: "Giữ chất lượng bản in ổn định qua từng lô, minh bạch về chất liệu và tiến độ.",
  },
];

const COMMITMENTS = [
  "Kiểm màu theo thang Pantone, sai lệch ΔE ≤ 3 so với mẫu duyệt.",
  "Giấy có chứng từ nguồn gốc, mực gốc soy cho bao bì thực phẩm.",
  "Kiểm 100% thành phẩm trước đóng gói; bù hao trong hợp đồng.",
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
            title="Một xưởng in vận hành như một nhà máy"
          />
          {/* Weight 300 at 24px — the airy read the system reserves for a
              handful of long-form paragraphs. */}
          <p className="t-lead-airy text-muted mx-auto mt-10 max-w-[62ch] text-center">
            Giang Design – Advertising bắt đầu từ một xưởng gia công decal nhỏ năm
            2010, nay vận hành dây chuyền offset 4 màu, in kỹ thuật số khổ lớn và tổ
            hoàn thiện bế – cấn – dán hộp khép kín.
          </p>
        </div>

        <div className="mt-14">
          <ImageSlot
            src={IMAGES.aboutHero}
            alt="Toàn cảnh nhà xưởng in Giang Design tại TP.HCM"
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
            title="Mỗi đơn hàng có một phiếu công nghệ"
          />
          <p className="t-body text-muted mx-auto mt-8 max-w-[62ch] text-center">
            Chúng tôi không nhận đơn theo cảm tính: mỗi yêu cầu đều được lập phiếu
            công nghệ — chất liệu, định lượng, hệ màu, cấn bế, cán màng, dung sai —
            trước khi lên máy. Khách hàng ký duyệt mẫu in thử, sau đó sản lượng chạy
            đúng theo mẫu đã duyệt.
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
          <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-3">
            {COMMITMENTS.map((c) => (
              <li key={c} className="t-body text-muted-on-dark">
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="shell-wide mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <ImageSlot
            src={IMAGES.aboutMachine}
            alt="Máy in offset 4 màu đang chạy sản lượng tại xưởng"
            placeholder="Máy offset"
            ratio="4 / 3"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          <ImageSlot
            src={IMAGES.aboutFinishing}
            alt="Tổ hoàn thiện bế – cấn – dán hộp tại xưởng"
            placeholder="Tổ hoàn thiện"
            ratio="4 / 3"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      </section>
    </main>
  );
}
