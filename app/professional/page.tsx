import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { ArrowRightIcon } from "@/components/icons";
import { PageIntro } from "@/components/page-intro";
import { SkillsSection } from "@/components/sections/skills-section";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

const title = "Professional Profile | Christopher Helene";
const description =
  "Automotive engineering, diagnostics, software development and technical capabilities of Christopher Helene.";

const baseMetadata = createMetadata({
  title,
  description,
  path: "/professional",
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    absolute: title,
  },
};

export default function ProfessionalPage() {
  return (
    <>
      <PageIntro
        align="wide"
        description="Automotive engineering, diagnostics, software development and practical technical capability."
        index="Christopher Helene"
        title="Professional Profile"
      />

      <section className="professional-summary">
        <div className="site-container professional-summary__grid">
          <p className="section-label">Professional summary</p>
          <p>
            Christopher is an automotive technician specialising in disability
            vehicle modifications, automotive electrical systems, diagnostics,
            fabrication and vehicle communication networks. His work combines
            hands-on workshop engineering with an interest in software,
            automation and user-focused technology.
          </p>
        </div>
      </section>

      <SkillsSection />

      <section className="professional-projects">
        <div className="site-container">
          <div className="directory-heading">
            <div>
              <p className="section-label">Applied work</p>
              <h2>Selected projects</h2>
            </div>
            <p>Practical software and a platform for work across disciplines.</p>
          </div>
          <div className="professional-projects__grid">
            <Link className="professional-project" href="/ohmxact">
              <span>Software · iPhone and iPad</span>
              <h3>OhmXact</h3>
              <p>
                A fast resistor calculation app designed for the workshop, the
                bench and your pocket.
              </p>
              <ArrowRightIcon />
            </Link>
            <Link className="professional-project" href="/">
              <span>Web · Next.js and TypeScript</span>
              <h3>Studio KRiX Website</h3>
              <p>
                A responsive portfolio and creative platform built with
                Next.js, TypeScript and Vercel.
              </p>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="professional-connect">
        <div className="site-container professional-connect__grid">
          <div>
            <p className="section-label">Professional links</p>
            <h2>Continue the conversation.</h2>
            <p>
              View Christopher&apos;s professional profile and public
              development work, or get in touch about a professional
              opportunity.
            </p>
          </div>
          <div className="professional-connect__actions">
            <ButtonLink href={siteConfig.linkedIn} external>
              LinkedIn
            </ButtonLink>
            <ButtonLink
              href={siteConfig.github}
              variant="secondary"
              external
            >
              GitHub
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
