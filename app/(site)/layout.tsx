import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getSettings } from "@/lib/content";

/**
 * Site-wide metadata. It is a `generateMetadata` rather than a `const` because
 * the name, description and canonical origin are now editable in the CMS —
 * still resolved at build time, so every page below stays prerendered.
 */
export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const title = `${s.name} — Xưởng in offset & kỹ thuật số TP.HCM`;

  return {
    metadataBase: new URL(s.url),
    title: { default: title, template: `%s | ${s.name}` },
    description: s.description,
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: s.name,
      title,
      description: s.description,
      url: s.url,
    },
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
  };
}

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteChrome>{children}</SiteChrome>;
}
