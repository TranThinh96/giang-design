"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

/**
 * The old quote form's fields, turned into a message the visitor pastes into
 * Zalo. Product pages link here as `/bao-gia?hang-muc=<tên hạng mục>`; that
 * param pre-fills the first line.
 *
 * Reading the param client-side (rather than from the page's `searchParams`)
 * keeps `/bao-gia` prerendered.
 */
function buildMessage(product: string) {
  return [
    "Chào Giang Design, mình cần báo giá:",
    `• Hạng mục: ${product || ""}`,
    "• Số lượng:",
    "• Kích thước thành phẩm:",
    "• Chất liệu:",
    "• Gia công (cán màng, bế, dán…):",
    "• Thời hạn cần hàng:",
    "• Người liên hệ / công ty:",
  ].join("\n");
}

export function QuoteBrief() {
  const product = useSearchParams().get("hang-muc") ?? "";
  const message = buildMessage(product);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked (insecure origin, or the permission was denied).
      // The text is selectable in the box below, so nothing is lost.
      setCopied(false);
    }
  }

  return (
    <section className="card mt-10 text-left">
      <h3 className="m-0">Nội dung nên nhắn</h3>
      <p className="t-caption text-muted m-0">
        Càng đủ thông tin, báo giá càng sát. Sao chép khung dưới đây, điền vào và
        gửi qua Zalo — kèm file thiết kế nếu đã có.
      </p>

      <pre
        className="t-caption text-muted m-0 overflow-x-auto whitespace-pre-wrap rounded-md p-4"
        style={{ background: "var(--color-parchment)", fontFamily: "var(--font-text)" }}
      >
        {message}
      </pre>

      <div className="flex flex-wrap items-center gap-4">
        <button type="button" onClick={copy} className="btn btn-secondary btn-compact">
          {copied ? "✓ Đã sao chép" : "Sao chép nội dung"}
        </button>
        <span className="t-caption text-muted">
          File thiết kế (.ai, .pdf, .cdr) gửi trực tiếp trong khung chat Zalo.
        </span>
      </div>
    </section>
  );
}
