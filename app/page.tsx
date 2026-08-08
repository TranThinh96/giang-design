import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { CtaBand } from "@/components/home/CtaBand";
import { WorkCard } from "@/components/portfolio/WorkCard";
import { Blueprint } from "@/components/ui/Blueprint";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRODUCTS } from "@/content/products";
import { FEATURED } from "@/content/works";
import { CLIENTS, MACHINES, STEPS } from "@/content/site";

export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* 01 — featured work */}
      <section className="shell py-12">
        <SectionHeading
          eyebrow="01 — Dự án tiêu biểu"
          title="Sản phẩm đã sản xuất"
          action={
            <Link
              href="/du-an"
              className="text-sm no-underline"
              style={{ color: "var(--color-accent-700)" }}
            >
              Toàn bộ dự án →
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((w) => (
            <WorkCard key={w.slot} work={w} compact />
          ))}
        </div>
      </section>

      {/* 02 — services */}
      <section className="shell py-12">
        <SectionHeading eyebrow="02 — Dịch vụ" title="Danh mục in ấn" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <Link
              key={p.code}
              href={`/san-pham-dich-vu/${p.slug}`}
              className="no-underline"
              style={{ color: "var(--color-text)" }}
            >
              <Blueprint className="card h-full min-h-[190px] p-5 transition-colors hover:bg-[color-mix(in_srgb,var(--color-text)_4%,transparent)]">
                <div className="card-kicker">{p.code}</div>
                <div className="card-title text-[19px]">{p.name}</div>
                <p className="card-body text-[13px]">{p.blurb}</p>
                <div className="card-meta justify-between">
                  <span>{p.moq}</span>
                  <span style={{ color: "var(--color-accent-700)" }}>Chi tiết →</span>
                </div>
              </Blueprint>
            </Link>
          ))}
        </div>
      </section>

      {/* 03 — process */}
      <section className="shell py-12">
        <SectionHeading eyebrow="03 — Quy trình" title="Từ file thiết kế đến hàng giao" />
        <ol className="rule-grid m-0 grid-cols-1 list-none p-0 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s) => (
            <li key={s.no} className="flex flex-col gap-2.5 px-5 pb-7 pt-6">
              <span
                className="text-[13px] tracking-[0.12em]"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--color-accent-700)",
                }}
              >
                {s.no}
              </span>
              <span
                className="text-[19px] leading-[1.15]"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "var(--font-heading-weight)",
                }}
              >
                {s.title}
              </span>
              <p className="ink-65 m-0 text-[13px] leading-[1.55]">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 04 + 05 — capability & clients */}
      <section className="shell grid grid-cols-1 items-start gap-12 pb-16 pt-12 lg:grid-cols-2">
        <div>
          <div className="eyebrow mb-2">04 — Năng lực</div>
          <h2 className="t-section m-0 mb-[18px]">Thiết bị tại xưởng</h2>
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
          <div className="eyebrow mb-2">05 — Khách hàng</div>
          <h2 className="t-section m-0 mb-[18px]">Đã đồng hành</h2>
          <div className="rule-grid grid-cols-2 sm:grid-cols-3">
            {CLIENTS.map((c) => (
              <div
                key={c}
                className="ink-45 grid h-[84px] place-items-center text-[15px] tracking-[0.08em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {c}
              </div>
            ))}
          </div>
          <p className="ink-65 mt-4 text-[13px] leading-[1.6]">
            Phục vụ nhãn hàng thực phẩm, mỹ phẩm – dược, chuỗi bán lẻ, agency thiết kế
            và bộ phận mua hàng doanh nghiệp.
          </p>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
