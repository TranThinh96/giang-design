import type { ReactNode } from "react";

/**
 * The site's icon set, inline.
 *
 * Inline rather than an icon package: sixteen glyphs do not justify a
 * dependency, and inline SVG is the only form that inherits `currentColor`
 * on every surface the tile system throws at it (white, parchment, navy,
 * brand blue) without a second stylesheet.
 *
 * Every glyph is drawn on the same 24×24 grid with the same 1.75 stroke, so
 * they sit on a line together. They are decorative by default — `aria-hidden`
 * — because the system never ships an icon without a text label beside it or
 * an `aria-label` on the control around it.
 */
export type IconName =
  | "phone"
  | "chat"
  | "mail"
  | "pin"
  | "clock"
  | "arrow-right"
  | "check"
  | "facebook"
  | "menu"
  | "close"
  | "printer"
  | "layers"
  | "box"
  | "truck"
  | "shield"
  | "palette";

const PATHS: Record<IconName, ReactNode> = {
  phone: (
    <path d="M6.6 3.5h2.3l1.5 3.7-1.9 1.4a11.6 11.6 0 0 0 5.4 5.4l1.4-1.9 3.7 1.5v2.3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  chat: (
    <>
      <path d="M20.5 11.6c0 4-3.8 7.2-8.5 7.2a10 10 0 0 1-2.6-.34L4.2 20.2l1.3-3.3A6.9 6.9 0 0 1 3.5 11.6c0-4 3.8-7.2 8.5-7.2s8.5 3.2 8.5 7.2Z" />
      <path d="M8.6 11.6h.01M12 11.6h.01M15.4 11.6h.01" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.8 7 7.1 5.2a2 2 0 0 0 2.2 0L20.2 7" />
    </>
  ),
  pin: (
    <>
      <path d="M19 10.3c0 5-7 11.2-7 11.2S5 15.3 5 10.3a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10.1" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.4V12l3 1.8" />
    </>
  ),
  "arrow-right": <path d="M4.5 12h15m0 0-5.6-5.6M19.5 12l-5.6 5.6" />,
  check: <path d="m4.5 12.6 4.8 4.8L19.5 7.2" />,
  facebook: (
    <path
      d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22C18.34 21.24 22 17.08 22 12.06Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  menu: <path d="M3.5 7.5h17M3.5 12h17M3.5 16.5h17" />,
  close: <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />,
  printer: (
    <>
      <path d="M7 9V3.8h10V9M7 18H5.4A2.4 2.4 0 0 1 3 15.6v-4.2A2.4 2.4 0 0 1 5.4 9h13.2A2.4 2.4 0 0 1 21 11.4v4.2a2.4 2.4 0 0 1-2.4 2.4H17" />
      <rect x="7" y="14.5" width="10" height="5.7" rx="1" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.2 8.5 4.4L12 12 3.5 7.6l8.5-4.4Z" />
      <path d="m3.5 12.4 8.5 4.4 8.5-4.4M3.5 16.9l8.5 4.4 8.5-4.4" />
    </>
  ),
  box: (
    <>
      <path d="M20.5 8.1v7.8a1.8 1.8 0 0 1-1 1.6l-6.6 3.4a1.8 1.8 0 0 1-1.8 0l-6.6-3.4a1.8 1.8 0 0 1-1-1.6V8.1a1.8 1.8 0 0 1 1-1.6l6.6-3.4a1.8 1.8 0 0 1 1.8 0l6.6 3.4a1.8 1.8 0 0 1 1 1.6Z" />
      <path d="m3.7 7.2 8.3 4.3 8.3-4.3M12 21v-9.5" />
    </>
  ),
  truck: (
    <>
      <path d="M2.8 6.2h10.4v10H2.8zM13.2 9.5h3.6l3.4 3.2v3.5h-7z" />
      <circle cx="7" cy="18.2" r="1.9" />
      <circle cx="17" cy="18.2" r="1.9" />
    </>
  ),
  shield: (
    <>
      <path d="M12 21.2s7.2-3.1 7.2-8.6V5.9L12 2.9 4.8 5.9v6.7c0 5.5 7.2 8.6 7.2 8.6Z" />
      <path d="m9 12.1 2.2 2.2 4-4.2" />
    </>
  ),
  palette: (
    <>
      <path d="M12 21a9 9 0 1 1 9-9c0 2-1.7 2.6-3.2 2.6h-1.5a2 2 0 0 0-1.4 3.4 1.7 1.7 0 0 1-1.2 3H12Z" />
      <path d="M7.6 11.2h.01M10.3 7.7h.01M14.4 7.9h.01" />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
