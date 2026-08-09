import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const routes = [
  "",
  "/music",
  "/professional",
  "/links",
  "/projects",
  "/projects/monde-soniq",
  "/connected-systems",
  "/connected-systems/home-automation",
  "/casa",
  "/ohmxact",
  "/about",
  "/support",
  "/privacy",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date("2026-08-09"),
    changeFrequency:
      route === "" ||
      route === "/music" ||
      route === "/links" ||
      route === "/projects/monde-soniq"
        ? "monthly"
        : "yearly",
    priority:
      route === ""
        ? 1
        : route === "/ohmxact"
          ? 0.9
          : route === "/music" ||
              route === "/professional" ||
              route === "/connected-systems" ||
              route === "/connected-systems/home-automation" ||
              route === "/casa" ||
              route === "/projects/monde-soniq"
            ? 0.85
          : route === "/links"
            ? 0.8
            : 0.7,
  }));
}
