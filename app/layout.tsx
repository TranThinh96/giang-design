import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ZaloChat } from "@/components/zalo/ZaloChat";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Xưởng in offset & kỹ thuật số TP.HCM`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: SITE.name,
    title: `${SITE.name} — Xưởng in offset & kỹ thuật số TP.HCM`,
    description: SITE.description,
    url: SITE.url,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.emailSales,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.district,
    addressRegion: SITE.address.city,
    addressCountry: "VN",
  },
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        {/* The two faces that paint the header and hero on first frame. */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/roboto-400-latin.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/roboto-condensed-700-latin.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/roboto-condensed-700-vietnamese.woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a
          href="#main"
          className="btn btn-secondary sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
          style={{ background: "var(--color-bg)" }}
        >
          Bỏ qua tới nội dung
        </a>
        <Header />
        <div id="main">{children}</div>
        <Footer />
        <ZaloChat />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </body>
    </html>
  );
}
