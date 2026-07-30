import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
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
            <span>Official links</span>
          </div>
          <Link className="contact-links-directory" href="/links">
            <span>
              <strong>KRiX links</strong>
              <span>Music, social platforms and projects</span>
            </span>
            <ArrowRightIcon />
          </Link>
        </div>
      </section>
    </>
  );
}
