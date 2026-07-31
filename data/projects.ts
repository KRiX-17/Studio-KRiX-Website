export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  tagline: string;
  platforms: readonly string[];
  status:
    | "Available soon"
    | "In development"
    | "Released"
    | "Ongoing collaboration";
  href: string;
  accent: string;
  featured: boolean;
};

export const mondeSoniqProject: Project = {
  slug: "monde-soniq",
  name: "Monde Soniq",
  category: "Music · Events · Creative Infrastructure",
  description:
    "An independent Sydney electronic-music platform led by NFRMT, supported behind the scenes by Studio KRiX through operational, digital and creative infrastructure.",
  tagline: "The structure behind the sound.",
  platforms: ["Music", "Events", "Creative infrastructure"],
  status: "Ongoing collaboration",
  href: "/projects/monde-soniq",
  accent: "#9f233b",
  featured: true,
};

export const projects: readonly Project[] = [
  {
    slug: "ohmxact",
    name: "OhmXact",
    category: "Software",
    description:
      "A fast resistor calculation app designed for the workshop, the bench and your pocket.",
    tagline: "Built for the workshop, the bench, and your pocket.",
    platforms: ["iPhone", "iPad"],
    status: "Available soon",
    href: "/ohmxact",
    accent: "#9f233b",
    featured: true,
  },
  mondeSoniqProject,
  {
    slug: "studio-krix-website",
    name: "Studio KRiX Website",
    category: "Web",
    description:
      "A responsive portfolio and creative platform built with Next.js, TypeScript and Vercel.",
    tagline: "A clear home for technology, engineering and music.",
    platforms: ["Web"],
    status: "Released",
    href: "/",
    accent: "#811c31",
    featured: false,
  },
];

export const featuredProject =
  projects.find((project) => project.featured) ?? projects[0];
