import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/ui/SectionHeading";
import { getContacts, getSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: "Liên hệ — Xưởng & văn phòng",
    description: `Xưởng sản xuất ${s.address.full}. Hotline ${s.phone}, kinh doanh ${s.emailSales}. Giờ làm việc ${s.hours}.`,
    alternates: { canonical: "/lien-he" },
  };
}

export default async function ContactPage() {
  const [SITE, CONTACTS] = await Promise.all([getSettings(), getContacts()]);
  const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
    SITE.address.full,
  )}&output=embed`;

  return (
    <main>
      <section className="tile tile-light">
        <div className="shell">
          <PageHeading
            eyebrow="Liên hệ"
            title="Xưởng & văn phòng"
            lead="Ghé xưởng xem mẫu in thử, hoặc gọi trước để được hướng dẫn đường vào."
          >
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/bao-gia" className="btn btn-primary btn-hero">
                Gửi yêu cầu báo giá
              </Link>
              <a
                className="btn btn-secondary btn-hero"
                href={SITE.zalo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Nhắn Zalo
              </a>
            </div>
          </PageHeading>

          <dl className="mx-auto mt-16 grid max-w-[52ch] grid-cols-1 gap-8 sm:grid-cols-2">
            {CONTACTS.map((c) => (
              <div key={c.k}>
                <dt className="t-caption-strong text-muted mb-1">{c.k}</dt>
                <dd className="t-body-strong m-0">
                  {c.k === "Hotline / Zalo" ? (
                    <a href={SITE.phoneHref} className="link">
                      {c.v}
                    </a>
                  ) : c.k === "Kinh doanh" ? (
                    <a href={`mailto:${c.v}`} className="link">
                      {c.v}
                    </a>
                  ) : (
                    c.v
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="t-caption text-muted mt-10 text-center">
            Theo dõi công trình mới trên{" "}
            <a
              className="link"
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </p>
        </div>
      </section>

      {/* The map is the photograph of this page. It takes the utility-card
          frame rather than a bare image well: on the parchment tile a
          parchment-backed well would be invisible until the embed paints. */}
      <section className="tile tile-parchment">
        <div className="shell">
          <div
            className="card overflow-hidden p-0"
            style={{ aspectRatio: "16 / 9" }}
          >
            <iframe
              src={MAP_SRC}
              title={`Bản đồ tới xưởng Giang Design — ${SITE.address.full}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
