import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { PageHeading } from "@/components/ui/SectionHeading";
import { getProducts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sản phẩm & dịch vụ — Danh mục in ấn",
  description:
    "Tem nhãn & decal, bao bì giấy, hộp giấy & carton, túi giấy, catalogue, brochure, danh thiếp, standee. Bảng chất liệu, khổ thành phẩm và số lượng tối thiểu cho từng hạng mục.",
  alternates: { canonical: "/san-pham-dich-vu" },
};

export default async function ProductsPage() {
  const PRODUCTS = await getProducts();

  return (
    <main className="shell pb-18 pt-14">
      <PageHeading eyebrow="Sản phẩm & dịch vụ" title="Danh mục in ấn">
        <p className="ink-72 mt-3 max-w-[60ch] text-base leading-[1.65]">
          Mỗi hạng mục có bảng chất liệu, khổ thành phẩm và số lượng tối thiểu riêng.
          Chọn hạng mục để xem thông số kỹ thuật đầy đủ.
        </p>
      </PageHeading>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {PRODUCTS.map((p) => (
          <article
            key={p.code}
            className="grid grid-cols-1 items-start gap-[22px] sm:grid-cols-[200px_minmax(0,1fr)]"
          >
            <ImageSlot
              src={p.image}
              alt={p.name}
              placeholder={p.name}
              ratio="1 / 1"
              sizes="(max-width: 640px) 100vw, 200px"
            />
            <div>
              <div
                className="text-[10px] uppercase tracking-[0.12em]"
                style={{ color: "var(--color-accent-700)" }}
              >
                {p.code}
              </div>
              <h3 className="mb-2 mt-1.5">
                <Link
                  href={`/san-pham-dich-vu/${p.slug}`}
                  className="no-underline"
                  style={{ color: "var(--color-text)" }}
                >
                  {p.name}
                </Link>
              </h3>
              <p className="ink-70 m-0 mb-2.5 text-sm leading-[1.6]">{p.blurb}</p>
              <dl className="ink-55 m-0 text-xs leading-[1.7]">
                <div>
                  <dt className="inline">Chất liệu: </dt>
                  <dd className="m-0 inline">{p.materialsShort}</dd>
                </div>
                <div>
                  <dt className="inline">Số lượng tối thiểu: </dt>
                  <dd className="m-0 inline">{p.moq}</dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <Link
                  href={`/san-pham-dich-vu/${p.slug}`}
                  className="btn btn-secondary"
                >
                  Thông số
                </Link>
                <Link
                  href={`/bao-gia?hang-muc=${encodeURIComponent(p.name)}`}
                  className="btn btn-primary"
                >
                  Báo giá
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
