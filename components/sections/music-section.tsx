import { ButtonLink } from "@/components/button-link";
import { ArrowUpRightIcon } from "@/components/icons";
import { LinkIcon } from "@/components/link-icons";
import {
  getLinksByCategory,
  getMusicServiceLinks,
} from "@/data/links";

const musicServices = getMusicServiceLinks();
const trackLinks = getLinksByCategory("track");
const socialLinks = getLinksByCategory("social").filter(
  (item) => item.title === "Instagram" || item.title === "TikTok",
);

function ExternalLabel() {
  return <span className="sr-only">(opens in a new tab)</span>;
}

export function MusicSection() {
  return (
    <>
      <section className="music-release">
        <div className="site-container music-release__panel">
          <div>
            <p className="section-label">Featured release</p>
            <h2>Keep Walking Your Path</h2>
            <p>
              The current KRiX release, available through the official
              listening links below.
            </p>
          </div>
          <div className="music-release__actions">
            {trackLinks.map((item, index) => (
              <a
                className={`music-action ${index === 0 ? "music-action--primary" : ""}`}
                href={item.href}
                key={item.href}
                rel="noreferrer"
                target="_blank"
              >
                <LinkIcon name={item.icon} />
                <span>Listen on {item.title}</span>
                <ArrowUpRightIcon />
                <ExternalLabel />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="music-platforms">
        <div className="site-container">
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
                rel="noreferrer"
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
      </section>

      <section className="selected-tracks">
        <div className="site-container">
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
                  rel="noreferrer"
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
        </div>
      </section>

      <section className="artist-profile">
        <div className="site-container artist-profile__grid">
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
        </div>
      </section>

      <section
        className="music-collaboration"
        aria-labelledby="music-collaboration-title"
      >
        <div className="site-container music-collaboration__panel">
          <p className="section-label">Creative collaboration</p>
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
        </div>
      </section>

      <section className="music-connect">
        <div className="site-container">
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
                rel="noreferrer"
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
        </div>
      </section>
    </>
  );
}
