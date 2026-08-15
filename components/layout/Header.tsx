"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { NAV, type SiteSettings } from "@/lib/types";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * The site's nav, in two rows.
 *
 * Row one is the contact strip: hours, address, phone and email on the deep
 * blue, at 13px. It scrolls away with the page — it is reassurance, not
 * navigation. Row two sticks: the mark, the five section links, and the two
 * things a visitor is here to do (call, or ask for a price).
 *
 * The previous version buried the phone number as 12px grey text in a black
 * strip and pushed half the sections into a second, different link row. Both
 * are now one thing each: contact is a pill you can hit, and every section
 * link lives in a single nav with a visible current-page state.
 *
 * Below 834px (`nav:`) the sticky row keeps the mark, the quote pill and a
 * hamburger; the tray it opens carries the sections plus the same contact
 * actions, and the fixed `ContactBar` covers call/Zalo/quote at all times.
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

  return (
    <header>
      {/* ── contact strip ── */}
      <div className="bg-tile-3 text-on-dark hidden nav:block">
        <div className="shell-wide flex h-10 items-center gap-6 text-[13px] leading-none">
          <span className="text-body-muted inline-flex items-center gap-2">
            <Icon name="clock" size={15} />
            {SITE.hours}
          </span>
          <span className="text-body-muted inline-flex items-center gap-2">
            <Icon name="pin" size={15} />
            {SITE.address.district}, {SITE.address.city}
          </span>

          <a
            href={`mailto:${SITE.emailSales}`}
            className="link-quiet-on-dark ml-auto inline-flex items-center gap-2"
          >
            <Icon name="mail" size={15} />
            {SITE.emailSales}
          </a>
          <a
            href={SITE.phoneHref}
            className="text-on-dark inline-flex items-center gap-2 font-semibold"
          >
            <Icon name="phone" size={15} />
            {SITE.phone}
          </a>
        </div>
      </div>

      {/* ── sticky nav ── */}
      <div
        className="sticky top-0 z-30"
        style={{
          background: "color-mix(in srgb, var(--color-canvas) 82%, transparent)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          borderBottom: "1px solid var(--color-hairline)",
        }}
      >
        <div className="shell-wide flex h-16 items-center gap-6">
          <Link href="/" className="mr-auto flex items-center gap-3">
            {/* The sign itself: gold letter on the blue field. */}
            <span
              aria-hidden
              className="bg-primary grid h-9 w-9 flex-none place-items-center rounded-[10px] text-[19px] font-bold leading-none"
              style={{ color: "var(--color-brand-gold-on-dark)" }}
            >
              G
            </span>
            {/* The full name is 26 characters and would wrap the 64px strip
                into two rows on a phone, so the mark's short name takes over
                below 640px. */}
            <span className="min-w-0 leading-tight">
              <span className="t-body-strong text-ink block whitespace-nowrap">
                <span className="sm:hidden">{SITE.shortName}</span>
                <span className="hidden sm:inline">{SITE.name}</span>
              </span>
              <span className="t-fine-print text-subtle hidden sm:block">
                {SITE.tagline}
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-7 nav:flex"
            aria-label="Điều hướng chính"
          >
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`t-caption-strong whitespace-nowrap ${
                    active ? "text-primary" : "link-quiet"
                  }`}
                  style={
                    active
                      ? {
                          textDecoration: "underline",
                          textDecorationThickness: "2px",
                          textUnderlineOffset: "7px",
                        }
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <a
            href={SITE.phoneHref}
            className="btn btn-soft btn-compact hidden shrink-0 whitespace-nowrap nav:inline-flex"
          >
            <Icon name="phone" size={16} />
            {SITE.phone}
          </a>

          {/* The label shortens rather than wrapping: a two-line pill would
              burst the 64px strip. */}
          <Link
            href="/bao-gia"
            className="btn btn-primary btn-compact shrink-0 whitespace-nowrap"
          >
            <span className="sm:hidden">Báo giá</span>
            <span className="hidden sm:inline">Yêu cầu báo giá</span>
          </Link>

          <button
            type="button"
            className="text-ink -mr-2 grid h-11 w-10 place-items-center nav:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>

        {open && (
          <div
            id="mobile-nav"
            className="bg-canvas nav:hidden"
            style={{ borderTop: "1px solid var(--color-hairline)" }}
          >
            <nav className="shell-wide flex flex-col py-2" aria-label="Điều hướng chính">
              {NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`t-body-strong py-4 ${active ? "text-primary" : "text-ink"}`}
                    style={{
                      borderBottom: "1px solid var(--color-divider-soft)",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="shell-wide flex flex-col gap-2 pb-5">
              <a href={SITE.phoneHref} className="btn btn-soft w-full">
                <Icon name="phone" size={18} />
                Gọi {SITE.phone}
              </a>
              <a
                href={SITE.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full"
              >
                <Icon name="chat" size={18} />
                Nhắn Zalo
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
