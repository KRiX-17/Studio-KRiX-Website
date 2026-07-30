import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type MetadataOptions = {
  title: string;
  description: string;
  path: string;
};

export function createMetadata({
  title,
  description,
  path,
}: MetadataOptions): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_AU",
      type: "website",
      images: [
        {
          url: "/social-preview.svg",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — engineering, software and creative work`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/social-preview.svg"],
    },
  };
}
