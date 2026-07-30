import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Studio KRiX — Engineering, software and creative work",
    template: "%s — Studio KRiX",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder, url: `${siteConfig.url}/about` }],
  creator: siteConfig.founder,
  publisher: siteConfig.name,
  category: "technology",
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Studio KRiX — Engineering, software and creative work",
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
        alt: "Studio KRiX — software, sound and engineering built differently",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio KRiX — Engineering, software and creative work",
    description: siteConfig.description,
    images: ["/social-preview.svg"],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#09090B",
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
      email: siteConfig.email,
      founder: {
        "@id": `${siteConfig.url}/#christopher-helene`,
      },
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
      jobTitle: "Founder",
      worksFor: {
        "@id": `${siteConfig.url}/#organization`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={`${geist.variable} ${instrumentSerif.variable}`}
      data-scroll-behavior="smooth"
      lang="en"
    >
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
