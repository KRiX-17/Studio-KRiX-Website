const navigation = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
] as const;

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
  navigation,
  mobileNavigation: [{ label: "Links", href: "/links" }, ...navigation],
  footerNavigation: [
    { label: "Links", href: "/links" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Support", href: "/support" },
    { label: "Privacy", href: "/privacy" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type NavigationItem = (typeof siteConfig.mobileNavigation)[number];
