import type { NextConfig } from "next";

/** The admin is not public content. `robots.ts` disallows it too. */
const NOINDEX = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig: NextConfig = {
  images: {
    // Product and portfolio photography is uploaded through /keystatic and
    // served from /public, so no remote host is involved. Add domains here only
    // if the image library ever moves to Cloudinary (BACKEND-PLAN.md §7).
    remotePatterns: [],
  },
  async headers() {
    return [
      { source: "/keystatic", headers: NOINDEX },
      { source: "/keystatic/:path*", headers: NOINDEX },
      { source: "/api/keystatic/:path*", headers: NOINDEX },
    ];
  },
};

export default nextConfig;
