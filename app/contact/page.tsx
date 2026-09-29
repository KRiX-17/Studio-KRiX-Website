import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/config/site";
import { CONTACT_SUBJECTS } from "@/lib/forms/constants";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Contact Studio KRiX about photography, KRiX music, software and development, creative collaborations or general enquiries.",
  path: "/contact",
});

const contactPaths = [
  {
    title: "Photography",
    body: "Portraits, fashion, events, creative concepts and selected commercial work.",
    subject: "Photography enquiry",
  },
  {
    title: "Music / KRiX",
    body: "DJ bookings, collaborations, remixes, releases and music-related enquiries.",
    subject: "Music / KRiX enquiry",
  },
  {
    title: "Development",
    body: "Apps, software, product work, technical systems and Studio KRiX development projects.",
    subject: "Development / software enquiry",
  },
  {
    title: "Other",
    body: "Creative collaborations and anything that does not fit neatly into one discipline.",
    subject: "General enquiry",
  },
] as const;

type ContactPageProps = {
  searchParams: Promise<{ subject?: string | string[] }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const requestedSubject = Array.isArray(params.subject)
    ? params.subject[0]
    : params.subject;
  const defaultSubject = CONTACT_SUBJECTS.includes(
    requestedSubject as (typeof CONTACT_SUBJECTS)[number],
  )
    ? requestedSubject
    : "";

  return (
    <>
      <PageIntro
        align="wide"
        description="Photography, music and development each have their own doorway. Pick the closest fit and the same private form will route the enquiry clearly."
        title="Get in touch."
      />

      <section className="contact-paths" aria-labelledby="contact-paths-title">
        <div className="site-container">
          <div className="directory-heading">
            <div>
              <p className="section-label">Choose a path</p>
              <h2 id="contact-paths-title">What are we talking about?</h2>
            </div>
            <p>Three disciplines, one inbox, less guesswork.</p>
          </div>
          <div className="contact-paths__grid">
            {contactPaths.map((item) => (
              <Link
                href={"/contact?subject=" + encodeURIComponent(item.subject) + "#contact-form"}
                key={item.title}
              >
                <span>{item.title}</span>
                <p>{item.body}</p>
                <strong aria-hidden="true">↘</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="secure-form-section" id="contact-form">
        <div className="site-container secure-form-section__grid">
          <div className="secure-form-section__intro">
            <p className="section-label">Private contact</p>
            <h2>One form, routed with care.</h2>
            <p>
              Use this for Studio KRiX photography, music, development,
              collaboration or general enquiries. Product problems have a
              separate support form with space for technical details.
            </p>
            <ButtonLink href="/support" variant="secondary">
              Go to product support
            </ButtonLink>
          </div>
          <ContactForm
            defaultSubject={defaultSubject}
            key={defaultSubject || "contact"}
            mode="contact"
          />
        </div>
      </section>

      <section className="contact-destinations">
        <div className="site-container contact-destinations__grid">
          <div>
            <p className="section-label">Elsewhere</p>
            <h2>Official destinations</h2>
            <p>
              Continue through KRiX music, Christopher&apos;s professional
              profiles or the wider Studio KRiX links.
            </p>
          </div>
          <div className="contact-destinations__actions">
            <ButtonLink href={siteConfig.linkedIn} external>
              LinkedIn
            </ButtonLink>
            <ButtonLink href={siteConfig.github} variant="secondary" external>
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
