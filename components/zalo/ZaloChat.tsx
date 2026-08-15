import Script from "next/script";
import { ZaloBubble } from "./ZaloBubble";
import type { SiteSettings } from "@/lib/types";

/**
 * The site's one floating Zalo affordance — and the switch between its two
 * implementations.
 *
 * With a registered Official Account (`NEXT_PUBLIC_ZALO_OA_ID`) this renders
 * Zalo's own OA plugin, which hydrates into a chat panel the visitor can type
 * in without leaving the page. Without one it renders `ZaloBubble`, a plain
 * link to the derived `zalo.me` deep link.
 *
 * The fallback is the point: registering an OA is a launch blocker the client
 * still has open (PLAN.md §9.5), and until it closes the corner of the screen
 * was simply empty. A button that opens the Zalo app is worth far more than
 * nothing, and it costs no third-party script.
 *
 * Exactly one of the two ever renders, so there is never a second bubble.
 */
const OA_ID = process.env.NEXT_PUBLIC_ZALO_OA_ID;

export function ZaloChat({ settings: SITE }: { settings: SiteSettings }) {
  if (!OA_ID) {
    return <ZaloBubble href={SITE.zalo} label="Nhắn Zalo" />;
  }

  return (
    <>
      <div
        className="zalo-chat-widget"
        data-oaid={OA_ID}
        data-welcome-message="Chào bạn! Gửi giúp xưởng hạng mục, số lượng, kích thước và chất liệu — bộ phận kinh doanh báo giá ngay."
        data-autopopup="0"
        data-width="350"
        data-height="420"
      />
      {/* lazyOnload: the widget is a conversion aid, never a first-paint asset. */}
      <Script src="https://sp.zalo.me/plugins/sdk.js" strategy="lazyOnload" />
    </>
  );
}
