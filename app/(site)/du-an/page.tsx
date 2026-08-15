import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { FilterableWorks } from "@/components/portfolio/FilterableWorks";
import { PageHeading } from "@/components/ui/SectionHeading";
import { getWorks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Dự án — Công trình quảng cáo đã bàn giao",
  description:
    "Bảng hiệu & hộp đèn, gian hàng & sự kiện, thi công shop, trang trí lễ hội, thiết kế & in ấn — các công trình Giang Design đã bàn giao tại TP.HCM.",
  alternates: { canonical: "/du-an" },
};

export default async function PortfolioPage() {
  const works = await getWorks();

  return (
    <main>
      <section className="hero-ground tile">
        <div className="shell">
          <PageHeading
            eyebrow="Dự án"
            title="Công trình đã bàn giao"
            lead="Lọc theo hạng mục để xem đúng loại công trình bạn đang cần — bấm vào từng dự án để xem chi tiết vật tư và bộ ảnh."
          />
        </div>
      </section>

      <section className="tile tile-parchment">
        <div className="shell-wide">
          <FilterableWorks works={works} />
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
