import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ZaloChat } from "@/components/zalo/ZaloChat";
import { getSettings } from "@/lib/content";

/**
 * Skip link, header, footer, Zalo widget and the LocalBusiness structured data
 * — everything that wraps a marketing page.
 *
 * It lives in a component rather than in the root layout so `/keystatic` can
 * render the admin on a bare page, and so `not-found.tsx` (which sits outside
 * the `(site)` group, because it has to answer for unmatched URLs) still gets
 * the same chrome.
 *
 * Settings are read once here and passed down: `Header` is a Client Component
 * and cannot await the reader itself.
 */
export async function SiteChrome({ children }: { children: ReactNode }) {
  const settings = await getSettings();

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.name,
    description: settings.description,
    url: settings.url,
    telephone: settings.phone,
    email: settings.emailSales,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address.street,
      addressLocality: settings.address.district,
      addressRegion: settings.address.city,
      addressCountry: "VN",
    },
    // Deliberately not derived from `settings.hours`: that field is free text
    // for humans ("T2–T7, 8:00 – 17:30") and parsing it into schema.org's
    // format would break the moment the editor rephrases it.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "17:30",
      },
    ],
  };

  return (
    <>
      <a
        href="#main"
        className="btn btn-secondary sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        style={{ background: "var(--color-bg)" }}
      >
        Bỏ qua tới nội dung
      </a>
      <Header settings={settings} />
      <div id="main">{children}</div>
      <Footer settings={settings} />
      <ZaloChat />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
    </>
  );
}
