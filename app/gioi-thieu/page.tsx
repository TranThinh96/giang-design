import type { Metadata } from "next";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { PageHeading } from "@/components/ui/SectionHeading";

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

export default function AboutPage() {
  return (
    <main className="shell pb-18 pt-14">
      <PageHeading eyebrow="Giới thiệu" title="Một xưởng in vận hành như một nhà máy" />

      <div className="mt-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div>
          <p className="text-base leading-[1.65]">
            Giang Design – Advertising bắt đầu từ một xưởng gia công decal nhỏ năm
            2010, nay vận hành dây chuyền offset 4 màu, in kỹ thuật số khổ lớn và tổ
            hoàn thiện bế – cấn – dán hộp khép kín.
          </p>
          <p className="text-base leading-[1.65]">
            Chúng tôi không nhận đơn theo cảm tính: mỗi yêu cầu đều được lập phiếu công
            nghệ — chất liệu, định lượng, hệ màu, cấn bế, cán màng, dung sai — trước khi
            lên máy. Khách hàng ký duyệt mẫu in thử, sau đó sản lượng chạy đúng theo mẫu
            đã duyệt.
          </p>

          <div className="rule-grid mt-7 grid-cols-1 sm:grid-cols-2">
            {PILLARS.map((x) => (
              <div key={x.h} className="p-5">
                <h4 className="m-0 mb-1.5">{x.h}</h4>
                <p className="ink-65 m-0 text-[13px] leading-[1.6]">{x.p}</p>
              </div>
            ))}
          </div>

          <h3 className="mb-3.5 mt-9">Cam kết chất lượng</h3>
          <ul className="ink-78 m-0 list-disc pl-[18px] text-sm leading-[1.9]">
            {COMMITMENTS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-5">
          <ImageSlot
            placeholder="Nhà xưởng"
            ratio="3 / 2"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="grid min-w-0 grid-cols-2 gap-5">
            <ImageSlot
              placeholder="Máy offset"
              ratio="1 / 1"
              sizes="(max-width: 1024px) 50vw, 22vw"
            />
            <ImageSlot
              placeholder="Tổ hoàn thiện"
              ratio="1 / 1"
              sizes="(max-width: 1024px) 50vw, 22vw"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
