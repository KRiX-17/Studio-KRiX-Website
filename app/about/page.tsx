import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { PageIntro } from "@/components/page-intro";
import { createMetadata } from "@/lib/metadata";

const title = "About Christopher Helene and Studio KRiX";
const description =
  "Learn about Christopher Helene, KRiX and Studio KRiX across engineering, software, connected systems, automation, local AI and music.";

const baseMetadata = createMetadata({
  title,
  description,
  path: "/about",
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    absolute: title,
  },
};

const identities = [
  {
    title: "Christopher Helene",
    body: "A Sydney-based multidisciplinary technician, developer, photographer and electronic music producer.",
  },
  {
    title: "KRiX",
    body: "Christopher's electronic music identity, shaped by atmosphere, rhythm and emotion.",
  },
  {
    title: "Studio KRiX",
    body: "The personal platform connecting engineering, software, music, photography and creative work.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageIntro
        description="Christopher Helene, KRiX and Studio KRiX connect practical engineering, software, systems thinking and creative work."
        title="About Christopher Helene and Studio KRiX"
      />

      <section className="about-story">
        <div className="site-container about-story__grid">
          <p className="section-label">The idea</p>
          <div>
            <p className="large-statement">
              Christopher Helene is a Sydney-based multidisciplinary
              technician, developer and electronic music producer. His
              established foundation spans automotive and electrical systems,
              diagnostics, vehicle communication networks, mechanical
              installation, fabrication, software development, networking and
              practical problem-solving. Studio KRiX connects that foundation
              with evolving work in connected environments, home automation,
              local AI and deeper systems integration, alongside KRiX music
              and creative projects.
            </p>
            <p>
              It is a personal platform rather than a large company or agency:
              a simple place to develop and share practical tools,
              experimental systems, music and ideas clearly.
            </p>
          </div>
        </div>
      </section>

      <section className="identity-section">
        <div className="site-container identity-grid">
          {identities.map((identity, index) => (
            <article className="identity-card" key={identity.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{identity.title}</h2>
              <p>{identity.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-next">
        <div className="site-container about-next__inner">
          <div>
            <h2>Explore the work.</h2>
            <p>
              Continue through the music, projects or professional profile.
            </p>
          </div>
          <div className="about-next__actions">
            <ButtonLink href="/music">Music</ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              Projects
            </ButtonLink>
            <ButtonLink href="/professional" variant="secondary">
              Professional
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
