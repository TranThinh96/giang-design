import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { CtaBand } from "@/components/layout/CtaBand";
import { WorkCard } from "@/components/portfolio/WorkCard";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { IconName } from "@/components/ui/Icon";
import {
  getClients,
  getFeaturedWorks,
  getMachines,
  getProductGroups,
  getSteps,
} from "@/lib/content";

/** One glyph per pillar. Presentational, so it lives with the page rather than
 *  in `SERVICE_GROUPS` — the reader has no business knowing about icons. */
const GROUP_ICON: Record<string, IconName> = {
  "in-an-quang-cao": "printer",
  "an-pham-bao-bi": "box",
  "bang-hieu-thi-cong": "layers",
  "thiet-ke": "palette",
};

/**
 * The home page is a stack of full-bleed tiles that alternate light,
 * parchment and near-black. Nothing between them but the colour change —
 * that is the divider.
 */
export default async function HomePage() {
  const [FEATURED, GROUPS, STEPS, MACHINES, CLIENTS] = await Promise.all([
    getFeaturedWorks(),
    getProductGroups(),
    getSteps(),
    getMachines(),
    getClients(),
  ]);

  return (
    <main>
      <Hero />

      {/* — featured work — */}
      <section className="tile tile-parchment">
        <div className="shell-wide">
          <SectionHeading
            eyebrow="Dự án tiêu biểu"
            title="Công trình đã bàn giao"
            lead="Bảng hiệu, hộp đèn, gian hàng, thi công shop và ấn phẩm đã bàn giao cho khách hàng."
          >
            <Link href="/du-an" className="btn btn-secondary">
              Toàn bộ dự án
            </Link>
          </SectionHeading>

          <div className="reveal mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((w) => (
              <WorkCard
                key={w.slot}
                work={w}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
              />
            ))}
          </div>
        </div>
      </section>

      {/* — services — */}
      <section className="tile tile-dark">
        <div className="shell-wide">
          <SectionHeading
            tone="dark"
            eyebrow="Dịch vụ"
            title="In ấn quảng cáo, bảng hiệu và thiết kế"
            lead="Bốn nhóm dịch vụ, một đầu mối — từ tờ decal lấy trong ngày tới mặt bằng shop bàn giao trọn gói."
          />

          {/* Groups, not the fifteen items: the home page's job is to tell a
              visitor which pillar they came for, and the catalogue page's job
              is to list what is inside it. */}
          <div className="reveal mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GROUPS.map((g) => (
              <Link
                key={g.id}
                href={`/san-pham-dich-vu#${g.id}`}
                className="card card-on-dark card-link h-full"
              >
                <span className="icon-badge icon-badge-on-dark">
                  <Icon name={GROUP_ICON[g.id] ?? "box"} size={22} />
                </span>
                <div className="card-title">{g.name}</div>
                <p className="card-body text-muted-on-dark">{g.lead}</p>
                <ul className="t-caption text-muted-on-dark m-0 list-none p-0">
                  {g.items.slice(0, 4).map((p) => (
                    <li key={p.code} className="py-[3px]">
                      {p.name}
                    </li>
                  ))}
                  {g.items.length > 4 && (
                    <li className="py-[3px]">+{g.items.length - 4} hạng mục khác</li>
                  )}
                </ul>
                <span className="t-caption-strong link-on-dark inline-flex items-center gap-1.5">
                  Xem nhóm
                  <span className="card-go">
                    <Icon name="arrow-right" size={15} />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* — process — */}
      <section className="tile tile-light">
        <div className="shell-wide">
          <SectionHeading
            eyebrow="Quy trình"
            title="Từ file thiết kế đến hàng giao"
            lead="Năm bước cố định, mỗi bước có một đầu ra bạn duyệt trước khi chạy tiếp."
          />

          <ol className="reveal m-0 mt-14 grid list-none grid-cols-1 gap-10 p-0 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s) => (
              <li key={s.no}>
                {/* Gold, not blue: the accent marks things you can press,
                    and a step number is not one of them. */}
                <div className="icon-badge icon-badge-gold t-body-strong">
                  {s.no}
                </div>
                <h3 className="t-tagline mb-2 mt-4">{s.title}</h3>
                <p className="t-caption text-muted m-0">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* — capability & clients — */}
      <section className="tile tile-parchment">
        <div className="shell-wide grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <div>
            <div className="t-caption-strong eyebrow mb-3">Năng lực</div>
            <h2 className="t-display-md m-0 mb-6">Thiết bị tại xưởng</h2>
            <p className="t-body text-muted mb-6 max-w-[46ch]">
              In, gia công và thi công đều chạy trong xưởng — không qua nhà thầu
              phụ, nên tiến độ và chất lượng do chúng tôi chịu trách nhiệm.
            </p>
            <div className="table-scroll">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Thiết bị</th>
                    <th scope="col">Thông số</th>
                    <th scope="col">Công suất</th>
                  </tr>
                </thead>
                <tbody>
                  {MACHINES.map((m) => (
                    <tr key={m.name}>
                      <td>{m.name}</td>
                      <td>{m.spec}</td>
                      <td>{m.cap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="t-caption-strong eyebrow mb-3">Khách hàng</div>
            <h2 className="t-display-md m-0 mb-6">Đã đồng hành</h2>
            {/* Tags, not a bare list: the client names are static labels, and
                the capsule keeps them from reading as links. */}
            <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
              {CLIENTS.map((c) => (
                <li key={c} className="tag">
                  {c}
                </li>
              ))}
            </ul>
            <p className="t-caption text-muted mt-8">
              Phục vụ chuỗi bán lẻ và F&amp;B, chủ shop mở điểm bán mới, ban tổ
              chức hội chợ – sự kiện, agency quảng cáo và bộ phận marketing doanh
              nghiệp.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
