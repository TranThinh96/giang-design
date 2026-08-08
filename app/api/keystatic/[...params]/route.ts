import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "@/keystatic.config";

/**
 * GitHub OAuth callback plus the commit API the admin posts to. In local
 * storage mode this writes straight to the working tree instead.
 *
 * The handler is built on first request, not at module scope: in `github`
 * storage mode `makeRouteHandler` throws unless the four
 * `KEYSTATIC_*` / `NEXT_PUBLIC_KEYSTATIC_*` env vars are set, and at module
 * scope that throw happens while Next collects page data — taking the whole
 * marketing site's build down over an admin-only misconfiguration. Deferred,
 * the failure is a 500 on `/api/keystatic/*` and nothing else.
 */
export const dynamic = "force-dynamic";

let handler: ReturnType<typeof makeRouteHandler> | undefined;

function routeHandler() {
  handler ??= makeRouteHandler({ config });
  return handler;
}

export function GET(request: Request) {
  return routeHandler().GET(request);
}

export function POST(request: Request) {
  return routeHandler().POST(request);
}
