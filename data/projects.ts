export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  tagline: string;
  platforms: readonly string[];
  status: "Available soon" | "In development" | "Released";
  href: string;
  accent: string;
  featured: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: "ohmxact",
    name: "OhmXact",
    category: "Software",
    description: "Fast, focused resistor calculations for iPhone and iPad.",
    tagline: "Built for the workshop, the bench, and your pocket.",
    platforms: ["iPhone", "iPad"],
    status: "Available soon",
    href: "/ohmxact",
    accent: "#7657ff",
    featured: true,
  },
];

export const featuredProject =
  projects.find((project) => project.featured) ?? projects[0];
