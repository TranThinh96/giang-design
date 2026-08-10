import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Username/password gate for /keystatic, replacing Keystatic's GitHub OAuth.
 *
 * Keystatic's `github` storage mode has no server: the admin SPA talks to
 * GitHub's GraphQL API straight from the browser, using whatever token sits in
 * the `keystatic-gh-access-token` cookie. Stock Keystatic fills that cookie
 * through an OAuth round-trip, which is why every editor needed their own
 * GitHub account and a collaborator invite.
 *
 * Here the cookie is filled from `KEYSTATIC_GITHUB_TOKEN` — one personal access
 * token belonging to the repo owner — once the editor has proved they know the
 * password. The editor never sees GitHub; every commit lands under the owner's
 * account.
 *
 * The trade that buys: **the token reaches the browser.** It has to — the
 * client is the thing that calls GitHub. So the token must be a fine-grained
 * PAT scoped to this repository alone, with Contents: Read & write and nothing
 * else, and the password must be treated as equivalent to that token. See
 * BACKEND-PLAN.md §12.
 */

/** Read by the Keystatic client in the browser, so it cannot be httpOnly. */
const GITHUB_TOKEN_COOKIE = "keystatic-gh-access-token";
/** The real session. httpOnly, signed — the token cookie is derived from it. */
export const SESSION_COOKIE = "gd-admin-session";
/**
 * The Keystatic view the editor was bounced out of, parked across the login
 * round-trip. A cookie rather than `?from=`, because reading a search param on
 * /dang-nhap would push the whole login form out of the prerendered HTML.
 * Upstream Keystatic parks its own `from` in a cookie for the same reason.
 */
export const RETURN_COOKIE = "gd-admin-return";

const SESSION_MAX_AGE = 60 * 60 * 12;
/**
 * Deliberately shorter than the session: a browser that keeps the token past
 * this has to come back through `/api/keystatic/github/{login,refresh-token}`,
 * where the session is checked again. Rotating `KEYSTATIC_SECRET` or the
 * password then locks an open tab out within the hour instead of half a day.
 */
const TOKEN_MAX_AGE = 60 * 60;

export type AdminAuth = {
  username: string;
  password: string;
  githubToken: string;
  secret: string;
};

/**
 * `null` when the four env vars aren't all set. Callers turn that into a
 * Vietnamese "chưa được cấu hình" message rather than a crash: an admin
 * misconfiguration must never be able to take the marketing site down.
 */
export function getAdminAuth(): AdminAuth | null {
  // Trimmed because a trailing space pasted into Vercel is otherwise a login
  // failure with no visible cause. The password is left exactly as configured.
  const username = process.env.KEYSTATIC_ADMIN_USERNAME?.trim();
  const password = process.env.KEYSTATIC_ADMIN_PASSWORD;
  const githubToken = process.env.KEYSTATIC_GITHUB_TOKEN;
  const secret = process.env.KEYSTATIC_SECRET;
  if (!username || !password || !githubToken || !secret) return null;
  return { username, password, githubToken, secret };
}

/** Compare digests, not the values: `timingSafeEqual` needs equal lengths. */
function safeEqual(a: string, b: string) {
  const ha = createHmac("sha256", "compare").update(a).digest();
  const hb = createHmac("sha256", "compare").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function verifyCredentials(auth: AdminAuth, username: string, password: string) {
  // Both sides always run, so a wrong username costs the same as a wrong password.
  const okUser = safeEqual(username.trim(), auth.username);
  const okPassword = safeEqual(password, auth.password);
  return okUser && okPassword;
}

/**
 * Keying on the password as well as the secret means changing the password
 * invalidates every session already issued — otherwise a leaked password would
 * stay useful for another twelve hours after being changed.
 */
function sessionKey(auth: AdminAuth) {
  return createHmac("sha256", auth.secret).update(auth.password).digest();
}

function sign(auth: AdminAuth, payload: string) {
  return createHmac("sha256", sessionKey(auth)).update(payload).digest("base64url");
}

function createSessionValue(auth: AdminAuth) {
  const expiresAt = String(Date.now() + SESSION_MAX_AGE * 1000);
  return `${expiresAt}.${sign(auth, expiresAt)}`;
}

export function hasValidSession(auth: AdminAuth, value: string | undefined) {
  if (!value) return false;
  const [expiresAt, signature] = value.split(".");
  if (!expiresAt || !signature) return false;
  if (!safeEqual(signature, sign(auth, expiresAt))) return false;
  return Number(expiresAt) > Date.now();
}

export type CookieSpec = {
  name: string;
  value: string;
  maxAge: number;
  httpOnly: boolean;
};

export function sessionCookie(auth: AdminAuth): CookieSpec {
  return {
    name: SESSION_COOKIE,
    value: createSessionValue(auth),
    maxAge: SESSION_MAX_AGE,
    httpOnly: true,
  };
}

export function githubTokenCookie(auth: AdminAuth): CookieSpec {
  return {
    name: GITHUB_TOKEN_COOKIE,
    value: auth.githubToken,
    maxAge: TOKEN_MAX_AGE,
    httpOnly: false,
  };
}

/** Long enough to type a password, short enough not to outlive the attempt. */
export function returnCookie(from: string): CookieSpec {
  return { name: RETURN_COOKIE, value: from, maxAge: 600, httpOnly: true };
}

export function clearedCookies(...names: string[]): CookieSpec[] {
  const targets = names.length ? names : [SESSION_COOKIE, GITHUB_TOKEN_COOKIE];
  return targets.map((name) => ({ name, value: "", maxAge: 0, httpOnly: false }));
}

/** Shared by `cookies().set()` in the login action and `NextResponse` in the route. */
export function cookieOptions(spec: CookieSpec) {
  return {
    maxAge: spec.maxAge,
    httpOnly: spec.httpOnly,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
}

/**
 * Keystatic passes the view the editor was on as `?from=`, so an expired
 * session returns them to their place rather than to the dashboard. Same shape
 * Keystatic validates against upstream — anything else is an open redirect.
 */
const KEYSTATIC_ROUTE =
  /^branch\/[^]+(\/collection\/[^/]+(|\/(create|item\/[^/]+))|\/singleton\/[^/]+)?$/;

export function safeReturnPath(from: string | null | undefined) {
  if (!from) return "/keystatic";
  // Reached here percent-encoded, as Keystatic's client wrote it — but decode
  // defensively so the check runs on what the browser will actually resolve.
  let segments: string[];
  try {
    segments = from.split("/").map(decodeURIComponent);
  } catch {
    return "/keystatic";
  }
  // The regex alone would let `branch/main/../../x` through — same-origin, but
  // not the view it claims to be. Traversal is never a real Keystatic route.
  if (segments.some((s) => !s || s === "." || s === "..")) return "/keystatic";
  if (!KEYSTATIC_ROUTE.test(segments.join("/"))) return "/keystatic";
  return `/keystatic/${segments.map(encodeURIComponent).join("/")}`;
}
