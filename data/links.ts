export type LinkCategory =
  | "featured"
  | "social"
  | "music"
  | "track"
  | "contact";

export type LinkIconName =
  | "studio"
  | "resistor"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "soundcloud"
  | "spotify"
  | "apple-music"
  | "tidal"
  | "deezer"
  | "linkedin"
  | "github"
  | "email";

export type LinksHubItem = {
  title: string;
  description?: string;
  href: string;
  category: LinkCategory;
  icon: LinkIconName;
  featured: boolean;
  external: boolean;
  badge?: string;
};

// Replace this one value with the public App Store URL after approval.
export const OHMXACT_DESTINATION = "/ohmxact";

export const linksHubItems = [
  {
    title: "Visit Studio KRiX",
    description: "Software, automotive technology and creative projects.",
    href: "/",
    category: "featured",
    icon: "studio",
    featured: true,
    external: false,
  },
  {
    title: "Listen to Music",
    description: "Releases and official listening links from KRiX.",
    href: "/music",
    category: "featured",
    icon: "apple-music",
    featured: true,
    external: false,
  },
  {
    title: "View Projects",
    description: "Selected software, technical and creative work.",
    href: "/projects",
    category: "featured",
    icon: "studio",
    featured: true,
    external: false,
  },
  {
    title: "Professional Profile",
    description: "Automotive engineering and software capabilities.",
    href: "/professional",
    category: "featured",
    icon: "linkedin",
    featured: true,
    external: false,
  },
  {
    title: "OhmXact",
    description: "Fast resistor calculations for iPhone and iPad.",
    href: OHMXACT_DESTINATION,
    category: "featured",
    icon: "resistor",
    featured: true,
    external: false,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/chris-helene-b0791ba5",
    category: "social",
    icon: "linkedin",
    featured: false,
    external: true,
  },
  {
    title: "GitHub",
    href: "https://github.com/KRiX-17",
    category: "social",
    icon: "github",
    featured: false,
    external: true,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/djkrix17",
    category: "social",
    icon: "instagram",
    featured: false,
    external: true,
  },
  {
    title: "TikTok",
    href: "https://www.tiktok.com/@djkrix17",
    category: "social",
    icon: "tiktok",
    featured: false,
    external: true,
  },
  {
    title: "YouTube",
    href: "https://www.youtube.com/@krix93",
    category: "social",
    icon: "youtube",
    featured: false,
    external: true,
  },
  {
    title: "SoundCloud",
    href: "https://soundcloud.com/krix17",
    category: "social",
    icon: "soundcloud",
    featured: false,
    external: true,
  },
  {
    title: "Spotify",
    href: "https://open.spotify.com/artist/7irl8hhorrxXMgH5ctmWH9",
    category: "music",
    icon: "spotify",
    featured: false,
    external: true,
  },
  {
    title: "Apple Music",
    href: "https://music.apple.com/au/artist/krix/1856384923",
    category: "music",
    icon: "apple-music",
    featured: false,
    external: true,
  },
  {
    title: "TIDAL",
    href: "https://tidal.com/album/476994572/track/476994580",
    category: "music",
    icon: "tidal",
    featured: false,
    external: true,
  },
  {
    title: "Deezer",
    href: "https://link.deezer.com/s/31IvIfrDJLGZxILXbbLy4",
    category: "music",
    icon: "deezer",
    featured: false,
    external: true,
  },
  {
    title: "Spotify",
    href: "https://open.spotify.com/track/2tiXxFRbRd6262WZ6VqG6J",
    category: "track",
    icon: "spotify",
    featured: true,
    external: true,
    badge: "Keep Walking Your Path",
  },
  {
    title: "Apple Music",
    href: "https://music.apple.com/au/album/keep-walking-your-path/1856385133?i=1856385134",
    category: "track",
    icon: "apple-music",
    featured: true,
    external: true,
    badge: "Keep Walking Your Path",
  },
  {
    title: "General Contact",
    description: "krix@studiokrix.com.au",
    href: "/contact",
    category: "contact",
    icon: "email",
    featured: false,
    external: false,
  },
  {
    title: "OhmXact Support",
    description: "support@studiokrix.com.au",
    href: "/support",
    category: "contact",
    icon: "email",
    featured: false,
    external: false,
  },
] as const satisfies readonly LinksHubItem[];

export function getLinksByCategory<Category extends LinkCategory>(
  category: Category,
) {
  return linksHubItems.filter(
    (
      item,
    ): item is Extract<
      (typeof linksHubItems)[number],
      { category: Category }
    > => item.category === category,
  );
}

const musicServiceNames = [
  "Spotify",
  "Apple Music",
  "SoundCloud",
  "YouTube",
  "TIDAL",
  "Deezer",
] as const;

export function getMusicServiceLinks() {
  return musicServiceNames.flatMap((name) => {
    const item = linksHubItems.find(
      (candidate) =>
        candidate.title === name &&
        (candidate.category === "music" || candidate.category === "social"),
    );

    return item ? [item] : [];
  });
}
