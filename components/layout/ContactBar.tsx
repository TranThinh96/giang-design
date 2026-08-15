import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { SiteSettings } from "@/lib/types";

/**
 * The fixed bottom bar on phones: call, Zalo, quote.
 *
 * Most visitors reach a print workshop from a phone and want one thing — a
 * price — so the two ways to ask for one are never more than a thumb away,
 * regardless of how far down the page they have read. It hides at the nav
 * breakpoint, where the same three actions sit in the header instead.
 *
 * It ships with its own spacer so the document ends above it, and it pads
 * itself past the iOS home indicator with `env(safe-area-inset-bottom)`.
 */
export function ContactBar({ settings: SITE }: { settings: SiteSettings }) {
  return (
    <>
      <div className="contact-bar-spacer" aria-hidden />
      <nav className="contact-bar" aria-label="Liên hệ nhanh">
        <a href={SITE.phoneHref} className="contact-bar-item">
          <Icon name="phone" size={20} />
          Gọi ngay
        </a>
        <a
          href={SITE.zalo}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-bar-item"
        >
          <Icon name="chat" size={20} />
          Nhắn Zalo
        </a>
        <Link href="/bao-gia" className="contact-bar-item contact-bar-item-primary">
          <Icon name="printer" size={20} />
          Báo giá
        </Link>
      </nav>
    </>
  );
}
