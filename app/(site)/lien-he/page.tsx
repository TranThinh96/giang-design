import type { Metadata } from "next";
import Link from "next/link";
import { Blueprint } from "@/components/ui/Blueprint";
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
    <main className="shell pb-18 pt-14">
      <PageHeading eyebrow="Liên hệ" title="Xưởng & văn phòng" className="mb-9" />

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <div>
          <dl className="rule-grid m-0 grid-cols-1">
            {CONTACTS.map((c) => (
              <div
                key={c.k}
                className="grid grid-cols-1 items-baseline gap-4 p-5 sm:grid-cols-[150px_1fr]"
              >
                <dt className="ink-55 text-[11px] uppercase tracking-[0.14em]">
                  {c.k}
                </dt>
                <dd
                  className="m-0 text-[19px]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {c.k === "Hotline / Zalo" ? (
                    <a
                      href={SITE.phoneHref}
                      className="no-underline"
                      style={{ color: "var(--color-text)" }}
                    >
                      {c.v}
                    </a>
                  ) : c.k === "Kinh doanh" ? (
                    <a
                      href={`mailto:${c.v}`}
                      className="no-underline"
                      style={{ color: "var(--color-text)" }}
                    >
                      {c.v}
                    </a>
                  ) : (
                    c.v
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link href="/bao-gia" className="btn btn-primary">
              Gửi yêu cầu báo giá
            </Link>
            <a
              className="btn btn-secondary"
              href={SITE.zalo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Nhắn Zalo
            </a>
            <a
              className="btn btn-secondary"
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>

        <Blueprint
          className="w-full min-w-0 overflow-hidden"
          style={{ aspectRatio: "4 / 3", background: "var(--color-surface)" }}
        >
          <iframe
            src={MAP_SRC}
            title={`Bản đồ tới xưởng Giang Design — ${SITE.address.full}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </Blueprint>
      </div>
    </main>
  );
}
