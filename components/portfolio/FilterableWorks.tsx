"use client";

import { useState } from "react";
import { WorkCard } from "./WorkCard";
import { ALL_CATS, CATS, type Work } from "@/lib/types";

/**
 * Category filter + grid. Every work is server-rendered into the HTML and
 * filtered in the browser, so the full portfolio stays indexable at /du-an
 * while the chips respond instantly.
 *
 * The chips follow the configurator grammar: pill, hairline ring, and a 2px
 * focus-blue ring when selected — no fill change, no second accent colour.
 */
export function FilterableWorks({ works }: { works: Work[] }) {
  const [cat, setCat] = useState<string>(ALL_CATS);
  const shown = cat === ALL_CATS ? works : works.filter((w) => w.cat === cat);

  return (
    <>
      <div
        className="mb-10 flex flex-wrap justify-center gap-3"
        role="group"
        aria-label="Lọc theo hạng mục"
      >
        {CATS.map((c) => {
          const on = c === cat;
          return (
            <button
              key={c}
              type="button"
              className={`chip ${on ? "chip-selected" : ""}`}
              aria-pressed={on}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((w) => (
          <WorkCard
            key={w.slot}
            work={w}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
          />
        ))}
      </div>

      {shown.length === 0 && (
        <p className="t-body text-muted text-center">
          Chưa có dự án trong hạng mục này.
        </p>
      )}
    </>
  );
}
