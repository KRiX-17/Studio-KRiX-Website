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
  artwork?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  sourceUrl?: string;
  sourceLabel?: string;
};

export const artistLiveEvents: readonly ArtistLiveEvent[] = [
  {
    id: "monde-soniq-one-year-2026",
    title: "MONDE SONIQ: One Year",
    date: "2026-11-20",
    dateLabel: "20 November 2026",
    venue: "The Abercrombie",
    venueDetail: "Chippendale, Sydney",
    timeLabel: "10 pm – 4 am AEDT",
    role: "KRiX B2B NFRMT · DJ set",
    summary:
      "Monde Soniq's first-anniversary celebration, with six B2B pairings spanning techno, breaks, bass, jungle and club sounds.",
    genres: ["Techno", "Bass", "Breaks", "Jungle"],
    artwork: {
      src: "/images/music/events/monde-soniq-one-year-2026.jpg",
      alt: "Monde Soniq anniversary flyer featuring KRiX B2B NFRMT",
      width: 800,
      height: 1135,
    },
    sourceUrl: "https://ra.co/events/2569336",
    sourceLabel: "View event on Resident Advisor",
  },
  {
    id: "tush-secret-studio-2026",
    title: "TUSH presents: Secret Studio",
    date: "2026-11-14",
    dateLabel: "14 November 2026",
    venue: "TUSH · Secret location",
    venueDetail: "Sydney",
    role: "KRiX · DJ appearance",
    summary:
      "An intimate TUSH studio session connecting emerging DJs and producers in Sydney's underground electronic scene.",
    genres: ["Techno", "Bass"],
    sourceUrl: "https://ra.co/events/2582282",
    sourceLabel: "View the TUSH event on Resident Advisor",
  },
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
  {
    id: "your-shot-sydney-2025",
    title: "Your Shot Sydney",
    date: "2025-08-02",
    dateLabel: "2 August 2025",
    venue: "Home The Venue",
    venueDetail: "Sydney",
    role: "KRiX · DJ appearance",
    summary:
      "A Your Shot Sydney performance at Home The Venue. A matching Resident Advisor event listing has not been verified.",
    genres: ["Electronic", "DJ showcase"],
    artwork: {
      src: "/images/music/events/your-shot-sydney-2025.webp",
      alt: "Your Shot NSW 2025 promotional artwork for the Sydney DJ showcase",
      width: 550,
      height: 690,
    },
    sourceUrl: "https://www.instagram.com/p/DMrvB5Jy-p_/?img_index=1",
    sourceLabel: "View the original Your Shot Instagram post",
  },
];
