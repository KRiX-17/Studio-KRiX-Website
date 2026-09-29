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
    | "Ongoing collaboration"
    | "Active exploration";
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

export const connectedSystemsProject: Project = {
  slug: "connected-systems",
  name: "Connected Systems",
  category: "Network · Automation · Security · Software",
  description:
    "A Studio KRiX exploration of reliable network infrastructure, UniFi systems, home automation and Lakaz integration.",
  tagline: "Networks, automation and software working together.",
  platforms: ["Infrastructure", "Security", "Automation", "Software"],
  status: "Active exploration",
  href: "/connected-systems",
  accent: "#9f233b",
  featured: false,
};

export const lakazProject: Project = {
  slug: "lakaz",
  name: "Lakaz",
  category: "Software · Household Operations · Connected Systems",
  description:
    "An evolving Studio KRiX product concept exploring a clear, human-facing layer for household tasks, routines, alerts and selected connected-system information.",
  tagline: "A simpler way to run the household.",
  platforms: ["Product concept", "Household operations", "Software"],
  status: "In development",
  href: "/lakaz",
  accent: "#a87438",
  featured: false,
};

export const projects: readonly Project[] = [
  {
    slug: "ohmxact",
    name: "OhmXact",
    category: "Software",
    description:
      "Electrical calculation tools for iPhone, iPad and Mac, with an Apple Watch companion, designed for fast practical use.",
    tagline: "Built for the workshop, the bench, and your pocket.",
    platforms: ["iPhone", "iPad", "Mac", "Apple Watch", "Android coming soon"],
    status: "Released",
    href: "/ohmxact",
    accent: "#9f233b",
    featured: true,
  },
  connectedSystemsProject,
  lakazProject,
  mondeSoniqProject,
  {
    slug: "studio-krix-website",
    name: "Studio KRiX Website",
    category: "Web",
    description:
      "A responsive portfolio and personal platform connecting technology, engineering, connected systems and music.",
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
