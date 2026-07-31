import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { PageIntro } from "@/components/page-intro";
import { FeaturedProject } from "@/components/sections/featured-project";
import { createMetadata } from "@/lib/metadata";

const title = "Projects | Studio KRiX";
const description =
  "Selected software, app, automotive technology and creative projects by Christopher Helene.";

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
  "Apps",
  "Automotive technology concepts",
  "Software tools",
  "Music projects",
  "Creative releases",
] as const;

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        description="Selected software, technical and creative work built around practical ideas."
        title="Projects"
      />

      <FeaturedProject showAllProjectsLink={false} />

      <section className="website-project">
        <div className="site-container website-project__panel">
          <div>
            <p className="section-label">Web platform</p>
            <h2>Studio KRiX Website</h2>
          </div>
          <div>
            <p>
              A responsive portfolio and creative platform built with Next.js,
              TypeScript and Vercel.
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
              Future projects can span these disciplines without rendering
              empty placeholders before the work is ready.
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
