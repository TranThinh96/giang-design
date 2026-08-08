import Link from "next/link";
import { SITE } from "@/content/site";

const COLUMNS = [
  {
    heading: "Danh mục",
    links: [
      { href: "/san-pham-dich-vu", label: "Sản phẩm & dịch vụ" },
      { href: "/du-an", label: "Dự án" },
      { href: "/bao-gia", label: "Báo giá" },
    ],
  },
  {
    heading: "Công ty",
    links: [
      { href: "/gioi-thieu", label: "Giới thiệu" },
      { href: "/lien-he", label: "Liên hệ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-6" style={{ borderTop: "1px solid var(--color-divider)" }}>
      <div className="shell grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-[9px]">
            <span
              className="grid h-[22px] w-[22px] place-items-center text-white"
              style={{
                background: "var(--color-accent)",
                fontFamily: "var(--font-heading)",
                fontSize: 14,
                lineHeight: 1,
              }}
            >
              G
            </span>
            <span
              className="text-xl tracking-[0.02em]"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-accent)",
              }}
            >
              GIANG DESIGN · ADVERTISING
            </span>
          </div>
          <p className="ink-60 mt-2.5 max-w-[34ch] text-[13px] leading-[1.6]">
            Xưởng in offset &amp; kỹ thuật số — bao bì, tem nhãn, ấn phẩm thương hiệu.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading} className="text-[13px] leading-[2]">
            <div className="ink-50 mb-1.5 text-[11px] uppercase tracking-[0.14em]">
              {col.heading}
            </div>
            {col.links.map((l) => (
              <div key={l.href}>
                <Link
                  href={l.href}
                  className="no-underline"
                  style={{ color: "var(--color-text)" }}
                >
                  {l.label}
                </Link>
              </div>
            ))}
          </div>
        ))}

        <div className="text-[13px] leading-[2]">
          <div className="ink-50 mb-1.5 text-[11px] uppercase tracking-[0.14em]">
            Liên hệ
          </div>
          <div>
            <a
              href={SITE.phoneHref}
              className="no-underline"
              style={{ color: "var(--color-text)" }}
            >
              {SITE.phone}
            </a>
          </div>
          <div>
            <a
              href={`mailto:${SITE.emailInfo}`}
              className="no-underline"
              style={{ color: "var(--color-text)" }}
            >
              {SITE.emailInfo}
            </a>
          </div>
          <div>
            {SITE.address.district}, {SITE.address.city}
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--color-divider)" }}>
        <div className="shell ink-45 py-4 text-xs">
          © {new Date().getFullYear()} Giang Design – Advertising. {SITE.license}.
        </div>
      </div>
    </footer>
  );
}
