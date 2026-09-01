import { ButtonLink } from "@/components/button-link";
import { DeviceMockups } from "@/components/device-mockups";
import { Reveal } from "@/components/reveal";
import { OHMXACT_APP_STORE_URL } from "@/data/links";

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
          <h2>Selected Projects</h2>
        </div>
        <div className="featured-project__grid">
          <Reveal className="featured-project__copy">
            <p className="project-platforms">iPhone · iPad</p>
            <h3>OhmXact</h3>
            <p className="featured-project__tagline">
              OhmXact 2.0.3 is available now: electrical calculations,
              Projects and workshop tools for the bench, vehicle and job at
              hand.
            </p>
            <p className="featured-project__status">
              2.0.3 adds Pro and Pro+, Projects, Workshop Library, expanded
              electrical calculators, automotive tools and PDF reports.
            </p>
            <p className="featured-project__availability">
              iPhone / iPad: Available now · Mac: Coming very soon · Android /
              Windows: Coming soon
            </p>
            <div className="featured-project__links">
              <ButtonLink href="/ohmxact">Explore OhmXact</ButtonLink>
              <ButtonLink
                external
                href={OHMXACT_APP_STORE_URL}
                variant="secondary"
              >
                View on the App Store
              </ButtonLink>
              {showAllProjectsLink ? (
                <ButtonLink href="/projects" variant="secondary">
                  View all projects
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
