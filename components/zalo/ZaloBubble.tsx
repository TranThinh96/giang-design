/**
 * The floating Zalo button.
 *
 * Deliberately a plain `<a>` to the `zalo.me` deep link rather than a script:
 * it needs no Official Account, loads no third party, ships no JavaScript, and
 * on a phone it hands straight off to the Zalo app — which is where the
 * conversation was going to happen anyway. On desktop the same link opens
 * Zalo Web.
 *
 * `ZaloChat` decides between this and Zalo's own OA widget, so only one
 * bubble can ever be on screen.
 */
export function ZaloBubble({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="zalo-bubble"
      aria-label={label}
    >
      <span className="zalo-bubble-label" aria-hidden>
        {label}
      </span>

      {/* Zalo's mark: the white speech bubble carrying the wordmark. Drawn
          inline so it inherits nothing and needs no font file — the wordmark
          is set in the generic bold sans every platform has. */}
      <svg width="34" height="34" viewBox="0 0 48 48" aria-hidden focusable="false">
        <path
          fill="#ffffff"
          d="M24 8C13.5 8 5 15 5 23.6c0 4.9 2.8 9.2 7.1 11.9-.2 2-.9 4.1-2.1 5.9-.4.6.2 1.3.9 1.1 3.3-.9 6-2.4 7.8-3.6 1.7.4 3.5.6 5.3.6 10.5 0 19-7 19-15.9S34.5 8 24 8Z"
        />
        <text
          x="24"
          y="28"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="13"
          fontWeight="700"
          fill="#0068ff"
        >
          Zalo
        </text>
      </svg>
    </a>
  );
}
