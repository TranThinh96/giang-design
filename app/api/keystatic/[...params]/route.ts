import { makeRouteHandler } from "@keystatic/next/route-handler";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import config from "@/keystatic.config";
import {
  cookieOptions,
  clearedCookies,
  getAdminAuth,
  githubTokenCookie,
  hasValidSession,
  returnCookie,
  safeReturnPath,
  SESSION_COOKIE,
  type CookieSpec,
} from "@/lib/admin-auth";

/**
 * In `local` storage mode (development) this is Keystatic's own handler: it
 * reads and writes `content/` on disk and needs no auth at all.
 *
 * In `github` mode it is not Keystatic's handler. Upstream, these paths are a
 * GitHub App OAuth dance whose only job is to put a GitHub token in the
 * `keystatic-gh-access-token` cookie; the admin SPA then talks to GitHub
 * directly from the browser and never comes back here. We keep the same paths
 * and the same cookie, but source the token from the owner's PAT after a
 * username/password check instead. See `lib/admin-auth.ts`.
 */
export const dynamic = "force-dynamic";

const LOCAL = config.storage.kind === "local";

let localHandler: ReturnType<typeof makeRouteHandler> | undefined;

/**
 * Built on first request, so nothing Keystatic-side runs at module scope:
 * `makeRouteHandler` reads config eagerly and throws in `github` mode without
 * its env vars, and at module scope that throw lands during "Collecting page
 * data" — failing the whole marketing build over an admin-only problem. The
 * `github` branch below no longer reaches this function at all, which makes the
 * laziness belt and braces rather than load-bearing. It costs one `??=`.
 */
function local() {
  localHandler ??= makeRouteHandler({ config });
  return localHandler;
}

function endpoint(request: Request) {
  return new URL(request.url).pathname
    .replace(/^\/api\/keystatic\/?/, "")
    .replace(/\/$/, "");
}

function withCookies(response: NextResponse, specs: CookieSpec[]) {
  for (const spec of specs) {
    response.cookies.set(spec.name, spec.value, cookieOptions(spec));
  }
  return response;
}

function plain(body: string, status: number) {
  return new NextResponse(body, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

function unconfigured() {
  return plain(
    "Trang quản trị chưa được cấu hình. Cần đặt KEYSTATIC_ADMIN_USERNAME, " +
      "KEYSTATIC_ADMIN_PASSWORD, KEYSTATIC_GITHUB_TOKEN và KEYSTATIC_SECRET.",
    500,
  );
}

export async function GET(request: Request) {
  if (LOCAL) return local().GET(request);

  const path = endpoint(request);

  if (path === "github/logout") {
    return withCookies(
      NextResponse.redirect(new URL("/dang-nhap", request.url)),
      clearedCookies(),
    );
  }

  const auth = getAdminAuth();
  if (!auth) return unconfigured();

  /**
   * The SPA sends the editor here whenever it has no usable token — on first
   * visit, and again each time the hour-long token cookie lapses. A live
   * session means the second case is invisible: mint a new token and carry on.
   */
  if (path === "github/login") {
    const from = new URL(request.url).searchParams.get("from");
    const session = (await cookies()).get(SESSION_COOKIE)?.value;

    if (!hasValidSession(auth, session)) {
      return withCookies(NextResponse.redirect(new URL("/dang-nhap", request.url)), [
        returnCookie(from ?? ""),
      ]);
    }

    return withCookies(
      NextResponse.redirect(new URL(safeReturnPath(from), request.url)),
      [githubTokenCookie(auth)],
    );
  }

  if (path === "github/repo-not-found") {
    return plain(
      "GitHub từ chối truy cập kho nội dung. Kiểm tra KEYSTATIC_GITHUB_TOKEN: " +
        "token phải còn hạn và có quyền Contents: Read & write trên repo này.",
      500,
    );
  }

  return plain("Not Found", 404);
}

export async function POST(request: Request) {
  if (LOCAL) return local().POST(request);

  if (endpoint(request) !== "github/refresh-token") return plain("Not Found", 404);

  const auth = getAdminAuth();
  if (!auth) return unconfigured();

  // Keystatic's client calls this when the token cookie is gone but it would
  // rather not bounce the editor to a login screen. Same answer here: the
  // session is the thing that lasts, the token is re-derived from it.
  const session = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!hasValidSession(auth, session)) return plain("Authorization failed", 401);

  return withCookies(new NextResponse("", { status: 200 }), [githubTokenCookie(auth)]);
}
