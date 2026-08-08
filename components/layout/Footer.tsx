import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

const COLUMNS = [
  {
    heading: "Sản phẩm & dịch vụ",
    links: [
      { href: "/san-pham-dich-vu", label: "Danh mục in ấn" },
      { href: "/du-an", label: "Dự án đã bàn giao" },
      { href: "/bao-gia", label: "Yêu cầu báo giá" },
    ],
  },
  {
    heading: "Xưởng",
    links: [
      { href: "/gioi-thieu", label: "Giới thiệu" },
      { href: "/lien-he", label: "Liên hệ" },
    ],
  },
];

/**
 * The one place the system goes deliberately dense: parchment ground, link
 * columns at the relaxed 2.41 leading that makes them scannable, and a legal
 * row in fine print at the bottom.
 */
export function Footer({ settings: SITE }: { settings: SiteSettings }) {
  return (
    <footer className="bg-parchment">
      <div className="shell-wide grid grid-cols-1 gap-x-8 gap-y-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <div className="t-caption-strong text-ink mb-1">{col.heading}</div>
            {col.links.map((l) => (
              <div key={l.href}>
                <Link href={l.href} className="t-dense-link text-muted">
                  {l.label}
                </Link>
              </div>
            ))}
          </nav>
        ))}

        <div>
          <div className="t-caption-strong text-ink mb-1">Liên hệ</div>
          <div>
            <a href={SITE.phoneHref} className="t-dense-link text-muted">
              {SITE.phone}
            </a>
          </div>
          <div>
            <a href={`mailto:${SITE.emailInfo}`} className="t-dense-link text-muted">
              {SITE.emailInfo}
            </a>
          </div>
          <div className="t-dense-link text-muted">
            {SITE.address.district}, {SITE.address.city}
          </div>
        </div>

        <div>
          <div className="t-caption-strong text-ink mb-1">{SITE.name}</div>
          <p className="t-caption text-muted m-0 max-w-[34ch]">
            Xưởng in offset &amp; kỹ thuật số — bao bì, tem nhãn, ấn phẩm thương
            hiệu. {SITE.hours}.
          </p>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--color-hairline)" }}>
        <div className="shell-wide t-fine-print text-subtle py-6">
          © {new Date().getFullYear()} {SITE.name}. {SITE.license}. {SITE.address.full}.
        </div>
      </div>
    </footer>
  );
}
