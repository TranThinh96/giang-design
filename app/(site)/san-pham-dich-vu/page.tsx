import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/layout/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { PageHeading } from "@/components/ui/SectionHeading";
import { getProductGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sản phẩm & dịch vụ — In ấn quảng cáo, bảng hiệu, thiết kế",
  description:
    "In khổ lớn PP – hiflex – decal, standee, tem nhãn, catalogue và bao bì giấy; bảng hiệu, hộp đèn, chữ nổi LED, gian hàng, thi công shop, trang trí lễ hội; thiết kế nhận diện và dàn trang ấn phẩm.",
  alternates: { canonical: "/san-pham-dich-vu" },
};

export default async function ProductsPage() {
  const GROUPS = await getProductGroups();

  return (
    <main>
      <section className="hero-ground tile">
        <div className="shell">
          <PageHeading
            eyebrow="Sản phẩm & dịch vụ"
            title="Bốn nhóm dịch vụ của xưởng"
            lead="In ấn là việc chạy hằng ngày; bảng hiệu và thi công là việc ra công trình; thiết kế đi kèm cả hai."
          />

          {/* A jump list, not decoration: fifteen items over four pillars is
              more than one screen, and a buyer usually knows which pillar
              they came for. */}
          <nav
            className="mt-10 flex flex-wrap justify-center gap-3"
            aria-label="Nhóm dịch vụ"
          >
            {GROUPS.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="chip">
                {g.name}
                <span className="text-subtle">{g.items.length}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {GROUPS.map((group, gi) => (
        <section
          key={group.id}
          id={group.id}
          /* The colour change is the divider, so the pillars alternate
             parchment and white rather than carrying rules between them. */
          className={`tile ${gi % 2 === 0 ? "tile-parchment" : "tile-light"}`}
        >
          <div className="shell-wide">
            <header className="mb-12 max-w-[52ch]">
              <div className="t-caption-strong eyebrow mb-3">
                Nhóm {gi + 1} / {GROUPS.length}
              </div>
              <h2 className="t-display-md m-0">{group.name}</h2>
              <p className="t-body text-muted mt-4 mb-0">{group.lead}</p>
            </header>

            <div className="reveal grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((p) => (
                <article key={p.code} className="card card-stretch">
                  <ImageSlot
                    src={p.image}
                    alt={p.name}
                    placeholder={p.name}
                    ratio="1 / 1"
                    radius="sm"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
                    className="media-zoom"
                  />
                  <div className="t-caption text-muted">{p.code}</div>
                  <h3 className="card-title m-0">
                    {/* The whole card is this link's target — see
                        `.card-stretch`. The quote pill below opts back out. */}
                    <Link
                      href={`/san-pham-dich-vu/${p.slug}`}
                      className="stretch-target text-ink"
                    >
                      {p.name}
                    </Link>
                  </h3>
                  <p className="card-body text-muted">{p.blurb}</p>
                  <dl className="t-caption text-muted m-0">
                    <div>
                      <dt className="inline">Chất liệu: </dt>
                      <dd className="m-0 inline">{p.materialsShort}</dd>
                    </div>
                    <div>
                      <dt className="inline">Nhận đơn: </dt>
                      <dd className="m-0 inline">{p.moq}</dd>
                    </div>
                  </dl>
                  <div className="above-stretch mt-1 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/bao-gia?hang-muc=${encodeURIComponent(p.name)}`}
                      className="btn btn-primary btn-compact"
                    >
                      Báo giá hạng mục này
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Signage and fit-out are quoted from a site visit, not a file —
                so the pillar that works that way says so where it is read. */}
            {group.id === "bang-hieu-thi-cong" && (
              <p className="t-caption text-muted mt-8 inline-flex items-start gap-2">
                <span className="text-primary mt-[2px] flex-none">
                  <Icon name="pin" size={16} />
                </span>
                <span>
                  Các hạng mục trong nhóm này báo giá sau khi khảo sát mặt bằng.{" "}
                  <Link href="/bao-gia#khao-sat" className="link">
                    Đặt lịch khảo sát
                  </Link>{" "}
                  — miễn phí trong nội thành TP.HCM.
                </span>
              </p>
            )}
          </div>
        </section>
      ))}

      <CtaBand />
    </main>
  );
}
