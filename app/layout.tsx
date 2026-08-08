import "./globals.css";

/**
 * Root layout — document shell only.
 *
 * Header, footer and the site's metadata live in `app/(site)/layout.tsx`, so
 * that `/keystatic` can render the admin without the marketing chrome around
 * it. Anything added here also lands on the admin.
 *
 * No font preloads: the design system's stack leads with the system UI face,
 * so on Apple and Windows devices the self-hosted Roboto is never fetched at
 * all. Preloading it would cost those visitors requests they don't need, and
 * `font-display: swap` covers the platforms that do fall through to it.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
