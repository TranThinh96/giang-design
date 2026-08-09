import { config, collection, fields, singleton } from "@keystatic/core";
import { WORK_CATS } from "@/lib/types";

/**
 * Keystatic schema — the admin at /keystatic writes these files into the repo
 * and `lib/content.ts` reads them back at build time. See BACKEND-PLAN.md §4.
 *
 * Labels and `description` help-text are Vietnamese throughout: the editor is
 * the shop owner, not a developer.
 *
 * Fields the editor never sees, because they are derived in the reader rather
 * than kept in sync by hand:
 *   - `slot`        placeholder plumbing, derived from list position
 *   - `phoneHref`   derived from `phone`
 *   - `zalo`        derived from `phone`
 *   - `address.full` joined from the three address parts
 *   - step numbering derived from list position, so reordering renumbers itself
 */

/** Local mode edits files directly with no auth, so a developer never needs the GitHub App. */
const storage =
  process.env.NODE_ENV === "development"
    ? ({ kind: "local" } as const)
    : ({ kind: "github", repo: "TranThinh96/giang-design" } as const);

export default config({
  storage,
  ui: {
    brand: { name: "Giang Design" },
    navigation: {
      "Nội dung": ["products", "works"],
      "Cài đặt chung": ["settings", "pageImages"],
      "Khối nội dung trang chủ": [
        "stats",
        "steps",
        "machines",
        "clients",
        "quoteNotes",
      ],
    },
  },

  collections: {
    products: collection({
      label: "Sản phẩm & dịch vụ",
      path: "content/products/*",
      format: { data: "json" },
      slugField: "name",
      columns: ["code", "name"],
      entryLayout: "form",
      schema: {
        name: fields.slug({
          name: {
            label: "Tên hạng mục",
            description: 'Ví dụ: "Bao bì giấy". Hiển thị trên trang chủ và trang danh mục.',
            validation: { isRequired: true },
          },
          slug: {
            label: "Đường dẫn (URL)",
            description:
              "Phần cuối của địa chỉ trang, ví dụ /san-pham-dich-vu/bao-bi-giay. " +
              "ĐỪNG sửa sau khi trang đã lên — link cũ và kết quả Google sẽ hỏng.",
          },
        }),
        code: fields.text({
          label: "Mã hạng mục",
          description: 'Ví dụ: SP-01. Hiển thị nhỏ phía trên tên.',
          validation: { isRequired: true, length: { min: 1 } },
        }),
        order: fields.integer({
          label: "Thứ tự hiển thị",
          description: "Số nhỏ hiện trước. 1, 2, 3… Dùng để sắp xếp danh mục.",
          validation: { isRequired: true },
        }),
        moq: fields.text({
          label: "Số lượng tối thiểu",
          description: 'Ví dụ: "từ 500 con".',
        }),
        materialsShort: fields.text({
          label: "Chất liệu (rút gọn)",
          description:
            'Một dòng ngắn hiện ở trang danh mục. Ví dụ: "Ivory, Duplex, Kraft".',
        }),
        blurb: fields.text({
          label: "Mô tả ngắn",
          description: "1–2 câu, hiện trên thẻ ở trang chủ và trang danh mục.",
          multiline: true,
        }),
        long: fields.text({
          label: "Mô tả chi tiết",
          description:
            "Đoạn giới thiệu đầy đủ ở trang chi tiết. Cũng được dùng làm mô tả cho Google.",
          multiline: true,
        }),
        specs: fields.array(
          fields.object({
            k: fields.text({
              label: "Tên thông số",
              description: 'Ví dụ: "Công nghệ in".',
            }),
            v: fields.text({
              label: "Giá trị",
              description: 'Ví dụ: "Offset 4 màu / kỹ thuật số UV".',
            }),
          }),
          {
            label: "Thông số kỹ thuật",
            description: "Bảng thông số ở trang chi tiết. Kéo thả để đổi thứ tự.",
            itemLabel: (props) => props.fields.k.value || "Thông số",
          },
        ),
        materials: fields.array(fields.text({ label: "Chất liệu" }), {
          label: "Chất liệu thường dùng",
          description: 'Mỗi dòng một chất liệu, hiện dạng nhãn. Ví dụ: "Ivory 300gsm".',
          itemLabel: (props) => props.value || "Chất liệu",
        }),
        image: fields.image({
          label: "Ảnh sản phẩm",
          description:
            "Không bắt buộc. Ảnh JPEG hoặc WebP, rộng từ 1600px, dung lượng dưới 400KB. " +
            "Chưa có ảnh thì ô ảnh hiện khung kẻ mặc định.",
          directory: "public/products",
          publicPath: "/products/",
        }),
        gallery: fields.array(
          fields.object({
            label: fields.text({
              label: "Nhãn ô ảnh",
              description:
                'Chữ hiện trong khung kẻ khi chưa có ảnh, và là mô tả ảnh cho Google. Ví dụ: "Chi tiết", "Chất liệu".',
            }),
            image: fields.image({
              label: "Ảnh",
              description:
                "Ảnh vuông. JPEG hoặc WebP, rộng từ 1600px, dung lượng dưới 400KB.",
              directory: "public/products",
              publicPath: "/products/",
            }),
          }),
          {
            label: "Ảnh chi tiết",
            description:
              "Ba ô ảnh nhỏ dưới ảnh chính ở trang chi tiết. Để trống cả danh sách thì " +
              'hiện ba khung mặc định "Chi tiết / Chất liệu / Thành phẩm".',
            itemLabel: (props) => props.fields.label.value || "Ảnh chi tiết",
          },
        ),
      },
    }),

    works: collection({
      label: "Dự án",
      path: "content/works/*",
      format: { data: "json" },
      slugField: "title",
      columns: ["title", "cat"],
      entryLayout: "form",
      schema: {
        title: fields.slug({
          name: {
            label: "Tên dự án",
            description: 'Ví dụ: "Bảng hiệu hộp đèn Duyên Hà Coffee".',
            validation: { isRequired: true },
          },
          slug: {
            label: "Mã lưu trữ",
            description:
              "Tên file lưu dự án. Tự sinh từ tên dự án — không cần sửa. " +
              "Trang dự án không dùng địa chỉ riêng nên sửa cũng không ảnh hưởng link.",
          },
        }),
        order: fields.integer({
          label: "Thứ tự hiển thị",
          description:
            "Số nhỏ hiện trước. 6 dự án đầu tiên cũng là 6 dự án tiêu biểu trên trang chủ.",
          validation: { isRequired: true },
        }),
        cat: fields.select({
          label: "Hạng mục",
          description:
            "Quyết định dự án nằm dưới nút lọc nào ở trang Dự án. Chọn từ danh sách, không tự gõ.",
          options: WORK_CATS.map((c) => ({ label: c, value: c })),
          defaultValue: WORK_CATS[0],
        }),
        spec: fields.text({
          label: "Thông số ngắn",
          description: 'Dòng nhỏ dưới tên dự án. Ví dụ: "Hộp đèn siêu mỏng · mica".',
        }),
        ph: fields.text({
          label: "Nhãn ô ảnh",
          description:
            'Chữ hiện trong khung kẻ khi chưa có ảnh. Ví dụ: "Hộp đèn". Ngắn 1–2 từ.',
        }),
        image: fields.image({
          label: "Ảnh dự án",
          description:
            "Ảnh JPEG hoặc WebP, rộng từ 1600px, dung lượng dưới 400KB. " +
            "Ảnh chụp thẳng từ điện thoại thường 4–8MB — cần giảm dung lượng trước khi tải lên.",
          directory: "public/works",
          publicPath: "/works/",
        }),
      },
    }),
  },

  singletons: {
    settings: singleton({
      label: "Thông tin doanh nghiệp",
      path: "content/settings",
      format: { data: "json" },
      schema: {
        name: fields.text({
          label: "Tên công ty",
          description: "Hiện ở tiêu đề trang và kết quả tìm kiếm Google.",
          validation: { isRequired: true, length: { min: 1 } },
        }),
        shortName: fields.text({
          label: "Tên rút gọn",
          description: 'Chữ cạnh logo ở đầu trang. Ví dụ: "GIANG".',
        }),
        tagline: fields.text({
          label: "Khẩu hiệu",
          description: 'Dòng nhỏ cạnh logo. Ví dụ: "Design · Advertising".',
        }),
        description: fields.text({
          label: "Mô tả doanh nghiệp",
          description:
            "1–2 câu. Đây là đoạn Google hiển thị dưới tên trang, nên viết đủ ý và có từ khóa.",
          multiline: true,
        }),
        phone: fields.text({
          label: "Số điện thoại / Zalo",
          description:
            "Chỉ cần nhập số, ví dụ 0774999107. Nút gọi và link Zalo tự sinh từ số này.",
          validation: { isRequired: true, length: { min: 1 } },
        }),
        facebook: fields.url({
          label: "Link Facebook",
          description: "Địa chỉ đầy đủ trang Facebook. Bỏ trống nếu chưa có.",
        }),
        emailInfo: fields.text({
          label: "Email chung",
          description: "Hiện ở chân trang.",
        }),
        emailSales: fields.text({
          label: "Email kinh doanh",
          description: "Hiện ở trang Liên hệ và trang Báo giá.",
        }),
        address: fields.object(
          {
            street: fields.text({
              label: "Số nhà & đường, phường",
              description: 'Ví dụ: "128 Đường số 7, P. Bình Hưng Hòa".',
            }),
            district: fields.text({
              label: "Quận / Huyện",
              description: 'Ví dụ: "Q. Bình Tân".',
            }),
            city: fields.text({
              label: "Tỉnh / Thành phố",
              description: 'Ví dụ: "TP.HCM".',
            }),
          },
          {
            label: "Địa chỉ xưởng",
            description:
              "Ba phần này được ghép lại thành địa chỉ đầy đủ và dùng để hiện bản đồ ở trang Liên hệ.",
          },
        ),
        hours: fields.text({
          label: "Giờ làm việc",
          description: 'Ví dụ: "T2–T7, 8:00 – 17:30".',
        }),
        license: fields.text({
          label: "Giấy phép kinh doanh",
          description: 'Hiện ở chân trang. Ví dụ: "Giấy phép ĐKKD 0312345678".',
        }),
        url: fields.url({
          label: "Địa chỉ website",
          description:
            "Địa chỉ chính thức, ví dụ https://giangdesign.vn — không có dấu / ở cuối. " +
            "Dùng cho sitemap và thẻ chia sẻ mạng xã hội. Chỉ sửa khi đổi tên miền.",
          validation: { isRequired: true },
        }),
      },
    }),

    /**
     * Image slots that belong to a page, not to a product or a project. They
     * live in one singleton so the editor has a single place to look for
     * "the big photo at the top of a page".
     */
    pageImages: singleton({
      label: "Ảnh cố định trên trang",
      path: "content/blocks/page-images",
      format: { data: "json" },
      schema: {
        homeHero: fields.image({
          label: "Ảnh lớn — Trang chủ",
          description:
            "Ảnh chạy hết chiều ngang dưới phần mở đầu trang chủ. Ảnh ngang, tỉ lệ 21:9 " +
            "(rất ngang, ví dụ 2100 × 900px). JPEG hoặc WebP, dung lượng dưới 400KB.",
          directory: "public/pages",
          publicPath: "/pages/",
        }),
        aboutHero: fields.image({
          label: "Ảnh lớn — Giới thiệu (nhà xưởng)",
          description:
            "Ảnh chạy hết chiều ngang ở trang Giới thiệu. Ảnh ngang, tỉ lệ 21:9. " +
            "JPEG hoặc WebP, dung lượng dưới 400KB.",
          directory: "public/pages",
          publicPath: "/pages/",
        }),
        aboutMachine: fields.image({
          label: "Ảnh máy offset (Giới thiệu)",
          description:
            "Ô ảnh bên trái ở cuối trang Giới thiệu. Tỉ lệ 4:3, rộng từ 1600px, dưới 400KB.",
          directory: "public/pages",
          publicPath: "/pages/",
        }),
        aboutFinishing: fields.image({
          label: "Ảnh tổ hoàn thiện (Giới thiệu)",
          description:
            "Ô ảnh bên phải ở cuối trang Giới thiệu. Tỉ lệ 4:3, rộng từ 1600px, dưới 400KB.",
          directory: "public/pages",
          publicPath: "/pages/",
        }),
      },
    }),

    stats: singleton({
      label: "Con số nổi bật (trang chủ)",
      path: "content/blocks/stats",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            value: fields.text({
              label: "Con số",
              description: 'Ví dụ: "15+", "1.200+", "48h".',
            }),
            label: fields.text({
              label: "Chú thích",
              description: 'Ví dụ: "năm trong ngành in".',
            }),
          }),
          {
            label: "Danh sách",
            description: "Hiện dưới phần giới thiệu đầu trang chủ. Nên giữ đúng 3 mục.",
            itemLabel: (props) => props.fields.value.value || "Con số",
          },
        ),
      },
    }),

    steps: singleton({
      label: "Quy trình làm việc (trang chủ)",
      path: "content/blocks/steps",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            title: fields.text({
              label: "Tên bước",
              description: 'Ví dụ: "Tiếp nhận yêu cầu".',
            }),
            body: fields.text({
              label: "Mô tả",
              description: "1 câu ngắn.",
              multiline: true,
            }),
          }),
          {
            label: "Các bước",
            description:
              "Số thứ tự (01, 02…) tự đánh theo vị trí — kéo thả để đổi thứ tự, không cần sửa số.",
            itemLabel: (props) => props.fields.title.value || "Bước",
          },
        ),
      },
    }),

    machines: singleton({
      label: "Thiết bị tại xưởng (trang chủ)",
      path: "content/blocks/machines",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({
              label: "Thiết bị",
              description: 'Ví dụ: "Offset 4 màu".',
            }),
            spec: fields.text({
              label: "Thông số",
              description: 'Ví dụ: "Khổ 720 × 1020 mm".',
            }),
            cap: fields.text({
              label: "Công suất",
              description: 'Ví dụ: "13.000 tờ/giờ".',
            }),
          }),
          {
            label: "Danh sách thiết bị",
            description: "Hiện dạng bảng ở mục Năng lực trên trang chủ.",
            itemLabel: (props) => props.fields.name.value || "Thiết bị",
          },
        ),
      },
    }),

    clients: singleton({
      label: "Nhóm khách hàng (trang chủ)",
      path: "content/blocks/clients",
      format: { data: "json" },
      schema: {
        items: fields.array(fields.text({ label: "Tên nhóm" }), {
          label: "Danh sách",
          description:
            'Ngành hàng đã phục vụ, viết IN HOA cho đều. Ví dụ: "THỰC PHẨM".',
          itemLabel: (props) => props.value || "Nhóm khách hàng",
        }),
      },
    }),

    quoteNotes: singleton({
      label: "Cam kết báo giá (trang Báo giá)",
      path: "content/blocks/quote-notes",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            t: fields.text({
              label: "Tiêu đề",
              description: 'Ví dụ: "Phản hồi trong 4 giờ".',
            }),
            b: fields.text({
              label: "Nội dung",
              description: "1 câu giải thích.",
              multiline: true,
            }),
          }),
          {
            label: "Danh sách cam kết",
            description: "Cột bên phải trang Báo giá.",
            itemLabel: (props) => props.fields.t.value || "Cam kết",
          },
        ),
      },
    }),
  },
});
