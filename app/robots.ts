import type { MetadataRoute } from "next";
import { getSettings } from "@/lib/content";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const SITE = await getSettings();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/keystatic", "/dang-nhap"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
