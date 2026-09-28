import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { RevealManager } from "@/components/reveal-manager";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const homeTitle = "Studio KRiX — Photography, music and development";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: homeTitle,
    template: "%s — Studio KRiX",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder, url: `${siteConfig.url}/about` }],
  creator: siteConfig.founder,
  publisher: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [
      { url: "/brand/studio-krix/studio-krix-sk-logo-16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/studio-krix/studio-krix-sk-logo-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/studio-krix/studio-krix-sk-logo-48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/brand/studio-krix/studio-krix-sk-logo-32.png",
    apple: {
      url: "/brand/studio-krix/apple-touch-icon-180.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  manifest: "/manifest.json",
  openGraph: {
    title: homeTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/social-preview.svg",
        width: 1200,
        height: 630,
        alt: "Studio KRiX — photography, music and development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: siteConfig.description,
    images: ["/social-preview.svg"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { color: "#F8F6F4", media: "(prefers-color-scheme: light)" },
    { color: "#0A0A0C", media: "(prefers-color-scheme: dark)" },
  ],
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      description:
        "A Sydney creative studio spanning photography, electronic music and software development.",
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/brand/studio-krix/studio-krix-sk-logo-512.png`,
        width: 512,
        height: 512,
      },
      sameAs: [siteConfig.linkedIn, siteConfig.github],
      founder: { "@id": `${siteConfig.url}/#christopher-helene` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sydney",
        addressCountry: "AU",
      },
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#christopher-helene`,
      name: siteConfig.founder,
      url: `${siteConfig.url}/about`,
      knowsAbout: [
        "Photography",
        "Fashion photography",
        "Electronic music production",
        "DJ performance",
        "Software development",
        "Automotive electrical systems",
      ],
      worksFor: { "@id": `${siteConfig.url}/#organization` },
      sameAs: [siteConfig.linkedIn, siteConfig.github],
      subjectOf: [
        `${siteConfig.url}/photography`,
        `${siteConfig.url}/music`,
        `${siteConfig.url}/development`,
        `${siteConfig.url}/about`,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={geist.variable}
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <RevealManager />
        </ThemeProvider>
        <JsonLd data={structuredData} />
      </body>
    </html>
  );
}
