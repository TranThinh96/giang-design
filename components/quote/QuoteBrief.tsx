"use client";

import { useSearchParams } from "next/navigation";
import { BriefBox } from "./BriefBox";

/**
 * The printing brief: the old quote form's fields, turned into a message the
 * visitor pastes into Zalo. Product pages link here as
 * `/bao-gia?hang-muc=<tên hạng mục>`; that param pre-fills the first line.
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

export function QuoteBrief({ zalo }: { zalo: string }) {
  const product = useSearchParams().get("hang-muc") ?? "";

  return (
    <BriefBox
      title="Nội dung nên nhắn"
      intro="Càng đủ thông tin, báo giá càng sát. Sao chép khung dưới đây, điền vào và gửi qua Zalo — kèm file thiết kế nếu đã có."
      message={buildMessage(product)}
      zalo={zalo}
      note="File thiết kế (.ai, .pdf, .cdr) gửi trực tiếp trong khung chat Zalo."
    />
  );
}
