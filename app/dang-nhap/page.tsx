import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

/**
 * The gate in front of /keystatic. It sits outside the `(site)` group on
 * purpose: no header, no footer, no Zalo widget — the same reason the admin
 * itself is mounted outside the chrome.
 */
export const metadata: Metadata = {
  title: "Đăng nhập quản trị",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="tile tile-parchment grid min-h-screen place-items-center">
      <div className="mx-auto w-full max-w-[420px] px-6">
        <div className="card">
          <div className="eyebrow t-caption-strong">Giang Design</div>
          <h1 className="t-display-md m-0">Quản trị nội dung</h1>
          <p className="t-caption text-muted m-0">
            Đăng nhập bằng tên đăng nhập và mật khẩu được cấp.
          </p>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
