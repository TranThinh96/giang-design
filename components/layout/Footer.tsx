import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
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

/** One line of the contact column: glyph, then the value as the link. */
function ContactLine({
  icon,
  children,
}: {
  icon: IconName;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-primary-on-dark mt-[3px] flex-none">
        <Icon name={icon} size={17} />
      </span>
      <span className="t-body">{children}</span>
    </li>
  );
}

/**
 * The footer is the page's second full field of brand colour — the deep blue
 * the tiles are cut from. It closes the document the way the sign closes the
 * shopfront, and it makes the contact block the last thing on every page
 * rather than a line of grey text under a parchment ground.
 */
export function Footer({ settings: SITE }: { settings: SiteSettings }) {
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    SITE.address.full,
  )}`;

  return (
    <footer className="bg-tile-3 text-on-dark">
      <div className="shell-wide grid grid-cols-1 gap-x-10 gap-y-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="bg-primary grid h-9 w-9 flex-none place-items-center rounded-[10px] text-[19px] font-bold leading-none"
              style={{ color: "var(--color-brand-gold-on-dark)" }}
            >
              G
            </span>
            <span className="t-body-strong">{SITE.name}</span>
          </div>
          <p className="t-caption text-muted-on-dark mt-4 max-w-[34ch]">
            Xưởng in offset &amp; kỹ thuật số — bao bì, tem nhãn, ấn phẩm thương
            hiệu.
          </p>
          <a
            href={SITE.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet-on-dark mt-5 inline-flex items-center gap-2"
            aria-label="Facebook của Giang Design"
          >
            <Icon name="facebook" size={22} />
            <span className="t-caption">Facebook</span>
          </a>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <div className="t-caption-strong eyebrow-on-dark mb-3">
              {col.heading}
            </div>
            <ul className="m-0 list-none p-0">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-quiet-on-dark t-body block py-2">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <div className="t-caption-strong eyebrow-on-dark mb-3">Liên hệ</div>
          <ul className="m-0 grid list-none gap-3 p-0">
            <ContactLine icon="phone">
              <a href={SITE.phoneHref} className="text-on-dark font-semibold">
                {SITE.phone}
              </a>
            </ContactLine>
            <ContactLine icon="chat">
              <a
                href={SITE.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet-on-dark"
              >
                Nhắn Zalo
              </a>
            </ContactLine>
            <ContactLine icon="mail">
              <a href={`mailto:${SITE.emailSales}`} className="link-quiet-on-dark">
                {SITE.emailSales}
              </a>
            </ContactLine>
            <ContactLine icon="pin">
              <a
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet-on-dark"
              >
                {SITE.address.street}, {SITE.address.district}, {SITE.address.city}
              </a>
            </ContactLine>
            <ContactLine icon="clock">
              <span className="text-muted-on-dark">{SITE.hours}</span>
            </ContactLine>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--color-hairline-on-dark)" }}>
        <div className="shell-wide t-fine-print text-muted-on-dark py-6">
          © {new Date().getFullYear()} {SITE.name}. {SITE.license}.{" "}
          {SITE.address.full}.
        </div>
      </div>
    </footer>
  );
}
