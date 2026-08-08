import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blueprint } from "@/components/ui/Blueprint";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { getProduct, getProducts, getSettings } from "@/lib/content";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — in ấn theo yêu cầu`,
    description: p.long,
    alternates: { canonical: `/san-pham-dich-vu/${p.slug}` },
    openGraph: { title: p.name, description: p.long },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [item, SITE] = await Promise.all([getProduct(slug), getSettings()]);
  if (!item) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    sku: item.code,
    description: item.long,
    category: "In ấn",
    material: item.materials.join(", "),
    brand: { "@type": "Brand", name: SITE.name },
    url: `${SITE.url}/san-pham-dich-vu/${item.slug}`,
  };

  return (
    <main className="shell pb-18 pt-8">
      <nav aria-label="Breadcrumb" className="ink-55 mb-7 text-[13px]">
        <Link
          href="/san-pham-dich-vu"
          className="no-underline"
          style={{ color: "inherit" }}
        >
          Sản phẩm &amp; dịch vụ
        </Link>{" "}
        / <span style={{ color: "var(--color-text)" }}>{item.name}</span>
      </nav>

      <div className="grid grid-cols-1 items-start gap-13 lg:grid-cols-2 lg:gap-[52px]">
        <div className="grid min-w-0 grid-cols-1 gap-4">
          <ImageSlot
            src={item.image}
            alt={`${item.name} — ảnh sản phẩm`}
            placeholder="Ảnh sản phẩm chính"
            ratio="4 / 3"
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="grid min-w-0 grid-cols-3 gap-4">
            <ImageSlot placeholder="Chi tiết" ratio="1 / 1" sizes="15vw" />
            <ImageSlot placeholder="Chất liệu" ratio="1 / 1" sizes="15vw" />
            <ImageSlot placeholder="Thành phẩm" ratio="1 / 1" sizes="15vw" />
          </div>
        </div>

        <div>
          <div
            className="text-[10px] uppercase tracking-[0.12em]"
            style={{ color: "var(--color-accent-700)" }}
          >
            {item.code}
          </div>
          <h1 className="t-detail-title mb-3.5 mt-2">{item.name}</h1>
          <p className="ink-78 text-base leading-[1.65]">{item.long}</p>

          <h4 className="mb-2.5 mt-7">Thông số kỹ thuật</h4>
          <div className="table-scroll">
            <table className="table">
              <tbody>
                {item.specs.map((s) => (
                  <tr key={s.k}>
                    <th
                      scope="row"
                      className="ink-55 w-[38%] !border-b-[color:color-mix(in_srgb,var(--color-text)_8%,transparent)] !text-[14px] !normal-case !tracking-normal"
                    >
                      {s.k}
                    </th>
                    <td>{s.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="mb-2.5 mt-7">Chất liệu thường dùng</h4>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {item.materials.map((m) => (
              <li key={m} className="tag tag-outline">
                {m}
              </li>
            ))}
          </ul>

          <Blueprint className="mt-8 flex flex-wrap items-center justify-between gap-5 p-[22px]">
            <div>
              <div
                className="text-xl"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "var(--font-heading-weight)",
                }}
              >
                Cần báo giá cho {item.name}?
              </div>
              <div className="ink-60 text-[13px]">
                Phản hồi trong 4 giờ làm việc, kèm bảng chất liệu đề xuất.
              </div>
            </div>
            <Link
              href={`/bao-gia?hang-muc=${encodeURIComponent(item.name)}`}
              className="btn btn-primary btn-lg whitespace-nowrap"
            >
              Gửi yêu cầu
            </Link>
          </Blueprint>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
