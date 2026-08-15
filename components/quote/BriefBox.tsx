"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * A copyable message plus the button that opens Zalo with it.
 *
 * The site has no forms by design — quotes happen in chat, where a file can be
 * attached and a question answered in the same thread. What a form was
 * actually buying is *structure*, and this is that structure: the fields the
 * workshop needs, in an order the visitor can copy and fill in.
 *
 * Client-side only for the clipboard; the message itself is built by the
 * caller, so a server component can supply it.
 */
export function BriefBox({
  title,
  intro,
  message,
  zalo,
  note,
}: {
  title: string;
  intro: string;
  message: string;
  zalo: string;
  note: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked (insecure origin, or the permission was denied).
      // The text is selectable in the box below, so nothing is lost.
      setCopied(false);
    }
  }

  return (
    <section className="card text-left">
      <h3 className="m-0">{title}</h3>
      <p className="t-caption text-muted m-0">{intro}</p>

      <pre
        className="t-caption text-muted m-0 overflow-x-auto whitespace-pre-wrap rounded-md p-4"
        style={{ background: "var(--color-parchment)", fontFamily: "var(--font-text)" }}
      >
        {message}
      </pre>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={copy} className="btn btn-soft btn-compact">
          {copied ? <Icon name="check" size={16} /> : null}
          {copied ? "Đã sao chép" : "Sao chép nội dung"}
        </button>
        {/* Copy then send, in that order and in one place: the step after
            copying is always "open Zalo", so it should not require scrolling
            back up to the hero. */}
        <a
          href={zalo}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-compact"
        >
          <Icon name="chat" size={16} />
          Mở Zalo và gửi
        </a>
      </div>

      {/* Announced politely rather than shouted: the visible label already
          changed, this is the same news for a screen reader. */}
      <p aria-live="polite" className="sr-only">
        {copied ? "Đã sao chép nội dung." : ""}
      </p>
      <span className="t-caption text-muted">{note}</span>
    </section>
  );
}
