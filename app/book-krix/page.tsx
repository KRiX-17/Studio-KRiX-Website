import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { ContactForm } from "@/components/contact-form";
import { artistLiveEvents } from "@/data/live-events";
import { createMetadata } from "@/lib/metadata";
import styles from "./book-krix.module.css";

export const metadata: Metadata = createMetadata({
  title: "Book KRiX | Sydney DJ & Electronic Press Kit",
  description:
    "Book Sydney DJ and electronic music producer KRiX. Hear releases, explore previous events and send a private booking enquiry.",
  path: "/book-krix",
  image: {
    url: "/images/music/events/monde-soniq-one-year-2026.jpg",
    width: 800,
    height: 1135,
    alt: "KRiX B2B NFRMT on the Monde Soniq anniversary lineup",
  },
});

const highlightedIds = [
  "monde-soniq-one-year-2026",
  "tush-secret-studio-2026",
  "shook-thursdays-feb-2026",
  "your-shot-sydney-2025",
] as const;

const highlights = highlightedIds.flatMap((id) => {
  const event = artistLiveEvents.find((item) => item.id === id);
  return event ? [event] : [];
});

const listeningLinks = [
  {
    title: "SoundCloud",
    url: "https://soundcloud.com/krix17",
    eyebrow: "Music & uploads",
  },
  {
    title: "Spotify",
    url: "https://open.spotify.com/artist/7irl8hhorrxXMgH5ctmWH9",
    eyebrow: "Official releases",
  },
  {
    title: "Resident Advisor",
    url: "https://ra.co/dj/krix",
    eyebrow: "Artist & event profile",
  },
] as const;

export default function BookKrixPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="krix-booking-heading">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>KRiX / DJ bookings / Electronic press kit</p>
          <h1 id="krix-booking-heading">
            Built for the room.
            <span> Driven by the music.</span>
          </h1>
          <p className={styles.lede}>
            KRiX is a Sydney-based DJ and electronic music producer bringing
            bass-driven energy, tribal and Latin rhythms, and atmospheric
            sound design to the dancefloor.
          </p>
          <p className={styles.support}>
            From drum &amp; bass and UK bass to house and Latin Tech, the selection
            evolves with the crowd and the moment. Available for club nights,
            electronic music events, collaborations and selected private bookings.
          </p>
          <div className={styles.actions}>
            <ButtonLink href="#booking-enquiry">Enquire about a booking</ButtonLink>
            <ButtonLink href="https://ra.co/dj/krix" external variant="secondary">
              Resident Advisor
            </ButtonLink>
          </div>
          <p className={styles.location}>Sydney, Australia · Performing as KRiX</p>
        </div>
        <figure className={styles.heroArt}>
          <Image
            alt="Monde Soniq first-anniversary event poster listing KRiX B2B NFRMT at The Abercrombie"
            src="/images/music/events/monde-soniq-one-year-2026.jpg"
            width={800}
            height={1135}
            priority
            sizes="(max-width: 800px) 90vw, 32vw"
          />
          <figcaption>Featured event artwork · 20 November 2026</figcaption>
        </figure>
      </section>

      <section className={styles.section} aria-labelledby="krix-listen-heading">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Listen / Discover</p>
          <h2 id="krix-listen-heading">The sound.</h2>
          <p>
            Explore KRiX&apos;s released music and official artist channels.
            A dedicated public DJ mix will be featured when a verified recording is available.
          </p>
        </div>
        <div className={styles.listenGrid}>
          {listeningLinks.map((link) => (
            <a
              className={styles.listenCard}
              href={link.url}
              key={link.title}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>{link.eyebrow}</span>
              <strong>{link.title}</strong>
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
        </div>
        <p className={styles.listenNote}>
          Selected KRiX releases include <em>Keep Walking Your Path</em> and
          <em> Drift Glass</em>. <Link href="/music">Explore all music →</Link>
        </p>
      </section>

      <section className={styles.section} aria-labelledby="krix-history-heading">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Selected performances</p>
          <h2 id="krix-history-heading">From the booth.</h2>
          <p>Real event artwork and original source listings.</p>
        </div>
        <div className={styles.historyGrid}>
          {highlights.map((event) => {
            const item = (
              <>
                {event.artwork ? (
                  <Image
                    alt={event.artwork.alt}
                    src={event.artwork.src}
                    width={event.artwork.width}
                    height={event.artwork.height}
                    sizes="(max-width: 700px) 43vw, (max-width: 1100px) 22vw, 19vw"
                  />
                ) : null}
                <div>
                  <p>{event.dateLabel}</p>
                  <h3>{event.title}</h3>
                  <span>{event.venue}</span>
                </div>
              </>
            );

            return event.sourceUrl ? (
              <a
                aria-label={`${event.title} event source (opens in a new tab)`}
                className={styles.historyCard}
                href={event.sourceUrl}
                key={event.id}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item}
              </a>
            ) : (
              <div className={styles.historyCard} key={event.id}>{item}</div>
            );
          })}
        </div>
        <ButtonLink href="/music" variant="secondary">Explore the full event archive</ButtonLink>
      </section>

      <section className={styles.booking} id="booking-enquiry" aria-labelledby="krix-enquiry-heading">
        <div className={styles.bookingIntro}>
          <p className={styles.eyebrow}>Enquiries</p>
          <h2 id="krix-enquiry-heading">Bring KRiX to your next event.</h2>
          <p>
            Promoters, venues and collaborators can reach KRiX through the
            secure Studio KRiX enquiry form.
          </p>
          <p>
            Please include the event date, venue, preferred music styles,
            approximate set time and duration, and relevant booking arrangements.
          </p>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/djkrix17" target="_blank" rel="noopener noreferrer">
              Instagram ↗<span className="sr-only">(opens in a new tab)</span>
            </a>
            <a href="https://ra.co/dj/krix" target="_blank" rel="noopener noreferrer">
              Resident Advisor ↗<span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
        <ContactForm mode="contact" defaultSubject="Music / KRiX enquiry" />
      </section>
    </div>
  );
}
