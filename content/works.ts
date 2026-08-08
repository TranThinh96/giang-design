/**
 * Portfolio. Titles, categories and specs come from the design artifact.
 *
 * `image` is deliberately omitted: every photo in the artifact pointed at
 * https://quangcaonhatrang.com.vn/uploads/… — a third party's server. Those
 * cannot ship. Drop real files into /public/works and set `image` to enable
 * them; until then each card renders the blueprint placeholder. PLAN.md §9.1.
 */
export type Work = {
  slot: string;
  cat: string;
  title: string;
  spec: string;
  ph: string;
  image?: string;
};

export const ALL_CATS = "Tất cả";

export const CATS = [
  ALL_CATS,
  "Bảng hiệu & Hộp đèn",
  "Gian hàng & Sự kiện",
  "Thi công Shop",
  "Trang trí lễ hội",
  "Thiết kế & In ấn",
] as const;

export const WORKS: Work[] = [
  {
    slot: "gd-w1",
    cat: "Bảng hiệu & Hộp đèn",
    title: "Bảng hiệu hộp đèn Duyên Hà Coffee",
    spec: "Hộp đèn siêu mỏng · mica",
    ph: "Hộp đèn",
  },
  {
    slot: "gd-w2",
    cat: "Bảng hiệu & Hộp đèn",
    title: "Bảng hiệu NC Helmets",
    spec: "Chữ nổi · đèn LED",
    ph: "Bảng hiệu",
  },
  {
    slot: "gd-w3",
    cat: "Gian hàng & Sự kiện",
    title: "3D Booth ra mắt phim — Galaxy GoldCoast",
    spec: "In PP · thi công 3D",
    ph: "Booth",
  },
  {
    slot: "gd-w4",
    cat: "Gian hàng & Sự kiện",
    title: "Gian hàng Sóng Việt Corp",
    spec: "Backdrop · in hiflex",
    ph: "Gian hàng",
  },
  {
    slot: "gd-w5",
    cat: "Thi công Shop",
    title: "Shop thời trang nữ JINI",
    spec: "Thiết kế & thi công trọn gói",
    ph: "Shop",
  },
  {
    slot: "gd-w6",
    cat: "Trang trí lễ hội",
    title: "Trang trí Tết 2026 trọn gói",
    spec: "Tiểu cảnh · in bạt khổ lớn",
    ph: "Trang trí Tết",
  },
  {
    slot: "gd-w7",
    cat: "Trang trí lễ hội",
    title: "Tiểu cảnh Tết Nguyên Đán 2023",
    spec: "Mô hình · in decal",
    ph: "Tiểu cảnh Tết",
  },
  {
    slot: "gd-w8",
    cat: "Trang trí lễ hội",
    title: "Trang trí Tết Hiệu vàng Tiến Lộc",
    spec: "Mặt tiền · in PP",
    ph: "Trang trí mặt tiền",
  },
  {
    slot: "gd-w9",
    cat: "Thiết kế & In ấn",
    title: "Menu nhà hàng hải sản",
    spec: "Couche 250gsm · cán mờ",
    ph: "Menu",
  },
];

export const FEATURED = WORKS.slice(0, 6);

export function worksIn(cat: string): Work[] {
  return cat === ALL_CATS ? WORKS : WORKS.filter((w) => w.cat === cat);
}
