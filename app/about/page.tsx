import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { PageIntro } from "@/components/page-intro";
import { createMetadata } from "@/lib/metadata";

const title = "About Christopher Helene and Studio KRiX";
const description =
  "Learn about Christopher Helene, KRiX and the ideas behind Studio KRiX.";

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
    body: "A Sydney-based automotive technician, developer and electronic music producer.",
  },
  {
    title: "KRiX",
    body: "Christopher's electronic music identity, shaped by atmosphere, rhythm and emotion.",
  },
  {
    title: "Studio KRiX",
    body: "The personal home that brings practical software, automotive technology and creative projects together.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageIntro
        description="Christopher Helene, KRiX and Studio KRiX are three parts of one practical and creative body of work."
        title="About Christopher Helene and Studio KRiX"
      />

      <section className="about-story">
        <div className="site-container about-story__grid">
          <p className="section-label">The idea</p>
          <div>
            <p className="large-statement">
              Christopher Helene is a Sydney-based automotive technician,
              developer and electronic music producer. Studio KRiX brings
              those interests together through practical software, automotive
              technology and creative projects.
            </p>
            <p>
              It is a personal platform rather than a large company or agency:
              a simple place to share useful work, music and ideas clearly.
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
