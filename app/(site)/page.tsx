import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { CtaBand } from "@/components/home/CtaBand";
import { WorkCard } from "@/components/portfolio/WorkCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getClients,
  getFeaturedWorks,
  getMachines,
  getProducts,
  getSteps,
} from "@/lib/content";

/**
 * The home page is a stack of full-bleed tiles that alternate light,
 * parchment and near-black. Nothing between them but the colour change —
 * that is the divider.
 */
export default async function HomePage() {
  const [FEATURED, PRODUCTS, STEPS, MACHINES, CLIENTS] = await Promise.all([
    getFeaturedWorks(),
    getProducts(),
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
            title="Sản phẩm đã sản xuất"
            lead="Bảng hiệu, gian hàng, ấn phẩm và bao bì đã bàn giao cho khách hàng."
          >
            <Link href="/du-an" className="btn btn-secondary">
              Toàn bộ dự án
            </Link>
          </SectionHeading>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            onDark
            eyebrow="Dịch vụ"
            title="Danh mục in ấn"
            lead="Tám hạng mục, mỗi hạng mục có bảng chất liệu và số lượng tối thiểu riêng."
          />

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p) => (
              <Link
                key={p.code}
                href={`/san-pham-dich-vu/${p.slug}`}
                className="card card-on-dark h-full"
              >
                <div className="t-caption text-muted-on-dark">{p.code}</div>
                <div className="card-title">{p.name}</div>
                <p className="card-body text-muted-on-dark">{p.blurb}</p>
                <div className="t-caption text-muted-on-dark">{p.moq}</div>
                <span className="t-caption link-on-dark">Chi tiết →</span>
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
          />

          <ol className="m-0 mt-14 grid list-none grid-cols-1 gap-10 p-0 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s) => (
              <li key={s.no}>
                {/* Not Action Blue: the accent marks things you can press,
                    and a step number is not one of them. */}
                <div className="t-caption-strong text-muted">{s.no}</div>
                <h3 className="t-tagline mb-2 mt-3">{s.title}</h3>
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
            <div className="t-caption-strong text-muted mb-3">Năng lực</div>
            <h2 className="t-display-md m-0 mb-6">Thiết bị tại xưởng</h2>
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
            <div className="t-caption-strong text-muted mb-3">Khách hàng</div>
            <h2 className="t-display-md m-0 mb-6">Đã đồng hành</h2>
            <ul className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-4 p-0 sm:grid-cols-3">
              {CLIENTS.map((c) => (
                <li key={c} className="t-body-strong text-muted">
                  {c}
                </li>
              ))}
            </ul>
            <p className="t-caption text-muted mt-8">
              Phục vụ nhãn hàng thực phẩm, mỹ phẩm – dược, chuỗi bán lẻ, agency thiết
              kế và bộ phận mua hàng doanh nghiệp.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
