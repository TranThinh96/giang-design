import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PageHeading } from "@/components/ui/SectionHeading";

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
      <main className="tile tile-light">
        <div className="shell">
          <PageHeading
            eyebrow="Lỗi 404"
            title="Không tìm thấy trang"
            lead="Đường dẫn này không tồn tại hoặc đã được chuyển."
          >
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/" className="btn btn-primary btn-hero">
                Về trang chủ
              </Link>
              <Link href="/san-pham-dich-vu" className="btn btn-secondary btn-hero">
                Danh mục in ấn
              </Link>
            </div>
          </PageHeading>
        </div>
      </main>
    </SiteChrome>
  );
}
