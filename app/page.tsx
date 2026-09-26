import { FeaturedProject } from "@/components/sections/featured-project";
import { FeaturedMusic } from "@/components/sections/featured-music";
import { HomeAbout } from "@/components/sections/home-about";
import { HomeContact } from "@/components/sections/home-contact";
import { HomeHero } from "@/components/sections/home-hero";
import { PhotographyPreview } from "@/components/sections/photography-preview";

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeaturedMusic />
      <FeaturedProject />
      <PhotographyPreview />
      <HomeAbout />
      <HomeContact />
    </>
  );
}
