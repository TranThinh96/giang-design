/**
 * Global site content: identity, contact details, and the static blocks used
 * across the home and inner pages.
 *
 * ⚠ Every value in SITE is a placeholder carried over from the design
 * artifact (phone 0909 123 456, ĐKKD 0312xxxxxx, the Bình Tân address).
 * These feed the header, footer, contact page, map embed and the
 * LocalBusiness JSON-LD — replace them with the real details before launch.
 * PLAN.md §9.2.
 */
export const SITE = {
  name: "Giang Design – Advertising",
  shortName: "GIANG",
  tagline: "Design · Advertising",
  description:
    "Xưởng in offset & kỹ thuật số tại TP. Hồ Chí Minh — bao bì giấy, tem nhãn, hộp giấy, catalogue và ấn phẩm thương hiệu. Báo giá trong 4 giờ làm việc.",
  phone: "0774999107",
  phoneHref: "tel:+84774999107",
  zalo: "https://zalo.me/0774999107",
  facebook: "#",
  emailInfo: "info@giangdesign.vn",
  emailSales: "sales@giangdesign.vn",
  address: {
    street: "128 Đường số 7, P. Bình Hưng Hòa",
    district: "Q. Bình Tân",
    city: "TP.HCM",
    full: "128 Đường số 7, P. Bình Hưng Hòa, Q. Bình Tân, TP.HCM",
  },
  hours: "T2–T7, 8:00 – 17:30",
  license: "Giấy phép ĐKKD 0312xxxxxx",
  url: "https://giangdesign.vn",
} as const;

export const NAV = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/san-pham-dich-vu", label: "Sản phẩm & dịch vụ" },
  { href: "/du-an", label: "Dự án" },
  { href: "/lien-he", label: "Liên hệ" },
] as const;

export const STATS = [
  { value: "15+", label: "năm trong ngành in" },
  { value: "1.200+", label: "đơn hàng / năm" },
  { value: "48h", label: "mẫu in thử" },
] as const;

export const STEPS = [
  {
    no: "01",
    title: "Tiếp nhận yêu cầu",
    body: "Nhận file hoặc mẫu vật, xác định chất liệu, khổ, số lượng.",
  },
  {
    no: "02",
    title: "Báo giá & phiếu công nghệ",
    body: "Bảng giá chi tiết kèm phương án chất liệu và tiến độ.",
  },
  {
    no: "03",
    title: "In thử & duyệt mẫu",
    body: "Mẫu proof màu trong 48 giờ, khách ký duyệt trước khi lên máy.",
  },
  {
    no: "04",
    title: "In & hoàn thiện",
    body: "Offset hoặc kỹ thuật số, cán màng, bế, cấn, dán tại xưởng.",
  },
  {
    no: "05",
    title: "KCS & giao hàng",
    body: "Kiểm 100% thành phẩm, đóng kiện, giao tận kho.",
  },
] as const;

export const MACHINES = [
  { name: "Offset 4 màu", spec: "Khổ 720 × 1020 mm", cap: "13.000 tờ/giờ" },
  { name: "Offset 2 màu", spec: "Khổ 520 × 740 mm", cap: "10.000 tờ/giờ" },
  { name: "In kỹ thuật số UV", spec: "Khổ cuộn 3,2 m", cap: "60 m²/giờ" },
  { name: "Máy bế tự động", spec: "Khổ 1050 × 750 mm", cap: "5.000 tờ/giờ" },
  { name: "Dán hộp tự động", spec: "Hộp 1–4 điểm dán", cap: "18.000 hộp/giờ" },
  { name: "Cán màng bóng/mờ", spec: "Khổ tối đa 1100 mm", cap: "40 m/phút" },
] as const;

export const CLIENTS = [
  "THỰC PHẨM",
  "MỸ PHẨM",
  "DƯỢC",
  "BÁN LẺ",
  "AGENCY",
  "F&B",
] as const;

export const QUOTE_NOTES = [
  {
    t: "Phản hồi trong 4 giờ",
    b: "Yêu cầu gửi trước 16h trong ngày làm việc được báo giá cùng ngày.",
  },
  {
    t: "Mẫu in thử 48 giờ",
    b: "Proof màu và mẫu bế trắng trước khi chạy sản lượng.",
  },
  {
    t: "Đơn nhỏ vẫn nhận",
    b: "Từ 100 sản phẩm với in kỹ thuật số, không tính phí thiết kế dao có sẵn.",
  },
  {
    t: "Hỗ trợ file thiết kế",
    b: "Kiểm tra tràn lề, hệ màu CMYK, font chữ trước khi in — miễn phí.",
  },
] as const;

export const CONTACTS = [
  { k: "Xưởng sản xuất", v: SITE.address.full },
  { k: "Hotline / Zalo", v: SITE.phone },
  { k: "Kinh doanh", v: SITE.emailSales },
  { k: "Giờ làm việc", v: SITE.hours },
] as const;
