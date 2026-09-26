import { ButtonLink } from "@/components/button-link";
import { HomeHeroVisual } from "@/components/sections/home-hero-visual";
import { Reveal } from "@/components/reveal";

export function HomeHero() {
  return (
    <section className="home-hero" id="home">
      <div className="site-container home-hero__grid">
        <Reveal className="home-hero__copy">
          <h1>
            <span>Sound. Vision. </span>
            <span>Things that work.</span>
          </h1>
          <p className="home-hero__lede">
            Music by KRiX, practical apps and photography by Christopher
            Helene. Different disciplines, one studio.
          </p>
          <div className="home-hero__actions">
            <ButtonLink href="/music">Explore music</ButtonLink>
            <ButtonLink href="/apps" variant="secondary">Explore apps</ButtonLink>
          </div>
        </Reveal>

        <Reveal className="home-hero__media" delay={0.08} direction="left">
          <HomeHeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
