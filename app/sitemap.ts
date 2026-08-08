import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/content/products";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
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
    ...PRODUCTS.map((p) => ({
      url: `${SITE.url}/san-pham-dich-vu/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
