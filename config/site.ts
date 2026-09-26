const navigation = [
  { label: "Music", href: "/music" },
  { label: "Apps", href: "/apps" },
  { label: "Photography", href: "/photography" },
] as const;

const aboutNavigation = [
  { label: "About", href: "/about" },
  { label: "Links", href: "/links" },
  { label: "Contact", href: "/contact" },
] as const;

export const siteConfig = {
  name: "Studio KRiX",
  founder: "Christopher Helene",
  description:
    "Music, apps, photography and technical projects by Christopher Helene in Sydney, Australia.",
  url: "https://studiokrix.com.au",
  location: "Sydney, Australia",
  linkedIn: "https://www.linkedin.com/in/chris-helene-b0791ba5",
  github: "https://github.com/KRiX-17",
  navigation,
  aboutNavigation,
  mobileNavigation: navigation,
  footerNavigation: [
    { label: "Contact", href: "/contact" },
    { label: "Support", href: "/support" },
    { label: "Privacy", href: "/privacy" },
  ],
} as const;

export type NavigationItem = { label: string; href: string };
