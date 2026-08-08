import Script from "next/script";

/**
 * Zalo Official Account chat widget.
 *
 * Renders the OA plugin container plus Zalo's SDK, which hydrates the container
 * into a floating chat bubble on every page. Requires a registered Zalo OA —
 * copy its OA ID into `NEXT_PUBLIC_ZALO_OA_ID`.
 *
 * Without the ID nothing renders and no third-party script loads: the site
 * still funnels every quote CTA to the `zalo.me` deep link in `SITE.zalo`, so
 * the visitor path works before the OA is set up.
 */
const OA_ID = process.env.NEXT_PUBLIC_ZALO_OA_ID;

export function ZaloChat() {
  if (!OA_ID) return null;

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
