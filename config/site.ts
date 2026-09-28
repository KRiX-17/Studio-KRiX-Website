const navigation = [
  { label: "About Me", href: "/about" },
] as const;

const mobileNavigation = navigation;

export const siteConfig = {
  name: "Studio KRiX",
  founder: "Christopher Helene",
  description:
    "Photography, music production, DJ work and software development by Studio KRiX in Sydney, Australia.",
  url: "https://studiokrix.com.au",
  location: "Sydney, Australia",
  linkedIn: "https://www.linkedin.com/in/chris-helene-b0791ba5",
  github: "https://github.com/KRiX-17",
  navigation,
  mobileNavigation,
  footerNavigation: [
    { label: "About Me", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Support", href: "/support" },
    { label: "Privacy", href: "/privacy" },
  ],
} as const;

export type NavigationItem = (typeof siteConfig.mobileNavigation)[number];
