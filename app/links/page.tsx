import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { LinkIcon } from "@/components/link-icons";
import { siteConfig } from "@/config/site";
import {
  getLinksByCategory,
  type LinksHubItem,
} from "@/data/links";
import { createMetadata } from "@/lib/metadata";

const title = "KRiX Links | Studio KRiX";
const description =
  "Official links for KRiX, Studio KRiX, OhmXact, music, social platforms and contact.";

const baseMetadata = createMetadata({
  title,
  description,
  path: "/links",
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    absolute: title,
  },
};

type HubLinkProps = {
  item: LinksHubItem;
  variant?: "featured" | "compact" | "contact";
};

function HubLink({ item, variant = "compact" }: HubLinkProps) {
  const className = `hub-link hub-link--${variant}`;
  const content = (
    <>
      <span className="hub-link__icon">
        <LinkIcon name={item.icon} />
      </span>
      <span className="hub-link__copy">
        <span className="hub-link__title">{item.title}</span>
        {item.description ? (
          <span className="hub-link__description">{item.description}</span>
        ) : null}
      </span>
      {item.external ? (
        <ArrowUpRightIcon className="hub-link__arrow" />
      ) : (
        <ArrowRightIcon className="hub-link__arrow" />
      )}
      {item.external ? (
        <span className="sr-only">(opens in a new tab)</span>
      ) : null}
    </>
  );

  if (item.href.startsWith("/")) {
    return (
      <Link className={className} href={item.href}>
        {content}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={item.href}
      rel={item.external ? "noreferrer" : undefined}
      target={item.external ? "_blank" : undefined}
    >
      {content}
    </a>
  );
}

const featuredLinks = getLinksByCategory("featured");
const socialLinks = getLinksByCategory("social");
const musicLinks = getLinksByCategory("music");
const trackLinks = getLinksByCategory("track");
const contactLinks = getLinksByCategory("contact");

export default function LinksPage() {
  return (
    <div className="links-hub">
      <section className="links-profile">
        <div className="links-container">
          <h1>KRiX</h1>
          <p className="links-profile__description">
            Software, automotive technology and music by Christopher Helene.
          </p>
          <p className="links-profile__location">{siteConfig.location}</p>
          <Link className="links-profile__home" href="/">
            Studio KRiX home
            <ArrowRightIcon />
          </Link>
        </div>
      </section>

      <div className="links-container links-directory">
        <section className="links-section" aria-labelledby="featured-links">
          <h2 id="featured-links">Featured</h2>
          <div className="links-grid links-grid--featured">
            {featuredLinks.map((item) => (
              <HubLink item={item} key={item.href} variant="featured" />
            ))}
          </div>
        </section>

        <section className="links-section" aria-labelledby="social-links">
          <h2 id="social-links">Social</h2>
          <div className="links-grid links-grid--social">
            {socialLinks.map((item) => (
              <HubLink item={item} key={item.href} />
            ))}
          </div>
        </section>

        <section className="links-section" aria-labelledby="music-links">
          <h2 id="music-links">Music</h2>
          <div className="links-grid links-grid--music">
            {musicLinks.map((item) => (
              <HubLink item={item} key={item.href} />
            ))}
          </div>

          <div className="released-track" aria-labelledby="released-track-title">
            <p>Released track</p>
            <h3 id="released-track-title">{trackLinks[0]?.badge}</h3>
            <div className="released-track__links">
              {trackLinks.map((item) => (
                <HubLink item={item} key={item.href} />
              ))}
            </div>
          </div>
        </section>

        <section className="links-section links-section--contact" aria-labelledby="contact-links">
          <h2 id="contact-links">Contact</h2>
          <div className="links-grid links-grid--contact">
            {contactLinks.map((item) => (
              <HubLink item={item} key={item.href} variant="contact" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
