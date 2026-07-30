import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";

export function HomeHero() {
  return (
    <section className="home-hero">
      <div className="site-container home-hero__grid">
        <div className="home-hero__copy">
          <Reveal>
            <p className="home-hero__brand">Studio KRiX</p>
            <h1>
              Software, sound and engineering built{" "}
              <em>differently.</em>
            </h1>
            <p className="home-hero__lede">
              Independent software, automotive technology and creative
              projects by Christopher Helene.
            </p>
            <div className="home-hero__actions">
              <ButtonLink href="/projects">Explore Projects</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Get in Touch
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="home-hero__media" aria-hidden="true">
          <Image
            alt=""
            fill
            priority
            quality={92}
            sizes="(max-width: 800px) 100vw, 58vw"
            src="/images/studio-krix-precision-engineering.png"
          />
          <div className="home-hero__media-edge" />
        </div>
      </div>
      <div className="site-container home-hero__next">
        <span>Featured project</span>
        <span aria-hidden="true">01</span>
      </div>
    </section>
  );
}
