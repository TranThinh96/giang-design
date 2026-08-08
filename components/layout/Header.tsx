"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, type SiteSettings } from "@/lib/types";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * The two-row nav of the design system.
 *
 * Row one is `global-nav`: a 44px true-black strip carrying the section links
 * at 12px. It scrolls away with the page. Row two is `sub-nav-frosted`: a
 * 52px parchment strip at 80% opacity over a backdrop blur, which sticks to
 * the top and keeps the workshop name on the left and the quote CTA — the
 * site's one persistent primary action — on the right.
 *
 * Below 834px (`nav:`) the global nav collapses to the brand mark plus a
 * hamburger, and the tray it opens carries the section links.
 *
 * Settings arrive as a prop rather than from the reader: this is a Client
 * Component (it owns the tray state), so it cannot touch the filesystem.
 * `SiteChrome` reads them once on the server and passes them down.
 */
export function Header({ settings: SITE }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the tray on navigation, and don't let the page scroll behind it.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const dim = "color-mix(in srgb, #ffffff 76%, transparent)";

  return (
    <header>
      {/* ── global nav ── */}
      <div className="bg-void text-on-dark">
        <div className="shell-wide flex h-11 items-center gap-6">
          <Link
            href="/"
            className="t-nav-link text-on-dark mr-auto"
            aria-label={SITE.name}
          >
            {SITE.shortName}
          </Link>

          <nav className="hidden items-center gap-6 nav:flex" aria-label="Chính">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="t-nav-link"
                  style={{ color: active ? "var(--color-on-dark)" : dim }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <a href={SITE.phoneHref} className="t-nav-link text-on-dark ml-auto nav:ml-0">
            {SITE.phone}
          </a>

          <button
            type="button"
            className="text-on-dark -mr-2 grid h-11 w-8 place-items-center nav:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              {open ? (
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2 5h12M2 11h12"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div id="mobile-nav" className="nav:hidden">
            <nav className="shell-wide flex flex-col pb-4">
              {NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="t-body py-3"
                    style={{
                      color: active ? "var(--color-on-dark)" : dim,
                      borderBottom:
                        "1px solid color-mix(in srgb, #ffffff 14%, transparent)",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* ── sub-nav ── */}
      <div
        className="sticky top-0 z-20"
        style={{
          background: "color-mix(in srgb, var(--color-parchment) 80%, transparent)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
        }}
      >
        <div className="shell-wide flex h-[52px] items-center gap-6">
          <Link href="/" className="t-tagline text-ink mr-auto truncate">
            {SITE.name}
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link href="/san-pham-dich-vu" className="t-caption link">
              Sản phẩm &amp; dịch vụ
            </Link>
            <Link href="/du-an" className="t-caption link">
              Dự án
            </Link>
          </div>

          {/* The label shortens rather than wrapping: the strip is 52px and a
              two-line pill would burst it. */}
          <Link
            href="/bao-gia"
            className="btn btn-primary btn-compact shrink-0 whitespace-nowrap"
          >
            <span className="sm:hidden">Báo giá</span>
            <span className="hidden sm:inline">Yêu cầu báo giá</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
