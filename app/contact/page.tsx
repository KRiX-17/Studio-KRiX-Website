import { ButtonLink } from "@/components/button-link";
import { ArrowUpRightIcon } from "@/components/icons";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Contact Studio KRiX about professional opportunities, creative collaboration or OhmXact support.",
  path: "/contact",
});

const contactOptions = [
  {
    title: "General enquiries",
    description: "Questions, introductions and Studio KRiX enquiries.",
    email: siteConfig.email,
  },
  {
    title: "Professional opportunities",
    description: "Recruitment, employment and technical opportunities.",
    email: siteConfig.email,
  },
  {
    title: "Creative collaboration",
    description: "Music, sound and thoughtful creative projects.",
    email: siteConfig.email,
  },
  {
    title: "OhmXact support",
    description: "Application and product support for OhmXact.",
    email: siteConfig.supportEmail,
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageIntro
        align="wide"
        description="Clear contact options for professional opportunities, creative work and product support."
        title="Get in touch."
      />

      <section className="contact-directory">
        <div className="site-container contact-directory__grid">
          {contactOptions.map((option) => (
            <article className="contact-card" key={option.title}>
              <div>
                <h2>{option.title}</h2>
                <p>{option.description}</p>
              </div>
              <a href={`mailto:${option.email}`}>
                <span>{option.email}</span>
                <ArrowUpRightIcon />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-destinations">
        <div className="site-container contact-destinations__grid">
          <div>
            <p className="section-label">Elsewhere</p>
            <h2>Official destinations</h2>
            <p>
              Continue through music, the links hub or Christopher&apos;s
              public professional profiles.
            </p>
          </div>
          <div className="contact-destinations__actions">
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
            <ButtonLink href="/music" variant="secondary">
              Music
            </ButtonLink>
            <ButtonLink href="/links" variant="secondary">
              Links hub
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
