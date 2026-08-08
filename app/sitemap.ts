import type { MetadataRoute } from "next";
import { getProducts, getSettings } from "@/lib/content";

/**
 * `/keystatic` and `/api/keystatic` are deliberately absent: the admin is not
 * public content. `next.config.ts` also sends `X-Robots-Tag: noindex` for them.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [SITE, products] = await Promise.all([getSettings(), getProducts()]);
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/san-pham-dich-vu", priority: 0.9 },
    { path: "/du-an", priority: 0.8 },
    { path: "/bao-gia", priority: 0.8 },
    { path: "/gioi-thieu", priority: 0.6 },
    { path: "/lien-he", priority: 0.6 },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE.url}${r.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...products.map((p) => ({
      url: `${SITE.url}/san-pham-dich-vu/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
