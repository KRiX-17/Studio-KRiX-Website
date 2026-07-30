import { ArrowUpRightIcon } from "@/components/icons";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Contact Studio KRiX about software, engineering and creative work.",
  path: "/contact",
});

const socialPlaceholders = ["GitHub", "LinkedIn", "Instagram", "YouTube"];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        align="wide"
        description="For collaborations, business enquiries or a thoughtful introduction, email is the best place to begin."
        title="Start with a good conversation."
      />
      <section className="contact-main">
        <div className="site-container contact-main__grid">
          <Reveal className="contact-email">
            <p className="section-label">Email</p>
            <a href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
              <ArrowUpRightIcon />
            </a>
          </Reveal>
          <Reveal className="contact-notes" delay={0.08}>
            <div>
              <span>Location</span>
              <p>{siteConfig.location}</p>
            </div>
            <div>
              <span>A useful first note</span>
              <p>
                A little context about you, what you are working on, and what
                you would like to discuss.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="social-section">
        <div className="site-container">
          <div className="section-rule">
            <span>Elsewhere</span>
            <span>Links will be added when ready</span>
          </div>
          <div className="social-placeholder-list">
            {socialPlaceholders.map((platform, index) => (
              <div className="social-placeholder" key={platform}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{platform}</p>
                <span>Coming later</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
