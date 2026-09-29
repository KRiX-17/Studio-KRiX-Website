import type { Metadata } from "next";
import { MusicSection } from "@/components/sections/music-section";
import { PageIntro } from "@/components/page-intro";
import { createMetadata } from "@/lib/metadata";
import styles from "./music.module.css";

const title = "Music by KRiX | Studio KRiX";
const description =
  "Electronic music, releases and official listening links from KRiX.";

const baseMetadata = createMetadata({
  title,
  description,
  path: "/music",
  image: {
    url: "/images/music/drift-glass-cover.webp",
    width: 1800,
    height: 1800,
    alt: "Drift Glass by KRiX cover artwork",
  },
});

export const revalidate = 900;

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    absolute: title,
  },
};

export default function MusicPage() {
  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />
      <PageIntro
        description="Electronic music shaped by atmosphere, rhythm and emotion."
        index="KRiX / Studio KRiX"
        title="Music by KRiX"
      />
      <MusicSection />
    </div>
  );
}
