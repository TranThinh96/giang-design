import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/layout/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { getProduct, getProducts, getSettings } from "@/lib/content";

type Params = { slug: string };

/** Shown when a product has no detail crops in the CMS yet, so the row of three
 *  wells stays part of the layout instead of collapsing. */
const DEFAULT_GALLERY = [
  { label: "Chi tiết", image: undefined },
  { label: "Chất liệu", image: undefined },
  { label: "Thành phẩm", image: undefined },
];

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

  const gallery = item.gallery.length ? item.gallery : DEFAULT_GALLERY;

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
    <main>
      {/* — the product itself, on a white ground with the system shadow — */}
      <section className="tile tile-light">
        <div className="shell text-center">
          <nav aria-label="Breadcrumb" className="t-caption text-muted mb-6">
            <Link href="/san-pham-dich-vu" className="link">
              Sản phẩm &amp; dịch vụ
            </Link>{" "}
            / <span className="text-ink">{item.name}</span>
          </nav>

          <div className="t-caption-strong eyebrow mb-3">{item.code}</div>
          <h1 className="t-hero m-0 mx-auto max-w-[16ch]">{item.name}</h1>
          <p className="t-lead text-muted mx-auto mt-5 max-w-[42ch]">{item.long}</p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href={`/bao-gia?hang-muc=${encodeURIComponent(item.name)}`}
              className="btn btn-primary btn-hero"
            >
              Gửi yêu cầu báo giá
            </Link>
            <a
              href={SITE.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-hero"
            >
              <Icon name="chat" size={18} />
              Nhắn Zalo
            </a>
            <a href={SITE.phoneHref} className="btn btn-secondary btn-hero">
              <Icon name="phone" size={18} />
              Gọi {SITE.phone}
            </a>
          </div>
        </div>

        <div className="shell-wide mt-14">
          <ImageSlot
            src={item.image}
            alt={`${item.name} — ảnh sản phẩm`}
            placeholder="Ảnh sản phẩm chính"
            ratio="16 / 9"
            priority
            elevated
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
        </div>

        {/* Detail crops sit at text width, not full bleed: they support the
            hero render rather than competing with it. */}
        <div className="shell mt-6 grid grid-cols-3 gap-6">
          {gallery.map((g, i) => (
            <ImageSlot
              key={`${g.label}-${i}`}
              src={g.image}
              alt={`${item.name} — ${g.label}`}
              placeholder={g.label}
              ratio="1 / 1"
              radius="sm"
              sizes="(max-width: 980px) 30vw, 300px"
            />
          ))}
        </div>
      </section>

      {/* — the numbers, on the parchment step — */}
      <section className="tile tile-parchment">
        <div className="shell grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
          <div>
            <h2 className="t-display-md m-0 mb-6">Thông số kỹ thuật</h2>
            <div className="table-scroll">
              <table className="table">
                <tbody>
                  {item.specs.map((s) => (
                    <tr key={s.k}>
                      <th scope="row" className="w-[42%] font-normal">
                        {s.k}
                      </th>
                      <td>{s.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="t-display-md m-0 mb-6">Chất liệu thường dùng</h2>
            <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
              {item.materials.map((m) => (
                <li key={m} className="tag">
                  {m}
                </li>
              ))}
            </ul>

            <p className="t-caption text-muted mt-8">
              Cần một chất liệu khác? Gửi mẫu hoặc mô tả yêu cầu, xưởng đề xuất
              phương án tương đương và báo giá trong 4 giờ làm việc.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
