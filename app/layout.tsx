import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Studio KRiX — Technology, engineering and music",
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
    title: "Studio KRiX — Technology, engineering and music",
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
        alt: "Studio KRiX — technology, engineering and music brought together",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio KRiX — Technology, engineering and music",
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
      email: siteConfig.email,
      sameAs: [siteConfig.linkedIn, siteConfig.github],
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
      url: `${siteConfig.url}/professional`,
      jobTitle: "Automotive technician, developer and music producer",
      knowsAbout: [
        "Automotive diagnostics",
        "Automotive electrical systems",
        "Disability vehicle modifications",
        "Software development",
        "Electronic music production",
      ],
      worksFor: {
        "@id": `${siteConfig.url}/#organization`,
      },
      sameAs: [siteConfig.linkedIn, siteConfig.github],
      subjectOf: [
        `${siteConfig.url}/about`,
        `${siteConfig.url}/professional`,
        `${siteConfig.url}/projects`,
        `${siteConfig.url}/music`,
      ],
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
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
