import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { ArrowRightIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { mondeSoniqAssets } from "@/data/monde-soniq";
import { createMetadata } from "@/lib/metadata";

const title = "Monde Soniq × Studio KRiX | Creative Event Infrastructure";
const description =
  "Discover how Studio KRiX supports Monde Soniq, an independent Sydney electronic-music platform led by NFRMT, through technical, operational and creative infrastructure.";
const path = "/projects/monde-soniq";

const baseMetadata = createMetadata({
  title,
  description,
  path,
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    absolute: title,
  },
};

const supportAreas = [
  {
    title: "Operational Support",
    items: [
      "Supports the practical structure surrounding events",
      "Helps maintain clear records and administrative systems",
      "Contributes to repeatable workflows",
      "Assists with keeping plans and event information organised",
    ],
  },
  {
    title: "Digital and Technical Support",
    items: [
      "Supports useful digital systems and online infrastructure",
      "Contributes to Monde Soniq’s digital presentation",
      "Helps improve workflows through software and automation",
      "Provides practical technical problem-solving when needed",
    ],
  },
  {
    title: "Creative Support",
    items: [
      "Supports the broader visual and digital presentation",
      "Helps ideas move from discussion into deliverable projects",
      "Contributes an additional creative and technical perspective",
      "Helps maintain consistency across digital touchpoints",
    ],
  },
  {
    title: "Collaboration",
    items: [
      "Works closely with NFRMT while respecting his artistic direction",
      "Provides structure without diluting Monde Soniq’s identity",
      "Supports long-term growth rather than controlling the platform",
      "Helps the creative team focus on music, artists and community",
    ],
  },
] as const;

const principles = [
  {
    title: "Creative independence",
    description:
      "Monde Soniq retains its own identity, sound and artistic direction.",
  },
  {
    title: "Reliable structure",
    description:
      "Studio KRiX helps make creative ideas easier to organise and execute.",
  },
  {
    title: "Shared growth",
    description:
      "Both projects grow through collaboration, trust and complementary skills.",
  },
  {
    title: "Behind-the-scenes support",
    description:
      "The goal is not to become the centre of attention. It is to help the platform operate smoothly.",
  },
] as const;

const highlights = [
  {
    label: "Platform",
    title: "Sydney electronic-music culture",
    description:
      "An independent platform connecting DJs, artists and audiences through underground music, experimentation and genuine connection.",
  },
  {
    label: "Creative lead",
    title: "Curated by NFRMT",
    description:
      "NFRMT drives the sound, event curation and artistic direction that define Monde Soniq’s public identity.",
  },
  {
    label: "Collaboration",
    title: "Complementary infrastructure",
    description:
      "Studio KRiX works behind the scenes on practical systems, organisation and digital support around that creative vision.",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": `${siteConfig.url}${path}/#case-study`,
  name: "Monde Soniq × Studio KRiX collaboration case study",
  headline: "The structure behind the sound.",
  description,
  url: `${siteConfig.url}${path}`,
  author: {
    "@id": `${siteConfig.url}/#organization`,
  },
  about: {
    "@type": "CreativeWork",
    name: "Monde Soniq",
    description:
      "An independent Sydney electronic-music platform built around connection, collaboration and forward-thinking club culture.",
    creator: {
      "@type": "Person",
      name: "NFRMT",
      jobTitle: "Founder, music curator and artistic lead",
    },
    contributor: {
      "@id": `${siteConfig.url}/#organization`,
      name: "Studio KRiX",
      description:
        "Technical, operational and creative support provided behind the scenes.",
    },
  },
};

export default function MondeSoniqPage() {
  return (
    <>
      <section className="monde-hero">
        <div className="site-container monde-hero__grid">
          <p className="monde-hero__eyebrow">Studio KRiX × Monde Soniq</p>
          <div className="monde-hero__content">
            <h1>
              The structure behind
              <br />
              the sound.
            </h1>
            <p>
              Studio KRiX works behind the scenes as a technical, operational
              and creative backbone for Monde Soniq, supporting the systems
              that help turn NFRMT’s artistic vision into real events and
              projects.
            </p>
            <div className="monde-hero__actions">
              <ButtonLink href="#what-monde-soniq-is">
                Discover Monde Soniq
              </ButtonLink>
              <ButtonLink href="/music" variant="secondary">
                Explore Music
              </ButtonLink>
              <ButtonLink href="/projects" variant="secondary">
                View Studio KRiX Projects
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section
        className="monde-page-section monde-editorial"
        id="what-monde-soniq-is"
        aria-labelledby="what-monde-soniq-title"
      >
        <div className="site-container monde-editorial__grid">
          <p className="section-label">What Monde Soniq is</p>
          <div>
            <h2 id="what-monde-soniq-title">
              Music, collaboration and community
            </h2>
            <p>
              Monde Soniq is an independent Sydney electronic-music platform
              led by NFRMT. Its events bring together DJs, artists and
              audiences through a shared focus on underground music,
              experimentation and genuine connection.
            </p>
            <p>
              Its identity is shaped by NFRMT’s musical direction, curation
              and desire to create spaces where artists can collaborate beyond
              rigid genre boundaries.
            </p>
          </div>
        </div>
      </section>

      <section
        className="monde-page-section monde-relationship"
        aria-labelledby="monde-relationship-title"
      >
        <div className="site-container monde-relationship__panel">
          <div>
            <p className="section-label">The Studio KRiX relationship</p>
            <h2 id="monde-relationship-title">Where Studio KRiX fits</h2>
          </div>
          <div className="monde-relationship__copy">
            <p>
              Every creative platform needs more than a strong idea. It also
              needs structure, organisation and reliable systems behind it.
            </p>
            <p>
              Studio KRiX supports Monde Soniq in that space. It contributes
              practical thinking, digital systems, administration,
              organisation and technical problem-solving while allowing Monde
              Soniq to retain its own voice and identity.
            </p>
            <p>
              <strong>
                Studio KRiX is the backbone behind Monde Soniq.
              </strong>{" "}
              This does not mean Studio KRiX owns or replaces Monde Soniq’s
              identity. It means Studio KRiX helps provide the behind-the-scenes
              structure that allows the creative vision to operate reliably.
            </p>
            <p>
              The relationship is collaborative rather than corporate. NFRMT
              leads the artistic direction. Studio KRiX helps build the
              framework around it.
            </p>
          </div>
        </div>
      </section>

      <section
        className="monde-page-section monde-backbone"
        aria-labelledby="monde-backbone-title"
      >
        <div className="site-container">
          <div className="directory-heading">
            <div>
              <p className="section-label">Behind the scenes</p>
              <h2 id="monde-backbone-title">The backbone behind the sound</h2>
            </div>
            <p>
              Modest, practical support that helps creative work move forward
              while preserving Monde Soniq’s independence.
            </p>
          </div>
          <div className="monde-backbone__grid">
            {supportAreas.map((area) => (
              <article className="monde-support-card" key={area.title}>
                <h3>{area.title}</h3>
                <ul>
                  {area.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="monde-page-section monde-origin"
        aria-labelledby="monde-origin-title"
      >
        <div className="site-container monde-editorial__grid">
          <p className="section-label">Origin story</p>
          <div>
            <h2 id="monde-origin-title">How it began</h2>
            <p>
              Christopher Helene and NFRMT met at Your Shot in Sydney in 2025.
              A shared Mauritian background, friendship and interest in
              electronic music quickly developed into a broader creative
              partnership.
            </p>
            <p>
              As Monde Soniq evolved, Studio KRiX became involved behind the
              scenes, helping support the practical systems and organisation
              surrounding the platform while NFRMT continued to lead its
              musical identity and event curation.
            </p>
          </div>
        </div>
      </section>

      <section
        className="monde-page-section monde-principles"
        aria-labelledby="monde-principles-title"
      >
        <div className="site-container">
          <div className="directory-heading">
            <div>
              <p className="section-label">Working together</p>
              <h2 id="monde-principles-title">Collaboration principles</h2>
            </div>
          </div>
          <div className="monde-principles__grid">
            {principles.map((principle, index) => (
              <article className="monde-principle" key={principle.title}>
                <span aria-hidden="true">0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="monde-page-section monde-highlights"
        aria-labelledby="monde-highlights-title"
      >
        <div className="site-container">
          <div className="directory-heading">
            <div>
              <p className="section-label">Platform highlights</p>
              <h2 id="monde-highlights-title">A shared musical ecosystem</h2>
            </div>
            <p>
              Music and community remain at the centre, supported by practical
              structure behind the scenes.
            </p>
          </div>
          <div className="monde-highlights__grid">
            {highlights.map((highlight) => (
              <article className="monde-highlight" key={highlight.title}>
                <p>{highlight.label}</p>
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {mondeSoniqAssets.length > 0 ? (
        <section
          className="monde-page-section monde-media"
          aria-labelledby="monde-media-title"
        >
          <div className="site-container">
            <div className="directory-heading">
              <div>
                <p className="section-label">Approved media</p>
                <h2 id="monde-media-title">From the platform</h2>
              </div>
            </div>
            <div className="monde-media__grid">
              {mondeSoniqAssets.map((asset) => (
                <figure className="monde-media__asset" key={asset.id}>
                  <Image
                    alt={asset.alt}
                    height={asset.height}
                    sizes="(max-width: 680px) 100vw, 50vw"
                    src={asset.src}
                    width={asset.width}
                  />
                  <figcaption>{asset.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section
        className="monde-page-section monde-links"
        aria-labelledby="monde-links-title"
      >
        <div className="site-container monde-links__panel">
          <div>
            <p className="section-label">Links and contact</p>
            <h2 id="monde-links-title">Continue exploring.</h2>
            <p>
              Explore Studio KRiX music and projects, or get in touch about the
              technical and creative work behind the collaboration.
            </p>
          </div>
          <div className="monde-links__actions">
            <ButtonLink href="/music">Explore Music</ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              View Studio KRiX Projects
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact Studio KRiX
            </ButtonLink>
          </div>
        </div>
      </section>

      <section
        className="monde-page-section monde-related"
        aria-labelledby="monde-related-title"
      >
        <div className="site-container">
          <div className="directory-heading">
            <div>
              <p className="section-label">More Studio KRiX work</p>
              <h2 id="monde-related-title">Related projects</h2>
            </div>
          </div>
          <div className="monde-related__grid">
            <Link className="monde-related__project" href="/ohmxact">
              <span>Software · iPhone and iPad</span>
              <h3>OhmXact</h3>
              <p>
                A practical resistor calculation app for the workshop, the
                bench and your pocket.
              </p>
              <ArrowRightIcon />
            </Link>
            <Link className="monde-related__project" href="/">
              <span>Web · Next.js and TypeScript</span>
              <h3>Studio KRiX Website</h3>
              <p>
                A responsive portfolio and creative platform connecting
                technology, engineering and music.
              </p>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
    </>
  );
}
