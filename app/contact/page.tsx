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
        description="For professional enquiries, creative collaborations, product support or a thoughtful introduction."
        title="Get in touch."
      />
      <section className="contact-main">
        <div className="site-container contact-main__grid">
          <Reveal className="contact-email">
            <p className="section-label">General contact</p>
            <a href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
              <ArrowUpRightIcon />
            </a>
          </Reveal>
          <Reveal className="contact-email" delay={0.08}>
            <p className="section-label">Application and product support</p>
            <a href={`mailto:${siteConfig.supportEmail}`}>
              {siteConfig.supportEmail}
              <ArrowUpRightIcon />
            </a>
          </Reveal>
          <Reveal className="contact-notes" delay={0.12}>
            <div>
              <span>Location</span>
              <p>{siteConfig.location}</p>
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
