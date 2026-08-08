import type { Metadata } from "next";
import KeystaticApp from "./keystatic";

/**
 * The admin shell. Keystatic renders its whole router here and the page below
 * renders nothing, which is how `@keystatic/next` expects to be mounted.
 *
 * `noindex` is belt and braces: `next.config.ts` also sends `X-Robots-Tag` for
 * `/keystatic/*`, and `sitemap.ts` never emits these paths.
 */
export const metadata: Metadata = {
  title: "Quản trị nội dung",
  robots: { index: false, follow: false },
};

export default function KeystaticLayout() {
  return <KeystaticApp />;
}
