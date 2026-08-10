"use client";

import { useActionState } from "react";
import { login } from "./actions";

/**
 * A client component only for `useActionState`, which is what puts the error
 * message under the fields without a round-trip through the URL. Nothing here
 * reads the URL, so the form itself still arrives as prerendered HTML — the
 * view to return to after login travels in a cookie instead (`RETURN_COOKIE`).
 */
export function LoginForm() {
  const [error, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="mt-8 flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="t-caption-strong">Tên đăng nhập</span>
        <input
          className="input"
          name="username"
          type="text"
          autoComplete="username"
          autoCapitalize="none"
          autoFocus
          required
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="t-caption-strong">Mật khẩu</span>
        <input
          className="input"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>

      {error ? (
        <p role="alert" className="t-caption m-0" style={{ color: "var(--color-primary)" }}>
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary mt-2" disabled={pending}>
        {pending ? "Đang kiểm tra…" : "Đăng nhập"}
      </button>
    </form>
  );
}
