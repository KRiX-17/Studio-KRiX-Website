export const siteConfig = {
  name: "Studio KRiX",
  founder: "Christopher Helene",
  description:
    "Independent software, automotive technology and creative projects by Christopher Helene.",
  url: "https://studiokrix.com",
  email: "krix@studiokrix.com.au",
  supportEmail: "support@studiokrix.com.au",
  location: "Sydney, Australia",
  secondaryDomain: "https://studiokrix.com.au",
  navigation: [
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Support", href: "/support" },
    { label: "Contact", href: "/contact" },
  ],
  footerNavigation: [
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Support", href: "/support" },
    { label: "Privacy", href: "/privacy" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type NavigationItem = (typeof siteConfig.navigation)[number];
