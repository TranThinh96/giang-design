import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/layout/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { getSettings, getWork, getWorkNeighbours, getWorks } from "@/lib/content";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return (await getWorks()).map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = await getWork(slug);
  if (!w) return {};

  // The summary is optional in the CMS, so the description falls back to the
  // facts the entry always has — a project page must never ship without one.
  const description =
    w.summary ??
    `${w.cat} — ${w.title}. ${w.spec}${w.location ? `. ${w.location}` : ""}. Công trình do Giang Design – Advertising thực hiện.`;

  return {
    title: `${w.title} — ${w.cat}`,
    description,
    alternates: { canonical: `/du-an/${w.slug}` },
    openGraph: { title: w.title, description, images: w.image ? [w.image] : [] },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [work, SITE, { prev, next }] = await Promise.all([
    getWork(slug),
    getSettings(),
    getWorkNeighbours(slug),
  ]);
  if (!work) notFound();

  const FACTS = [
    { k: "Hạng mục", v: work.cat },
    { k: "Khách hàng", v: work.client },
    { k: "Địa điểm", v: work.location },
    { k: "Năm thực hiện", v: work.year },
    { k: "Thông số", v: work.spec },
  ].filter((f) => Boolean(f.v));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: work.title,
    about: work.cat,
    description: work.summary ?? work.spec,
    dateCreated: work.year,
    locationCreated: work.location
      ? { "@type": "Place", name: work.location }
      : undefined,
    creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
    url: `${SITE.url}/du-an/${work.slug}`,
  };

  return (
    <main>
      <section className="hero-ground tile">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="t-caption text-muted mb-6">
            <Link href="/du-an" className="link">
              Dự án
            </Link>{" "}
            / <span className="text-ink">{work.title}</span>
          </nav>

          <div className="t-caption-strong eyebrow mb-3">{work.cat}</div>
          <h1 className="t-hero m-0 max-w-[20ch]">{work.title}</h1>
          {work.summary && (
            <p className="t-lead text-muted mt-5 max-w-[52ch]">{work.summary}</p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/bao-gia?hang-muc=${encodeURIComponent(work.cat)}`}
              className="btn btn-primary btn-hero"
            >
              Làm công trình tương tự
            </Link>
            <a
              href={SITE.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-hero"
            >
              <Icon name="chat" size={18} />
              Hỏi qua Zalo
            </a>
          </div>
        </div>

        <div className="shell-wide mt-14">
          <ImageSlot
            src={work.image}
            alt={`${work.title} — ảnh công trình hoàn thiện`}
            placeholder={work.ph}
            ratio="16 / 9"
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
        </div>
      </section>

      {/* — the facts, and what the workshop actually built — */}
      <section className="tile tile-parchment">
        <div className="shell grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
          <div>
            <h2 className="t-display-md m-0 mb-6">Thông tin công trình</h2>
            <div className="table-scroll">
              <table className="table">
                <tbody>
                  {FACTS.map((f) => (
                    <tr key={f.k}>
                      <th scope="row" className="w-[42%] font-normal">
                        {f.k}
                      </th>
                      <td>{f.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="t-display-md m-0 mb-6">Hạng mục đã làm</h2>
            {work.scope.length > 0 ? (
              <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
                {work.scope.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="t-body text-muted m-0">
                Chi tiết hạng mục của công trình này đang được cập nhật.
              </p>
            )}

            <p className="t-caption text-muted mt-8">
              Cần một công trình tương tự? Xưởng khảo sát mặt bằng miễn phí trong
              nội thành TP.HCM và gửi phối cảnh trước khi báo giá.{" "}
              <Link href="/bao-gia#khao-sat" className="link">
                Đặt lịch khảo sát
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* — the gallery: for this business it is the argument, not decoration — */}
      {work.gallery.length > 0 && (
        <section className="tile tile-light">
          <div className="shell-wide">
            <h2 className="t-display-md m-0 mb-10">Bộ ảnh công trình</h2>
            <div className="reveal grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {work.gallery.map((g, i) => (
                <figure key={`${g.label}-${i}`} className="m-0">
                  <ImageSlot
                    src={g.image}
                    alt={`${work.title} — ${g.label}`}
                    placeholder={g.label}
                    ratio="4 / 3"
                    radius="sm"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
                    className="media-zoom"
                  />
                  <figcaption className="t-caption text-muted mt-3">
                    {g.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* — prev / next: the portfolio is meant to be browsed, not exited — */}
      <section className="tile tile-dark" style={{ paddingBlock: "var(--space-xxl)" }}>
        <nav
          className="shell-wide grid grid-cols-1 gap-6 sm:grid-cols-2"
          aria-label="Công trình khác"
        >
          {prev && (
            <Link href={`/du-an/${prev.slug}`} className="action action-on-dark">
              <span className="icon-badge icon-badge-on-dark rotate-180">
                <Icon name="arrow-right" size={20} />
              </span>
              <span className="min-w-0">
                <span className="t-caption text-muted-on-dark block">
                  Công trình trước
                </span>
                <span className="t-body-strong mt-1 block">{prev.title}</span>
              </span>
            </Link>
          )}
          {next && (
            <Link
              href={`/du-an/${next.slug}`}
              className="action action-on-dark sm:flex-row-reverse sm:text-right"
            >
              <span className="icon-badge icon-badge-on-dark">
                <Icon name="arrow-right" size={20} />
              </span>
              <span className="min-w-0">
                <span className="t-caption text-muted-on-dark block">
                  Công trình tiếp theo
                </span>
                <span className="t-body-strong mt-1 block">{next.title}</span>
              </span>
            </Link>
          )}
        </nav>
      </section>

      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
