import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";

export function FounderSection() {
  return (
    <section className="founder-section">
      <div className="site-container founder-section__grid">
        <Reveal className="founder-placeholder">
          <span>Founder portrait</span>
        </Reveal>
        <Reveal className="founder-section__copy" delay={0.08}>
          <p className="section-label">About the founder</p>
          <h2>Built across disciplines.</h2>
          <p>
            Christopher Helene is a Sydney-based automotive technician,
            engineer and creator working across disability vehicle technology,
            fabrication, electronics, software, music and photography.
          </p>
          <ButtonLink href="/about" variant="text">
            More about Christopher
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
