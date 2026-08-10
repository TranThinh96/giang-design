"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  cookieOptions,
  clearedCookies,
  getAdminAuth,
  githubTokenCookie,
  RETURN_COOKIE,
  safeReturnPath,
  sessionCookie,
  verifyCredentials,
} from "@/lib/admin-auth";

/**
 * There is no lockout store — no database, and serverless instances share no
 * memory — so a fixed delay on every failure is the whole brute-force budget.
 * It costs a wrong password a second and makes an online guessing run against a
 * long passphrase pointless.
 */
const FAILURE_DELAY_MS = 1000;

export async function login(_previous: string | null, form: FormData): Promise<string | null> {
  const auth = getAdminAuth();
  if (!auth) {
    return "Trang quản trị chưa được cấu hình. Liên hệ đơn vị kỹ thuật.";
  }

  const username = String(form.get("username") ?? "");
  const password = String(form.get("password") ?? "");

  if (!verifyCredentials(auth, username, password)) {
    await new Promise((resolve) => setTimeout(resolve, FAILURE_DELAY_MS));
    return "Tên đăng nhập hoặc mật khẩu không đúng.";
  }

  const store = await cookies();
  const target = safeReturnPath(store.get(RETURN_COOKIE)?.value);

  for (const spec of [
    sessionCookie(auth),
    githubTokenCookie(auth),
    ...clearedCookies(RETURN_COOKIE),
  ]) {
    store.set(spec.name, spec.value, cookieOptions(spec));
  }

  redirect(target);
}
