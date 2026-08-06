import { ButtonLink } from "@/components/button-link";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Contact Studio KRiX about professional opportunities, creative collaboration or OhmXact support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        align="wide"
        description="Clear contact options for professional opportunities, creative work and product support."
        title="Get in touch."
      />

      <section className="secure-form-section">
        <div className="site-container secure-form-section__grid">
          <div className="secure-form-section__intro">
            <p className="section-label">Private contact</p>
            <h2>One form, routed with care.</h2>
            <p>
              Use this form for Studio KRiX enquiries, professional
              opportunities and creative collaboration. Product problems have
              a separate support form with space for technical details.
            </p>
            <ButtonLink href="/support" variant="secondary">
              Go to product support
            </ButtonLink>
          </div>
          <ContactForm mode="contact" />
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
