import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPublicGalleries } from "@/lib/portfolio/public";

const routes = [
  "",
  "/music",
  "/development",
  "/about",
  "/ohmxact",
  "/lakaz",
  "/support",
  "/privacy",
  "/contact",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const galleries = await getPublicGalleries();

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: siteConfig.url + route,
    lastModified: new Date("2026-09-28"),
    changeFrequency:
      route === "" || route === "/music" || route === "/development"
        ? "monthly"
        : "yearly",
    priority:
      route === ""
        ? 1
        : route === "/music" || route === "/development"
          ? 0.9
          : route === "/ohmxact"
            ? 0.85
            : 0.7,
  }));

  if (galleries.length === 0) return staticRoutes;

  return [
    ...staticRoutes,
    {
      url: siteConfig.url + "/photography",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...galleries.map((gallery) => ({
      url: siteConfig.url + "/photography/" + gallery.slug,
      lastModified: gallery.published_at
        ? new Date(gallery.published_at)
        : new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.75,
    })),
  ];
}
