export type ArtistLiveEvent = {
  id: string;
  title: string;
  date: string;
  dateLabel: string;
  venue: string;
  venueDetail?: string;
  timeLabel?: string;
  role: string;
  summary: string;
  genres: readonly string[];
  artwork: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  sourceUrl: string;
  sourceLabel: string;
};

export const artistLiveEvents: readonly ArtistLiveEvent[] = [
  {
    id: "elements-tech-bass-2026",
    title: "The Elements of Tech & Bass",
    date: "2026-03-13",
    dateLabel: "13 March 2026",
    venue: "Schirrmo’s Bar",
    venueDetail: "Haymarket, Sydney",
    timeLabel: "8 pm – 3 am",
    role: "KRiX · DJ set",
    summary:
      "A free-entry city session built around drum & bass, jungle and a full sound-system experience, alongside Thierry D, Jewelz, Reload, UrSea, LOZ, Nonsns and Deverence B2B Hotel 84.",
    genres: ["Drum & Bass", "Jungle"],
    artwork: {
      src: "/images/music/events/elements-tech-bass-2026.jpg",
      alt: "The Elements of Tech & Bass flyer listing KRiX at Schirrmo’s Bar",
      width: 1024,
      height: 1536,
    },
    sourceUrl: "https://ra.co/events/2365863",
    sourceLabel: "View on Resident Advisor",
  },
  {
    id: "shook-thursdays-feb-2026",
    title: "SHOOK Thursdays",
    date: "2026-02-05",
    dateLabel: "5 February 2026",
    venue: "Burdekin Hotel",
    venueDetail: "Oxford Street, Sydney",
    timeLabel: "7 pm – 11 pm · Free entry",
    role: "KRiX · 7:00–7:30 pm",
    summary:
      "KRiX opened the monthly bass-community night with a drum & bass set. The bill featured RIDDO, FVTURE DYL, LORDIFY, SYRUP STACKZ, RLICT and UBERMOON.",
    genres: ["Drum & Bass", "Dubstep", "Bass"],
    artwork: {
      src: "/images/music/events/shook-thursdays-feb-2026.jpg",
      alt: "SHOOK Thursdays flyer listing KRiX at the Burdekin Hotel",
      width: 1440,
      height: 1801,
    },
    sourceUrl: "https://www.instagram.com/p/DTuPjNHEd73/",
    sourceLabel: "View the original SHOOK post",
  },
  {
    id: "homemade-saturdays-home-2025",
    title: "Homemade Saturdays",
    date: "2025-08-30",
    dateLabel: "30 August 2025",
    venue: "Home The Venue",
    venueDetail: "Mezz Lounge, Sydney",
    role: "KRiX · DJ set",
    summary:
      "A Homemade Saturdays appearance in Home Sydney’s Mezz Lounge, on a lineup with Thalia Joan, Steven James, Sophie Lorryn and Tashi Taylor.",
    genres: ["Club set", "Electronic"],
    artwork: {
      src: "/images/music/events/homemade-saturdays-home-2025.jpg",
      alt: "Homemade Saturdays artwork listing DJ KRiX at Home Sydney",
      width: 640,
      height: 1136,
    },
    sourceUrl: "https://www.instagram.com/reel/DNhwi-gPhOq/",
    sourceLabel: "View the original Home Sydney post",
  },
];
