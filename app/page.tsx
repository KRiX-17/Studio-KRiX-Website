import { DisciplinesSection } from "@/components/sections/disciplines-section";
import { FeaturedProject } from "@/components/sections/featured-project";
import { FinalCta } from "@/components/sections/final-cta";
import { FounderSection } from "@/components/sections/founder-section";
import { HomeHero } from "@/components/sections/home-hero";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeaturedProject />
      <DisciplinesSection />
      <FounderSection />
      <FinalCta />
    </>
  );
}
