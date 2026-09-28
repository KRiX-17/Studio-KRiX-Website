import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const routes = [
  "",
  "/photography",
  "/music",
  "/development",
  "/about",
  "/ohmxact",
  "/lakaz",
  "/support",
  "/privacy",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date("2026-09-28"),
    changeFrequency:
      route === "" || route === "/photography" || route === "/music" || route === "/development"
        ? "monthly"
        : "yearly",
    priority:
      route === ""
        ? 1
        : route === "/photography" || route === "/music" || route === "/development"
          ? 0.9
          : route === "/ohmxact"
            ? 0.85
            : 0.7,
  }));
}
