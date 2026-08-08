import "./globals.css";

/**
 * Root layout — document shell only.
 *
 * Header, footer and the site's metadata live in `app/(site)/layout.tsx`, so
 * that `/keystatic` can render the admin without the marketing chrome around
 * it. Anything added here also lands on the admin.
 */
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
      <body>{children}</body>
    </html>
  );
}
