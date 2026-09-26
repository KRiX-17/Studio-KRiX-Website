import { ButtonLink } from "@/components/button-link";
import { DeviceMockups } from "@/components/device-mockups";
import { Reveal } from "@/components/reveal";

type FeaturedProjectProps = {
  showAllProjectsLink?: boolean;
};

export function FeaturedProject({
  showAllProjectsLink = true,
}: FeaturedProjectProps) {
  return (
    <section className="featured-project" id="projects">
      <div className="site-container">
        <div className="home-section-heading">
          <h2>Apps built for real life</h2>
        </div>
        <div className="featured-project__grid">
          <Reveal className="featured-project__copy">
            <p className="project-platforms">iPhone · iPad</p>
            <h3>OhmXact</h3>
            <p className="featured-project__tagline">
              A fast resistor calculation app designed for the workshop, the
              bench and your pocket.
            </p>
            <div className="featured-project__links">
              <ButtonLink href="/ohmxact">Explore OhmXact</ButtonLink>
              {showAllProjectsLink ? (
                <ButtonLink href="/apps" variant="secondary">
                  View all apps
                </ButtonLink>
              ) : null}
              <ButtonLink href="/support" variant="secondary">
                Support
              </ButtonLink>
              <ButtonLink href="/privacy" variant="secondary">
                Privacy
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal className="featured-project__media" delay={0.08}>
            <DeviceMockups />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
