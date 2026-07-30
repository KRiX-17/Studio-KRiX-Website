import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const routes = [
  "",
  "/links",
  "/projects",
  "/ohmxact",
  "/about",
  "/support",
  "/privacy",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date("2026-07-31"),
    changeFrequency:
      route === "" || route === "/links" ? "monthly" : "yearly",
    priority:
      route === ""
        ? 1
        : route === "/ohmxact"
          ? 0.9
          : route === "/links"
            ? 0.8
            : 0.7,
  }));
}
