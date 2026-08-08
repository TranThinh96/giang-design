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
    <main>
      <section className="tile tile-light">
        <div className="shell">
          <PageHeading
            eyebrow="Sản phẩm & dịch vụ"
            title="Danh mục in ấn"
            lead="Mỗi hạng mục có bảng chất liệu, khổ thành phẩm và số lượng tối thiểu riêng."
          />
        </div>
      </section>

      <section className="tile tile-parchment">
        <div className="shell-wide grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <article key={p.code} className="card">
              <ImageSlot
                src={p.image}
                alt={p.name}
                placeholder={p.name}
                ratio="1 / 1"
                radius="sm"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
              />
              <div className="t-caption text-muted">{p.code}</div>
              <h2 className="card-title m-0">
                <Link href={`/san-pham-dich-vu/${p.slug}`} className="text-ink">
                  {p.name}
                </Link>
              </h2>
              <p className="card-body text-muted">{p.blurb}</p>
              <dl className="t-caption text-muted m-0">
                <div>
                  <dt className="inline">Chất liệu: </dt>
                  <dd className="m-0 inline">{p.materialsShort}</dd>
                </div>
                <div>
                  <dt className="inline">Số lượng tối thiểu: </dt>
                  <dd className="m-0 inline">{p.moq}</dd>
                </div>
              </dl>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <Link
                  href={`/bao-gia?hang-muc=${encodeURIComponent(p.name)}`}
                  className="btn btn-primary btn-compact"
                >
                  Báo giá
                </Link>
                <Link
                  href={`/san-pham-dich-vu/${p.slug}`}
                  className="t-caption link"
                >
                  Thông số →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
