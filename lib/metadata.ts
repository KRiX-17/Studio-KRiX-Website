import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type MetadataImage = {
  url: string;
  width?: number;
  height?: number;
  alt: string;
};

type MetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: MetadataImage;
};

export function createMetadata({
  title,
  description,
  path,
  image,
}: MetadataOptions): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();
  const socialImage = image ?? {
    url: "/social-preview.svg",
    width: 1200,
    height: 630,
    alt: `${siteConfig.name} — photography, music and development`,
  };

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
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}
