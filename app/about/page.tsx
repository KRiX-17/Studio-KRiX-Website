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
    title: "Automotive + access",
    body: "Practical experience as an automotive technician, including disability vehicle technology, fabrication and workshop problem-solving.",
  },
  {
    title: "Electronics + systems",
    body: "Working with electronics, CAN and LIN communication, embedded systems and the details that connect hardware to software.",
  },
  {
    title: "Software + interfaces",
    body: "Developing focused digital tools with attention to UI, UX and the way software behaves in real working environments.",
  },
  {
    title: "Creative practice",
    body: "Music, photography and 3D printing provide other ways to explore rhythm, material, form and the process of making.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageIntro
        description="Studio KRiX is an independent engineering and creative studio founded by Christopher Helene in Sydney, Australia."
        title={
          <>
            Practical experience, <em>expressed through making.</em>
          </>
        }
      />

      <section className="about-statement">
        <div className="site-container about-statement__grid">
          <p className="section-label">The studio</p>
          <Reveal>
            <p className="large-statement">
              The work moves between physical systems and digital tools, guided
              by curiosity, care and a preference for useful outcomes.
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
          <h2>One studio. Many ways to solve a problem.</h2>
          <p>
            Studio KRiX will grow carefully, project by project, without losing
            the hands-on perspective it began with.
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
