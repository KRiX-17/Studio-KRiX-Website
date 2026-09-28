const navigation = [
  { label: "About Me", href: "/about" },
] as const;

const mobileNavigation = [
  ...navigation,
  { label: "Contact", href: "/contact" },
] as const;

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
    { label: "Photography", href: "/photography" },
    { label: "Music", href: "/music" },
    { label: "Development", href: "/development" },
    { label: "About Me", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Support", href: "/support" },
    { label: "Privacy", href: "/privacy" },
  ],
} as const;

export type NavigationItem = (typeof siteConfig.mobileNavigation)[number];
