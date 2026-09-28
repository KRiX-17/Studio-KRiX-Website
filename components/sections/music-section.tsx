import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { ArrowUpRightIcon } from "@/components/icons";
import { LinkIcon } from "@/components/link-icons";
import { MondeSoniqLogo } from "@/components/monde-soniq-logo";
import { Reveal } from "@/components/reveal";
import {
  getLinksByCategory,
  getMusicServiceLinks,
} from "@/data/links";
import { mondeSoniqEvents } from "@/data/monde-soniq";

const musicServices = getMusicServiceLinks();
const trackLinks = getLinksByCategory("track");
const socialLinks = getLinksByCategory("social").filter(
  (item) => item.title === "Instagram" || item.title === "TikTok",
);
const driftGlassPreorderHref = "https://krix17.bandcamp.com";

function ExternalLabel() {
  return <span className="sr-only">(opens in a new tab)</span>;
}

export function MusicSection() {
  return (
    <>
      <section className="music-release">
        <Reveal className="site-container music-release__panel">
          <div className="music-release__artwork">
            <Image
              alt="Drift Glass by KRiX cover artwork"
              height={1800}
              sizes="(max-width: 960px) calc(100vw - 3rem), (max-width: 1400px) 40vw, 450px"
              src="/images/music/drift-glass-cover.webp"
              width={1800}
            />
          </div>
          <div className="music-release__content">
            <p className="section-label">Upcoming single</p>
            <h2>Drift Glass</h2>
            <p>
              Coming 2 October 2026 at 3:00 PM Sydney time. Pre-order now on
              Bandcamp, with the full streaming release landing on release day.
            </p>
            <div className="music-release__actions">
              <a
                className="music-action music-action--primary"
                href={driftGlassPreorderHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Pre-order on Bandcamp</span>
                <ArrowUpRightIcon />
                <ExternalLabel />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="music-platforms">
        <Reveal className="site-container">
          <div className="directory-heading">
            <div>
              <p className="section-label">Official destinations</p>
              <h2>Artist platforms</h2>
            </div>
            <p>Choose the service you already use.</p>
          </div>
          <div className="music-services">
            {musicServices.map((item) => (
              <a
                className="music-service"
                href={item.href}
                key={item.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <LinkIcon name={item.icon} />
                <span>{item.title}</span>
                <ArrowUpRightIcon />
                <ExternalLabel />
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="selected-tracks">
        <Reveal className="site-container">
          <div className="section-rule">
            <span>Selected track</span>
            <span>KRiX</span>
          </div>
          <div className="selected-track">
            <div>
              <p>01</p>
              <h2>Keep Walking Your Path</h2>
            </div>
            <div className="selected-track__links">
              {trackLinks.map((item) => (
                <a
                  href={item.href}
                  key={item.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <LinkIcon name={item.icon} />
                  <span>{item.title}</span>
                  <ArrowUpRightIcon />
                  <ExternalLabel />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="artist-profile">
        <Reveal className="site-container artist-profile__grid">
          <div>
            <p className="section-label">Artist profile</p>
            <h2>KRiX</h2>
          </div>
          <div>
            <p>
              KRiX is the electronic music identity of Christopher Helene.
              The work explores atmosphere, rhythm and emotion as part of the
              wider Studio KRiX creative practice.
            </p>
            <ButtonLink href="/about" variant="text">
              About Christopher and Studio KRiX
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      <section
        className="music-collaboration"
        aria-labelledby="music-collaboration-title"
      >
        <Reveal className="site-container music-collaboration__panel">
          <div className="music-collaboration__identity">
            <p className="section-label">Creative collaboration</p>
            <div className="music-collaboration__artwork">
              <MondeSoniqLogo
                className="music-collaboration__logo"
                sizes="(max-width: 680px) 128px, 144px"
              />
              <Image
                alt={mondeSoniqEvents[2].alt}
                className="music-collaboration__poster"
                height={mondeSoniqEvents[2].height}
                sizes="150px"
                src={mondeSoniqEvents[2].src}
                unoptimized
                width={mondeSoniqEvents[2].width}
              />
            </div>
          </div>
          <div>
            <h2 id="music-collaboration-title">Beyond the studio</h2>
            <p>
              Studio KRiX also supports Monde Soniq, an independent Sydney
              electronic-music platform led by NFRMT. The collaboration
              connects music, events and the systems required to keep creative
              projects moving.
            </p>
            <ButtonLink href="/projects/monde-soniq" variant="secondary">
              Explore Monde Soniq
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      <section className="music-connect">
        <Reveal className="site-container">
          <div className="directory-heading">
            <div>
              <p className="section-label">Elsewhere</p>
              <h2>Follow and connect</h2>
            </div>
          </div>
          <div className="music-connect__grid">
            {socialLinks.map((item) => (
              <a
                className="music-connect__link"
                href={item.href}
                key={item.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <LinkIcon name={item.icon} />
                <span>{item.title}</span>
                <ArrowUpRightIcon />
                <ExternalLabel />
              </a>
            ))}
            <ButtonLink className="music-connect__contact" href="/contact">
              Contact Studio KRiX
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
