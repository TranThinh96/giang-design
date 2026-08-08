"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Blueprint } from "@/components/ui/Blueprint";

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
    <Blueprint className="mt-8 p-[26px]">
      <h3 className="m-0 mb-1.5">Nội dung nên nhắn</h3>
      <p className="ink-65 m-0 mb-4 text-[13px] leading-[1.6]">
        Càng đủ thông tin, báo giá càng sát. Sao chép khung dưới đây, điền vào và
        gửi qua Zalo — kèm file thiết kế nếu đã có.
      </p>

      <pre
        className="ink-72 m-0 overflow-x-auto whitespace-pre-wrap p-4 text-[13px] leading-[1.7]"
        style={{
          background: "var(--color-surface)",
          fontFamily: "var(--font-body)",
        }}
      >
        {message}
      </pre>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button type="button" onClick={copy} className="btn btn-secondary">
          {copied ? "✓ Đã sao chép" : "Sao chép nội dung"}
        </button>
        <span className="ink-55 text-xs">
          File thiết kế (.ai, .pdf, .cdr) gửi trực tiếp trong khung chat Zalo.
        </span>
      </div>
    </Blueprint>
  );
}
