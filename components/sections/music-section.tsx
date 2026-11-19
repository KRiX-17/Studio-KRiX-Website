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
import { artistLiveEvents, type ArtistLiveEvent } from "@/data/live-events";
import { groupArtistEvents } from "@/lib/artist-events";
import { driftGlassRelease, releaseTimeline } from "@/data/music";
import { mondeSoniqAnniversary, mondeSoniqEvents } from "@/data/monde-soniq";

const musicServices = getMusicServiceLinks();
const trackLinks = getLinksByCategory("track");
const socialLinks = getLinksByCategory("social").filter(
  (item) => item.title === "Instagram" || item.title === "TikTok" || item.title === "Resident Advisor",
);


function ExternalLabel() {
  return <span className="sr-only">(opens in a new tab)</span>;
}

function LiveEventArtwork({ event }: { event: ArtistLiveEvent }) {
  return (
    <div className="music-live-event__artwork">
      {event.artwork ? (
        <Image
          alt={event.artwork.alt}
          height={event.artwork.height}
          sizes="(max-width: 680px) calc(100vw - 3rem), (max-width: 1080px) 44vw, 29vw"
          src={event.artwork.src}
          width={event.artwork.width}
        />
      ) : (
        <div className="music-live-event__typographic" aria-hidden="true">
          <span>KRiX / LIVE</span>
          <strong>{event.title}</strong>
        </div>
      )}
      <span>{event.dateLabel}</span>
    </div>
  );
}

