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
 * Settings arrive as a prop rather than from the reader: this is a Client
 * Component (it owns the mobile drawer state), so it cannot touch the
 * filesystem. `SiteChrome` reads them once on the server and passes them down.
 */
export function Header({ settings: SITE }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer on navigation, and don't let the page scroll behind it.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-20"
      style={{
        background: "color-mix(in srgb, var(--color-bg) 92%, transparent)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid var(--color-divider)",
      }}
    >
      <div className="shell flex items-center gap-7 py-3.5">
        <Link
          href="/"
          className="mr-auto flex items-center gap-2.5 no-underline"
          aria-label={SITE.name}
        >
          <span
            className="grid h-[26px] w-[26px] place-items-center text-white"
            style={{
              background: "var(--color-accent)",
              fontFamily: "var(--font-heading)",
              fontSize: 16,
              lineHeight: 1,
            }}
          >
            G
          </span>
          <span
            className="text-[21px] tracking-[0.02em]"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              color: "var(--color-accent)",
            }}
          >
            {SITE.shortName}
          </span>
          <span
            className="hidden text-[10px] uppercase tracking-[0.22em] sm:inline"
            style={{ color: "var(--color-accent-700)" }}
          >
            {SITE.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-[22px] text-sm lg:flex">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="no-underline"
                style={{
                  color: active ? "var(--color-accent)" : "var(--color-text)",
                  fontWeight: active ? 500 : 400,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3.5 md:flex">
          <a
            href={SITE.phoneHref}
            className="text-base tracking-[0.02em] no-underline"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-accent-800)",
            }}
          >
            {SITE.phone}
          </a>
          <Link href="/bao-gia" className="btn btn-primary">
            Yêu cầu báo giá
          </Link>
        </div>

        <button
          type="button"
          className="btn btn-secondary h-9 w-9 !p-0 lg:hidden"
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
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2 4h12M2 8h12M2 12h12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="lg:hidden"
          style={{
            borderTop: "1px solid var(--color-divider)",
            background: "var(--color-bg)",
          }}
        >
          <nav className="shell flex flex-col py-2">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="py-3 text-[15px] no-underline"
                  style={{
                    color: active ? "var(--color-accent)" : "var(--color-text)",
                    borderBottom: "1px solid var(--color-divider)",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="flex flex-wrap items-center gap-3 py-4">
              <Link href="/bao-gia" className="btn btn-primary btn-lg">
                Yêu cầu báo giá
              </Link>
              <a
                href={SITE.phoneHref}
                className="text-base no-underline"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--color-accent-800)",
                }}
              >
                {SITE.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
