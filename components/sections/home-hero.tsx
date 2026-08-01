import { ButtonLink } from "@/components/button-link";
import { HomeHeroVisual } from "@/components/sections/home-hero-visual";

export function HomeHero() {
  return (
    <section className="home-hero" id="home">
      <div className="site-container home-hero__grid">
        <div className="home-hero__copy">
          <p className="home-hero__eyebrow">
            Christopher Helene <span aria-hidden="true">·</span> KRiX{" "}
            <span aria-hidden="true">·</span> Studio KRiX
          </p>
          <h1>
            <span>Technology, engineering </span>
            <span>and music brought together.</span>
          </h1>
          <p className="home-hero__lede">
            Automotive technician, software developer and music producer based
            in Sydney, Australia.
          </p>
          <div className="home-hero__actions">
            <ButtonLink href="/music">Explore Music</ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              View Projects
            </ButtonLink>
            <ButtonLink href="/professional" variant="secondary">
              Professional Profile
            </ButtonLink>
          </div>
        </div>

        <div className="home-hero__media">
          <HomeHeroVisual />
        </div>
      </div>
    </section>
  );
}
