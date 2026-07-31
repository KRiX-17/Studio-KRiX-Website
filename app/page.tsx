import { FeaturedProject } from "@/components/sections/featured-project";
import { HomeAbout } from "@/components/sections/home-about";
import { HomeContact } from "@/components/sections/home-contact";
import { HomeHero } from "@/components/sections/home-hero";
import { MusicSection } from "@/components/sections/music-section";
import { ProfessionalProfile } from "@/components/sections/professional-profile";
import { SkillsSection } from "@/components/sections/skills-section";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <MusicSection />
      <FeaturedProject />
      <ProfessionalProfile />
      <SkillsSection />
      <HomeAbout />
      <HomeContact />
    </>
  );
}
