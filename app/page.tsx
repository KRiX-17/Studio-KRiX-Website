import { FeaturedProject } from "@/components/sections/featured-project";
import { FeaturedMusic } from "@/components/sections/featured-music";
import { HomeAbout } from "@/components/sections/home-about";
import { HomeContact } from "@/components/sections/home-contact";
import { HomeHero } from "@/components/sections/home-hero";
import { MondeSoniqPreview } from "@/components/sections/monde-soniq-preview";
import { ProfessionalProfile } from "@/components/sections/professional-profile";
import { ConnectedSystemsPreview } from "@/components/sections/connected-systems-preview";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeaturedMusic />
      <FeaturedProject />
      <MondeSoniqPreview showAllProjectsLink />
      <ConnectedSystemsPreview showAllProjectsLink />
      <ProfessionalProfile />
      <HomeAbout />
      <HomeContact />
    </>
  );
}
