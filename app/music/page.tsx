import type { Metadata } from "next";
import { MusicSection } from "@/components/sections/music-section";
import { PageIntro } from "@/components/page-intro";
import { createMetadata } from "@/lib/metadata";

const title = "Music by KRiX | Studio KRiX";
const description =
  "Electronic music, releases and official listening links from KRiX.";

const baseMetadata = createMetadata({
  title,
  description,
  path: "/music",
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    absolute: title,
  },
};

export default function MusicPage() {
  return (
    <>
      <PageIntro
        description="Electronic music shaped by atmosphere, rhythm and emotion."
        index="KRiX"
        title="Music by KRiX"
      />
      <MusicSection />
    </>
  );
}
