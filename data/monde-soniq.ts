type MondeSoniqAssetBase = {
  id: string;
  kind: "identity" | "logo" | "event-artwork";
  src: string;
  alt: string;
  width: number;
  height: number;
  approvedBy: "NFRMT";
};

export type MondeSoniqIdentityAsset = MondeSoniqAssetBase & {
  kind: "identity";
  sourceUrl: string;
  originalUrl: string;
};

export type MondeSoniqLogoAsset = MondeSoniqAssetBase & {
  kind: "logo";
  theme: "light" | "dark" | "neutral";
};

export type MondeSoniqEventAsset = MondeSoniqAssetBase & {
  kind: "event-artwork";
  sourceUrl: string;
  originalUrl: string;
  eventTitle: string;
  venue: string;
  date: string;
  dateLabel: string;
};

export const mondeSoniqIdentity = {
  id: "monde-soniq-logo",
  kind: "identity",
  src: "/images/monde-soniq/monde-soniq-logo.webp",
  alt: "Monde Soniq circular wordmark",
  width: 200,
  height: 200,
  sourceUrl: "https://muzeek.com/mondesoniq",
  originalUrl:
    "https://images.muzeek.com/graphics/icons/tmp_533734452_1773012728.png",
  approvedBy: "NFRMT",
} as const satisfies MondeSoniqIdentityAsset;

export const mondeSoniqWordmark = {
  id: "monde-soniq-wordmark-brain-to-brain",
  kind: "identity",
  src: "/images/monde-soniq/monde-soniq-wordmark-brain-crop.webp",
  alt: "Monde Soniq wordmark from the Brain to Brain event artwork",
  width: 250,
  height: 135,
  sourceUrl: "https://ra.co/events/2274765",
  originalUrl:
    "https://images.ra.co/46ca169ce85d9f4f198be4386a6a5b361e4d25ef.jpg",
  approvedBy: "NFRMT",
} as const satisfies MondeSoniqIdentityAsset;

export const mondeSoniqLogoBlack = {
  id: "monde-soniq-logo-black",
  kind: "logo",
  src: "/images/monde-soniq/monde-soniq-logo-black.png",
  alt: "Monde Soniq logo",
  width: 2718,
  height: 2332,
  approvedBy: "NFRMT",
  theme: "light",
} as const satisfies MondeSoniqLogoAsset;

export const mondeSoniqLogoWhite = {
  id: "monde-soniq-logo-white",
  kind: "logo",
  src: "/images/monde-soniq/monde-soniq-logo-white.png",
  alt: "Monde Soniq logo",
  width: 2718,
  height: 2332,
  approvedBy: "NFRMT",
  theme: "dark",
} as const satisfies MondeSoniqLogoAsset;

export const mondeSoniqLogoOriginal = {
  id: "monde-soniq-logo-original",
  kind: "logo",
  src: "/images/monde-soniq/monde-soniq-logo-original.jpg",
  alt: "Monde Soniq circular logo on a white background",
  width: 1080,
  height: 1350,
  approvedBy: "NFRMT",
  theme: "neutral",
} as const satisfies MondeSoniqLogoAsset;

export const mondeSoniqEvents = [
  {
    id: "brain-to-brain",
    kind: "event-artwork",
    src: "/images/monde-soniq/brain-to-brain.webp",
    alt: "Black-and-white Brain to Brain event poster featuring an abstract line-art head",
    width: 1246,
    height: 1800,
    sourceUrl: "https://ra.co/events/2274765",
    originalUrl:
      "https://images.ra.co/46ca169ce85d9f4f198be4386a6a5b361e4d25ef.jpg",
    approvedBy: "NFRMT",
    eventTitle: "Brain to Brain",
    venue: "Schirrmo’s Bar",
    date: "2025-11-29",
    dateLabel: "29 November 2025",
  },
  {
    id: "ok-williams",
    kind: "event-artwork",
    src: "/images/monde-soniq/ok-williams.webp",
    alt: "Red, orange and black OK Williams event poster for Chinese Laundry",
    width: 1800,
    height: 1800,
    sourceUrl: "https://ra.co/events/2387488",
    originalUrl:
      "https://images.ra.co/77d7253051b6c086fedb1f69b677f82f17e7c760.jpg",
    approvedBy: "NFRMT",
    eventTitle: "OK Williams + Monde Soniq Takeover",
    venue: "Chinese Laundry",
    date: "2026-03-13",
    dateLabel: "13 March 2026",
  },
  {
    id: "vorpal",
    kind: "event-artwork",
    src: "/images/monde-soniq/vorpal.webp",
    alt: "Blue and magenta Vorpal hybrid live set and Monde Soniq takeover event poster",
    width: 1440,
    height: 1800,
    sourceUrl: "https://ra.co/events/2458377",
    originalUrl:
      "https://images.ra.co/8bceb07f4d5be5bff44ceb46311126facb64b934.jpg",
    approvedBy: "NFRMT",
    eventTitle: "Vorpal Hybrid Live Set + Monde Soniq",
    venue: "Chinese Laundry",
    date: "2026-06-26",
    dateLabel: "26 June 2026",
  },
] as const satisfies readonly MondeSoniqEventAsset[];

export const mondeSoniqLinks = {
  muzeek: "https://muzeek.com/mondesoniq",
} as const;

export const mondeSoniqAssets = [
  mondeSoniqLogoBlack,
  mondeSoniqLogoWhite,
  mondeSoniqLogoOriginal,
  mondeSoniqIdentity,
  mondeSoniqWordmark,
  ...mondeSoniqEvents,
] as const satisfies readonly (
  | MondeSoniqIdentityAsset
  | MondeSoniqLogoAsset
  | MondeSoniqEventAsset
)[];
