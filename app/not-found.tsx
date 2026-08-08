import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Blueprint } from "@/components/ui/Blueprint";

/**
 * Answers every unmatched URL, so it has to live at the root of `app/` rather
 * than inside the `(site)` group — which means it wraps itself in the chrome
 * the group layout would otherwise have provided.
 */
export const metadata: Metadata = {
  title: "Không tìm thấy trang",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SiteChrome>
      <main className="shell pb-24 pt-20">
        <Blueprint className="mx-auto max-w-[560px] p-10 text-center">
          <div className="eyebrow mb-2.5">Lỗi 404</div>
          <h1 className="t-page-title m-0 mb-3">Không tìm thấy trang</h1>
          <p className="ink-70 m-0 mb-6 text-base leading-[1.65]">
            Đường dẫn này không tồn tại hoặc đã được chuyển. Bạn có thể quay lại trang chủ
            hoặc xem danh mục in ấn.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-primary btn-lg">
              Về trang chủ
            </Link>
            <Link href="/san-pham-dich-vu" className="btn btn-secondary btn-lg">
              Danh mục in ấn
            </Link>
          </div>
        </Blueprint>
      </main>
    </SiteChrome>
  );
}
