/**
 * The eight print categories. Copy transcribed verbatim from the approved
 * design artifact; `slug` is new (the artifact navigated by array index, the
 * site needs a real URL).
 *
 * `image` is intentionally unset — the artifact hotlinked photography from a
 * third party's server. Slots fall back to the blueprint placeholder until
 * Giang Design supplies its own assets. See PLAN.md §9.1.
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

export const PRODUCTS: Product[] = [
  {
    code: "SP-01",
    slug: "tem-nhan-decal",
    slot: "gd-p1",
    name: "Tem nhãn & Decal",
    moq: "từ 500 con",
    blurb:
      "Decal giấy, decal nhựa PP/PE, tem bảy màu — in cuộn hoặc in tờ, bế theo biên dạng.",
    materialsShort: "Decal giấy, PP sữa, PET trong",
    long: "Tem nhãn dán chai lọ, hũ mỹ phẩm, bao bì thực phẩm. In offset hoặc kỹ thuật số, bế biên dạng theo file dao, giao dạng cuộn hoặc tờ rời tùy dây chuyền dán của khách.",
    specs: [
      { k: "Công nghệ in", v: "Offset 4 màu / kỹ thuật số UV" },
      { k: "Khổ thành phẩm", v: "10 × 10 mm – 300 × 400 mm" },
      { k: "Hoàn thiện", v: "Cán bóng, cán mờ, ép kim, dập nổi" },
      { k: "Keo", v: "Keo thường, keo lạnh, keo tháo được" },
      { k: "Thời gian", v: "3–5 ngày làm việc" },
    ],
    materials: ["Decal giấy", "Decal PP sữa", "PET trong", "Decal vỡ", "Giấy mỹ thuật"],
  },
  {
    code: "SP-02",
    slug: "bao-bi-giay",
    slot: "gd-p2",
    name: "Bao bì giấy",
    moq: "từ 1.000 cái",
    blurb: "Bao bì thực phẩm, mỹ phẩm — in offset, cán màng, bế cấn tại xưởng.",
    materialsShort: "Ivory, Duplex, Kraft",
    long: "Bao bì giấy cho ngành thực phẩm và mỹ phẩm, in offset trên giấy có chứng từ nguồn gốc, mực gốc soy đạt yêu cầu tiếp xúc gián tiếp thực phẩm.",
    specs: [
      { k: "Công nghệ in", v: "Offset 4–6 màu" },
      { k: "Định lượng", v: "210 – 400 gsm" },
      { k: "Hoàn thiện", v: "Cán màng, phủ UV định vị, ép kim" },
      { k: "Thời gian", v: "5–8 ngày làm việc" },
    ],
    materials: ["Ivory 300gsm", "Duplex 350gsm", "Kraft 250gsm", "Couche 250gsm"],
  },
  {
    code: "SP-03",
    slug: "hop-giay-carton",
    slot: "gd-p3",
    name: "Hộp giấy & Carton",
    moq: "từ 500 hộp",
    blurb: "Hộp bế cấn, hộp nắp gài, hộp cứng dán tay, thùng carton sóng.",
    materialsShort: "Ivory, carton sóng E/B",
    long: "Từ hộp giấy bế cấn đơn giản đến hộp cứng dán tay cao cấp và thùng carton sóng vận chuyển. Nhận làm dao mới theo bản vẽ hoặc theo mẫu vật.",
    specs: [
      { k: "Kết cấu", v: "Nắp gài, đáy khóa, hộp cứng, sóng E/B/BC" },
      { k: "Kích thước", v: "Theo bản vẽ dao" },
      { k: "Hoàn thiện", v: "Cán màng, ép kim, dán tay" },
      { k: "Thời gian", v: "7–10 ngày làm việc" },
    ],
    materials: ["Ivory 350gsm", "Duplex 400gsm", "Carton sóng E", "Carton sóng BC"],
  },
  {
    code: "SP-04",
    slug: "tui-giay",
    slot: "gd-p4",
    name: "Túi giấy",
    moq: "từ 300 túi",
    blurb: "Túi giấy quai cotton, quai giấy xoắn — kraft, couche, giấy mỹ thuật.",
    materialsShort: "Kraft, Couche, mỹ thuật",
    long: "Túi giấy đựng sản phẩm và túi quà tặng, dán hông và đáy tại xưởng, quai cotton hoặc quai giấy xoắn.",
    specs: [
      { k: "Định lượng", v: "150 – 250 gsm" },
      { k: "Kích thước", v: "Theo yêu cầu" },
      { k: "Quai", v: "Cotton, giấy xoắn, dây dù" },
      { k: "Thời gian", v: "5–7 ngày làm việc" },
    ],
    materials: ["Kraft 170gsm", "Couche 200gsm", "Giấy mỹ thuật"],
  },
  {
    code: "SP-05",
    slug: "catalogue",
    slot: "gd-p5",
    name: "Catalogue",
    moq: "từ 200 cuốn",
    blurb: "Catalogue đóng kim, keo gáy hoặc khâu chỉ — 8 đến 200 trang.",
    materialsShort: "Couche 100–300gsm",
    long: "Catalogue giới thiệu sản phẩm, in offset ruột couche, bìa cán màng. Đóng kim giữa, keo nhiệt hoặc khâu chỉ tùy độ dày.",
    specs: [
      { k: "Khổ", v: "A4, A5, vuông 210 × 210 mm" },
      { k: "Số trang", v: "8 – 200 trang (bội số 4)" },
      { k: "Đóng", v: "Kim giữa, keo gáy, khâu chỉ" },
      { k: "Thời gian", v: "5–8 ngày làm việc" },
    ],
    materials: ["Couche 150gsm", "Couche 250gsm bìa", "Giấy Ford 100gsm"],
  },
  {
    code: "SP-06",
    slug: "brochure-to-roi",
    slot: "gd-p6",
    name: "Brochure & Tờ rơi",
    moq: "từ 500 tờ",
    blurb: "Tờ rơi A4/A5, brochure gấp 2–4, in nhanh trong 48 giờ.",
    materialsShort: "Couche 150–250gsm",
    long: "Ấn phẩm quảng cáo khổ nhỏ, in offset số lượng lớn hoặc kỹ thuật số cho đơn gấp. Gấp đôi, gấp ba, gấp cửa sổ.",
    specs: [
      { k: "Khổ", v: "A4, A5, DL 99 × 210 mm" },
      { k: "Kiểu gấp", v: "Gấp đôi, gấp ba, gấp cửa" },
      { k: "Hoàn thiện", v: "Cán mờ tùy chọn" },
      { k: "Thời gian", v: "48 giờ (in nhanh)" },
    ],
    materials: ["Couche 150gsm", "Couche 250gsm", "Ford 120gsm"],
  },
  {
    code: "SP-07",
    slug: "danh-thiep",
    slot: "gd-p7",
    name: "Danh thiếp",
    moq: "từ 100 hộp",
    blurb: "Danh thiếp giấy mỹ thuật, ép kim, dập chìm, bo góc.",
    materialsShort: "Mỹ thuật 300–600gsm",
    long: "Danh thiếp doanh nghiệp trên giấy mỹ thuật hoặc couche cán màng, tùy chọn ép kim, dập chìm nổi, cắt bo góc.",
    specs: [
      { k: "Khổ", v: "90 × 55 mm (chuẩn)" },
      { k: "Định lượng", v: "300 – 600 gsm" },
      { k: "Hoàn thiện", v: "Ép kim, dập nổi, cán mờ, bo góc" },
      { k: "Thời gian", v: "2–3 ngày làm việc" },
    ],
    materials: ["Mỹ thuật ngà", "Couche 300gsm", "Giấy Kraft"],
  },
  {
    code: "SP-08",
    slug: "standee-bang-ron",
    slot: "gd-p8",
    name: "Standee & Băng rôn",
    moq: "từ 1 cái",
    blurb: "In kỹ thuật số khổ lớn: standee, backdrop, băng rôn, hiflex.",
    materialsShort: "PP, hiflex, canvas",
    long: "In khổ lớn cho sự kiện và điểm bán: standee cuốn 0,8 × 1,8 m, backdrop khung, băng rôn hiflex ngoài trời.",
    specs: [
      { k: "Công nghệ in", v: "Kỹ thuật số khổ lớn, mực UV" },
      { k: "Độ phân giải", v: "720 – 1440 dpi" },
      { k: "Khổ tối đa", v: "3,2 m khổ cuộn" },
      { k: "Thời gian", v: "24–48 giờ" },
    ],
    materials: ["PP cán mờ", "Hiflex 380gsm", "Canvas", "Decal dán kính"],
  },
];

export const PRODUCT_NAMES = PRODUCTS.map((p) => p.name);

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
