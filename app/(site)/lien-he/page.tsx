import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/ui/Icon";
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

/** One way to reach the workshop, as a single large target: glyph, what it is,
 *  and the value itself. External destinations open in a new tab; `tel:` and
 *  `mailto:` hand off to the phone's own app and must not. */
function ActionLink({
  icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: IconName;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className="action"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="icon-badge">
        <Icon name={icon} size={22} />
      </span>
      <span className="min-w-0">
        <span className="t-caption text-muted block">{label}</span>
        <span className="t-body-strong text-ink mt-1 block break-words">
          {value}
        </span>
      </span>
    </a>
  );
}

export default async function ContactPage() {
  const [SITE, CONTACTS] = await Promise.all([getSettings(), getContacts()]);
  const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
    SITE.address.full,
  )}&output=embed`;
  const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    SITE.address.full,
  )}`;

  return (
    <main>
      <section className="hero-ground tile">
        <div className="shell">
          <PageHeading
            eyebrow="Liên hệ"
            title="Xưởng & văn phòng"
            lead="Chọn cách bạn thấy tiện nhất — bộ phận kinh doanh trực trong giờ làm việc."
          />

          {/* The four ways to reach the workshop, before anything else on the
              page. This is the page's entire job; the details table below is
              reference material, not the primary path. */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ActionLink
              icon="phone"
              label="Hotline — gọi trực tiếp"
              value={SITE.phone}
              href={SITE.phoneHref}
            />
            <ActionLink
              icon="chat"
              label="Zalo — gửi được file thiết kế"
              value="Nhắn tin qua Zalo"
              href={SITE.zalo}
              external
            />
            <ActionLink
              icon="mail"
              label="Email kinh doanh"
              value={SITE.emailSales}
              href={`mailto:${SITE.emailSales}`}
            />
            <ActionLink
              icon="pin"
              label="Xưởng sản xuất — chỉ đường"
              value={SITE.address.full}
              href={MAP_LINK}
              external
            />
          </div>

          <p className="t-caption text-muted mt-8 text-center">
            <span className="text-ink inline-flex items-center gap-2 align-middle">
              <Icon name="clock" size={16} />
              {SITE.hours}
            </span>
            {" · "}
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

      {/* — the details table: everything the quick actions leave out — */}
      <section className="tile tile-parchment">
        <div className="shell">
          <h2 className="t-display-md m-0 mb-8 text-center">Thông tin chi tiết</h2>
          <dl className="mx-auto grid max-w-[52ch] grid-cols-1 gap-8 sm:grid-cols-2">
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
        </div>
      </section>

      {/* The map is the photograph of this page. It takes the utility-card
          frame rather than a bare image well: on the navy tile a parchment
          well would flash light before the embed paints. */}
      <section className="tile tile-dark">
        <div className="shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="t-caption-strong eyebrow-on-dark mb-2">Đường đi</div>
              <h2 className="t-display-md m-0">Ghé xưởng xem mẫu in thử</h2>
            </div>
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary-on-dark btn-compact"
            >
              <Icon name="pin" size={16} />
              Mở Google Maps
            </a>
          </div>

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
