import type { Metadata } from "next";
import { FilterableWorks } from "@/components/portfolio/FilterableWorks";
import { PageHeading } from "@/components/ui/SectionHeading";
import { getWorks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Dự án — Công trình in đã bàn giao",
  description:
    "Bảng hiệu & hộp đèn, gian hàng & sự kiện, thi công shop, trang trí lễ hội, thiết kế & in ấn — các dự án Giang Design đã bàn giao.",
  alternates: { canonical: "/du-an" },
};

export default async function PortfolioPage() {
  const works = await getWorks();

  return (
    <main className="shell pb-18 pt-14">
      <PageHeading eyebrow="Dự án" title="Công trình in đã bàn giao" className="mb-6" />
      <FilterableWorks works={works} />
    </main>
  );
}
