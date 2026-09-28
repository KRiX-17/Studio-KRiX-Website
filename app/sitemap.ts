import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPublicGalleries } from "@/lib/portfolio/public";

const routes = [
  "",
  "/music",
  "/now",
  "/photography",
  "/development",
  "/about",
  "/ohmxact",
  "/lakaz",
  "/support",
  "/privacy",
  "/contact",
  "/connected-systems",
  "/connected-systems/home-automation",
  "/connected-systems/local-ai",
  "/projects",
  "/projects/monde-soniq",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const galleries = await getPublicGalleries();

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: siteConfig.url + route,
    lastModified: new Date("2026-09-29"),
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

  return [
    ...staticRoutes,
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
