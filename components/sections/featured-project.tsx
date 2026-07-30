import { ButtonLink } from "@/components/button-link";
import { DeviceMockups } from "@/components/device-mockups";
import { Reveal } from "@/components/reveal";
import { featuredProject } from "@/data/projects";

export function FeaturedProject() {
  return (
    <section className="featured-project">
      <div className="site-container">
        <div className="featured-project__grid">
          <Reveal className="featured-project__copy">
            <p className="section-label">Featured project</p>
            <h2>{featuredProject.name}</h2>
            <p className="featured-project__tagline">{featuredProject.tagline}</p>
            <p className="body-muted">{featuredProject.description}</p>
            <ButtonLink href={featuredProject.href} variant="text">
              View {featuredProject.name}
            </ButtonLink>
          </Reveal>
          <Reveal className="featured-project__media" delay={0.08}>
            <DeviceMockups />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
