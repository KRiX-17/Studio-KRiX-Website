import Image from "next/image";
import { ButtonLink } from "@/components/button-link";

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
            Automotive technician, app creator and music producer based in
            Sydney, Australia.
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
    </section>
  );
}
