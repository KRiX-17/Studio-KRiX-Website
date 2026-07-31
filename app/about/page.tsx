import { ButtonLink } from "@/components/button-link";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { FinalCta } from "@/components/sections/final-cta";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About",
  description:
    "About Studio KRiX founder Christopher Helene and a practice spanning automotive technology, software and creative work.",
  path: "/about",
});

const experience = [
  {
    title: "Automotive and access",
    body: "Hands-on work with disability vehicle modifications, mechanical installation, fabrication and workshop problem-solving.",
  },
  {
    title: "Electrical and diagnostics",
    body: "Automotive electrical systems, diagnostics, system integration, and CAN and LIN vehicle communication.",
  },
  {
    title: "Software and interfaces",
    body: "Creating focused iOS, Android and web applications with attention to UI, UX and useful behaviour.",
  },
  {
    title: "Music and creative work",
    body: "Electronic music production, sound design, visual identity and digital publishing under the KRiX name.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageIntro
        description="Christopher Helene is a Sydney-based automotive technician, developer and electronic music producer."
        title="Practical work across technology and music."
      />

      <section className="about-statement">
        <div className="site-container about-statement__grid">
          <p className="section-label">About</p>
          <Reveal>
            <p className="large-statement">
              Studio KRiX brings hands-on automotive work, practical software
              and creative projects together under one personal identity.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="experience-section">
        <div className="site-container">
          <div className="section-rule">
            <span>Background</span>
            <span>Across disciplines</span>
          </div>
          <div className="experience-list">
            {experience.map((item, index) => (
              <Reveal
                className="experience-row"
                delay={index * 0.04}
                key={item.title}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-close">
        <Reveal className="site-container about-close__inner">
          <h2>Hands-on thinking, carried across disciplines.</h2>
          <p>
            The aim is modest: make useful things carefully, keep learning and
            share the work clearly.
          </p>
          <ButtonLink href="/projects" variant="text">
            Explore the work
          </ButtonLink>
        </Reveal>
      </section>
      <FinalCta />
    </>
  );
}
