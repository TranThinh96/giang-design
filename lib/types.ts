/**
 * Shapes and fixed taxonomy shared by the Keystatic schema, the build-time
 * reader (`lib/content.ts`) and the components.
 *
 * This module must stay free of Node built-ins and of `@keystatic/core/reader`:
 * client components (`Header`, `FilterableWorks`) import `NAV`, `CATS` and
 * `ALL_CATS` from here as runtime values, so anything that touches `fs` would
 * end up in the browser bundle.
 */

export type Spec = { k: string; v: string };

export type Product = {
  code: string;
  slug: string;
  slot: string;
  name: string;
  moq: string;
  blurb: string;
  materialsShort: string;
  long: string;
  specs: Spec[];
  materials: string[];
  image?: string;
};

export type Work = {
  slot: string;
  cat: string;
  title: string;
  spec: string;
  ph: string;
  image?: string;
};

export type SiteSettings = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  phone: string;
  phoneHref: string;
  zalo: string;
  facebook: string;
  emailInfo: string;
  emailSales: string;
  address: { street: string; district: string; city: string; full: string };
  hours: string;
  license: string;
  url: string;
};

export type Stat = { value: string; label: string };
export type Step = { no: string; title: string; body: string };
export type Machine = { name: string; spec: string; cap: string };
export type QuoteNote = { t: string; b: string };

export type Contact = { k: string; v: string };

/**
 * Site navigation. Structural, not editorial — adding an entry here means
 * adding a route, so it stays in code rather than in the CMS.
 */
export const NAV = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/san-pham-dich-vu", label: "Sản phẩm & dịch vụ" },
  { href: "/du-an", label: "Dự án" },
  { href: "/lien-he", label: "Liên hệ" },
] as const;

export const ALL_CATS = "Tất cả";

/**
 * Portfolio categories. Single source of truth: the Keystatic `cat` field is a
 * select over `WORK_CATS`, and `/du-an` builds its filter chips from `CATS`.
 * A free-text category would silently break the chips, so editing this list is
 * a code change on purpose.
 */
export const WORK_CATS = [
  "Bảng hiệu & Hộp đèn",
  "Gian hàng & Sự kiện",
  "Thi công Shop",
  "Trang trí lễ hội",
  "Thiết kế & In ấn",
] as const;

export const CATS = [ALL_CATS, ...WORK_CATS] as const;

export type WorkCat = (typeof WORK_CATS)[number];