function LiveEventCard({ event }: { event: ArtistLiveEvent }) {
  const content = (
    <>
      <LiveEventArtwork event={event} />
      <div className="music-live-event__content">
        <p className="music-live-event__role">{event.role}</p>
        <h3>{event.title}</h3>
        <p className="music-live-event__venue">
          {event.venue}
          {event.venueDetail ? ` · ${event.venueDetail}` : null}
          {event.timeLabel ? ` · ${event.timeLabel}` : null}
        </p>
        <p>{event.summary}</p>
        <ul aria-label={`${event.title} music styles`}>
          {event.genres.map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
        {event.sourceUrl && event.sourceLabel ? (
          <span className="music-live-event__source">
            <span>{event.sourceLabel}</span>
            <ArrowUpRightIcon />
            <ExternalLabel />
          </span>
        ) : null}
      </div>
    </>
  );

  return (
    <article className="music-live-event">
      {event.sourceUrl ? (
        <a
          aria-label={`${event.title}: ${event.sourceLabel ?? "View event source"} (opens in a new tab)`}
          className="music-live-event__tile"
          href={event.sourceUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {content}
        </a>
      ) : (
        <div className="music-live-event__tile music-live-event__tile--static">
          {content}
        </div>
      )}
    </article>
  );
}

export function MusicSection({ nowIso }: { nowIso: string }) {
  const { upcoming, past } = groupArtistEvents(artistLiveEvents, new Date(nowIso));
  const anniversaryUpcoming = upcoming.some(
    (event) => event.id === "monde-soniq-one-year-2026",
  );
  const driftGlassReleased = true;
  const spotify = musicServices.find((item) => item.title === "Spotify");
  const appleMusic = musicServices.find((item) => item.title === "Apple Music");

  return (
    <>
      {anniversaryUpcoming ? (
      <section className="music-gig" aria-labelledby="music-gig-title">
        <Reveal className="site-container music-gig__panel">
          <div className="music-gig__content">
            <p className="section-label">
              Live appearance · 20 November 2026
            </p>
            <h2 id="music-gig-title">KRiX B2B NFRMT</h2>
            <p className="music-gig__event">Monde Soniq: One Year</p>
            <p>
              Six pairings across six hours, celebrating one year of Monde
              Soniq at The Abercrombie in Chippendale. From techno and breaks
              to bass, jungle and beyond.
            </p>
            <p className="music-gig__date">
              Friday 20 November · 10 pm – 4 am AEDT · The Abercrombie, Sydney
            </p>
            <div className="music-gig__actions">
              <ButtonLink href={mondeSoniqAnniversary.ticketUrl} external>
                Get tickets
              </ButtonLink>
              <ButtonLink href="/mondesoniq" variant="secondary">
                Event and lineup
              </ButtonLink>
              <ButtonLink href="https://ra.co/events/2569336" external variant="secondary">
                Resident Advisor event
              </ButtonLink>
            </div>
          </div>
          <div className="music-gig__artwork">
            <Image
              alt={mondeSoniqAnniversary.artworkAlt}
              height={mondeSoniqAnniversary.imageHeight}
              priority
              sizes="(max-width: 900px) calc(100vw - 3rem), 42vw"
              src={mondeSoniqAnniversary.artwork}
              width={mondeSoniqAnniversary.imageWidth}
            />
          </div>
        </Reveal>
      </section>
      ) : null}

      <section
        className="music-live-archive"
        aria-labelledby="music-live-archive-title"
      >
        <Reveal className="site-container">
          <div className="directory-heading">
            <div>
              <p className="section-label">KRiX / Live</p>
              <h2 id="music-live-archive-title">Shows &amp; appearances</h2>
            </div>
            <p>Upcoming dates and previous Sydney performances, with original
              event artwork and promoter links.</p>
          </div>

          <section className="music-live-archive__group" aria-labelledby="music-upcoming-events">
            <div className="music-live-archive__group-heading">
              <h3 id="music-upcoming-events">Upcoming shows</h3>
              <p>Automatically updated as event dates pass.</p>
            </div>
            {upcoming.length ? (
              <div className="music-live-archive__grid">
                {upcoming.map((event) => (
                  <LiveEventCard event={event} key={event.id} />
                ))}
              </div>
            ) : (
              <div className="music-live-archive__empty">
                <p>No newly announced dates yet. Follow KRiX on Resident Advisor for event updates.</p>
                <ButtonLink href="https://ra.co/dj/krix" external variant="secondary">
                  Resident Advisor profile
                </ButtonLink>
              </div>
            )}
          </section>

          <section className="music-live-archive__group" aria-labelledby="music-past-events">
            <div className="music-live-archive__group-heading">
              <h3 id="music-past-events">Past performances</h3>
              <p>A growing archive of real shows and event artwork.</p>
            </div>
            <div className="music-live-archive__grid">
              {past.map((event) => (
                <LiveEventCard event={event} key={event.id} />
              ))}
            </div>
          </section>
          <div className="music-live-archive__private">
            <p className="section-label">Private bookings</p>
            <p>
              Additional private events across Sydney are kept off the public
              archive. Club, festival, support-slot and private-event enquiries
              are welcome.
            </p>
            <ButtonLink href="/book-krix" variant="secondary">
              Book KRiX
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      <section className="music-release">
        <Reveal className="site-container music-release__panel">
          <div className="music-release__artwork">
            <Image
              alt="Drift Glass by KRiX cover artwork"
              height={1800}
              sizes="(max-width: 960px) calc(100vw - 3rem), (max-width: 1400px) 40vw, 450px"
              src={driftGlassRelease.artwork}
              width={1800}
            />
          </div>
          <div className="music-release__content">
            <p className="section-label">
              {driftGlassReleased ? "Latest single" : "Upcoming single"}
            </p>
            <h2>{driftGlassRelease.title}</h2>
            <p>
              {driftGlassReleased
                ? `Released ${driftGlassRelease.dateLabel}. Open KRiX on your preferred platform or head to Bandcamp.`
                : `Coming ${driftGlassRelease.dateLabel} at ${driftGlassRelease.timeLabel}. Pre-order now on Bandcamp, with the full streaming release landing on release day.`}
            </p>
            <div className="music-release__actions">
              {driftGlassReleased ? (
                <>
                  {spotify ? (
                    <a
                      className="music-action music-action--primary"
                      href={spotify.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>Open KRiX on Spotify</span>
                      <ArrowUpRightIcon />
                      <ExternalLabel />
                    </a>
                  ) : null}
                  {appleMusic ? (
                    <a
                      className="music-action"
                      href={appleMusic.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>Open KRiX on Apple Music</span>
                      <ArrowUpRightIcon />
                      <ExternalLabel />
                    </a>
                  ) : null}
                  <a
                    className="music-action"
                    href={driftGlassRelease.bandcampHref}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>Bandcamp</span>
                    <ArrowUpRightIcon />
                    <ExternalLabel />
                  </a>
                </>
              ) : (
                <a
                  className="music-action music-action--primary"
                  href={driftGlassRelease.bandcampHref}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Pre-order on Bandcamp</span>
                  <ArrowUpRightIcon />
                  <ExternalLabel />
                </a>
              )}
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

      <section className="music-discography" aria-labelledby="music-discography-title">
        <Reveal className="site-container">
          <div className="directory-heading">
            <div>
              <p className="section-label">Release timeline</p>
              <h2 id="music-discography-title">KRiX releases</h2>
            </div>
            <p>A compact record of released and scheduled music.</p>
          </div>
          <div className="music-discography__list">
            {releaseTimeline.map((release, index) => (
              <article key={release.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{release.type} · {release.dateLabel}</p>
                  <h3>{release.title}</h3>
                </div>
                <strong>{release.status}</strong>
              </article>
            ))}
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
              KRiX is the Sydney-based DJ and electronic music identity of
              Christopher Helene, exploring drum & bass, bass music, Latin and
              tribal rhythms, and energetic club sounds.
            </p>
            <div className="music-gig__actions">
              <ButtonLink href="https://ra.co/dj/krix" external>
                View KRiX on Resident Advisor
              </ButtonLink>
              <ButtonLink href="/book-krix" variant="secondary">
                Booking / EPK
              </ButtonLink>
              <ButtonLink href="/about" variant="text">
                About Studio KRiX
              </ButtonLink>
            </div>
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
            <ButtonLink href="/mondesoniq" variant="secondary">
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
