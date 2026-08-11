import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { PageIntro } from "@/components/page-intro";
import { FeaturedProject } from "@/components/sections/featured-project";
import { ConnectedSystemsPreview } from "@/components/sections/connected-systems-preview";
import { MondeSoniqPreview } from "@/components/sections/monde-soniq-preview";
import { lakazProject } from "@/data/projects";
import { createMetadata } from "@/lib/metadata";

const title = "Projects | Studio KRiX";
const description =
  "Studio KRiX projects across software, connected systems, networking, automation, local AI, automotive technology, music and creative infrastructure.";

const baseMetadata = createMetadata({
  title,
  description,
  path: "/projects",
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    absolute: title,
  },
};

const futureDirections = [
  "Apps & software",
  "Connected systems",
  "Networking & infrastructure",
  "Automation",
  "Local AI",
  "Automotive technology",
  "Music & creative projects",
] as const;

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        description="Selected work across software, connected systems, automotive technology and creative production, built around practical ideas."
        title="Projects"
      />

      <FeaturedProject showAllProjectsLink={false} />
      <MondeSoniqPreview />
      <ConnectedSystemsPreview />

      <section className="lakaz-project-preview">
        <div className="site-container lakaz-project-preview__panel">
          <div>
            <p className="section-label">{lakazProject.category}</p>
            <span>{lakazProject.status} · Active concept</span>
            <h2>{lakazProject.name}</h2>
            <p className="lakaz-project-preview__tagline">{lakazProject.tagline}</p>
          </div>
          <div>
            <p>{lakazProject.description}</p>
            <div className="lakaz-project-preview__actions">
              <ButtonLink href={lakazProject.href}>Explore Lakaz</ButtonLink>
              <ButtonLink href="/connected-systems" variant="secondary">
                Connected Systems
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="website-project">
        <div className="site-container website-project__panel">
          <div>
            <p className="section-label">Web platform</p>
            <h2>Studio KRiX Website</h2>
          </div>
          <div>
            <p>
              A responsive portfolio and personal platform connecting
              technology, engineering, connected systems and music, built with
              Next.js, TypeScript and Vercel.
            </p>
            <ButtonLink href="/" variant="secondary">
              Visit Studio KRiX
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="project-directions">
        <div className="site-container project-directions__grid">
          <div>
            <p className="section-label">Future-ready</p>
            <h2>Built to grow with the work.</h2>
          </div>
          <div>
            <p>
              The project structure can grow across these directions without
              publishing empty placeholders before the work is ready.
            </p>
            <ul>
              {futureDirections.map((direction) => (
                <li key={direction}>{direction}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
