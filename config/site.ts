const navigation = [
  { label: "Home", href: "/" },
  { label: "Music", href: "/music" },
  { label: "Projects", href: "/projects" },
  { label: "Professional", href: "/professional" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const mobileNavigation = [
  ...navigation.slice(0, -1),
  { label: "Links", href: "/links" },
  { label: "Contact", href: "/contact" },
] as const;

export const siteConfig = {
  name: "Studio KRiX",
  founder: "Christopher Helene",
  description:
    "Automotive technology, practical software and electronic music by Christopher Helene in Sydney, Australia.",
  url: "https://studiokrix.com.au",
  location: "Sydney, Australia",
  linkedIn: "https://www.linkedin.com/in/chris-helene-b0791ba5",
  github: "https://github.com/KRiX-17",
  navigation,
  mobileNavigation,
  footerNavigation: [
    { label: "Home", href: "/" },
    { label: "Music", href: "/music" },
    { label: "Projects", href: "/projects" },
    { label: "Professional", href: "/professional" },
    { label: "About", href: "/about" },
    { label: "Links", href: "/links" },
    { label: "Contact", href: "/contact" },
    { label: "Support", href: "/support" },
    { label: "Privacy", href: "/privacy" },
  ],
} as const;

export type NavigationItem = (typeof siteConfig.mobileNavigation)[number];
