"use client";

import { useState } from "react";
import { WorkCard } from "./WorkCard";
import { ALL_CATS, CATS, type Work } from "@/lib/types";

/**
 * Category filter + grid. Every work is server-rendered into the HTML and
 * filtered in the browser, so the full portfolio stays indexable at /du-an
 * while the chips respond instantly.
 */
export function FilterableWorks({ works }: { works: Work[] }) {
  const [cat, setCat] = useState<string>(ALL_CATS);
  const shown = cat === ALL_CATS ? works : works.filter((w) => w.cat === cat);

  return (
    <>
      <div
        className="mb-8 flex flex-wrap gap-2 pb-[22px]"
        style={{ borderBottom: "1px solid var(--color-divider)" }}
        role="group"
        aria-label="Lọc theo hạng mục"
      >
        {CATS.map((c) => {
          const on = c === cat;
          return (
            <button
              key={c}
              type="button"
              className="btn"
              aria-pressed={on}
              onClick={() => setCat(c)}
              style={
                on
                  ? {
                      background: "var(--color-accent)",
                      color: "var(--color-bg)",
                      borderColor: "var(--color-accent)",
                    }
                  : { background: "transparent" }
              }
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((w) => (
          <WorkCard key={w.slot} work={w} />
        ))}
      </div>

      {shown.length === 0 && (
        <p className="ink-55 text-sm">Chưa có dự án trong hạng mục này.</p>
      )}
    </>
  );
}
