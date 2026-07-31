export type MondeSoniqAsset = {
  id: string;
  placement: "identity" | "event-highlight" | "collaboration";
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

/**
 * Approved Monde Soniq media belongs here once supplied or confirmed.
 * The case-study page renders no media section while this registry is empty.
 */
export const mondeSoniqAssets: readonly MondeSoniqAsset[] = [];
