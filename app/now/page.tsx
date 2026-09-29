import type { Metadata } from "next";
import Link from "next/link";
import { driftGlassRelease } from "@/data/music";
import { mondeSoniqUpdates } from "@/data/monde-soniq";
import { createMetadata } from "@/lib/metadata";
import styles from "./now.module.css";

export const revalidate = 900;

export const metadata: Metadata = createMetadata({
  title: "Now",
  description:
    "A small live snapshot of what Studio KRiX is releasing, building and publishing now.",
  path: "/now",
});

export default function NowPage() {
  const now = Date.now();
  const driftGlassReleased =
    now >= new Date(driftGlassRelease.releaseAt).getTime();
  const nextMondeSoniq =
    mondeSoniqUpdates.find(
      (item) => new Date(item.date + "T23:59:59+10:00").getTime() >= now,
    ) ?? mondeSoniqUpdates.at(-1);

  const items = [
    {
      index: "01",
      discipline: "Music",
      title: driftGlassReleased
        ? "Drift Glass is out."
        : "Drift Glass lands 2 October.",
      body: driftGlassReleased
        ? "The latest KRiX single is now in release mode, with listening destinations collected on the Music page."
        : "The next KRiX single arrives at 3:00 PM Sydney time. Bandcamp pre-order is open now.",
      href: "/music",
      link: driftGlassReleased ? "Listen / explore" : "See the release",
    },
    {
      index: "02",
      discipline: "Photography",
      title: "The portfolio is growing again.",
      body: "The Emma Corsa archive now sits beside a publishing system for new Studio KRiX galleries, with private client delivery behind the scenes.",
      href: "/photography",
      link: "Explore Photography",
    },
    {
      index: "03",
      discipline: "Development",
      title: "OhmXact is shipping across Apple platforms.",
      body: "OhmXact 2.0.3 is represented across iPhone, iPad and Mac, with the Apple Watch companion alongside the main app.",
      href: "/ohmxact",
      link: "Open OhmXact",
    },
    {
      index: "04",
      discipline: "Collaboration",
      title: nextMondeSoniq
        ? `Monde Soniq · ${nextMondeSoniq.dateLabel}`
        : "Monde Soniq is active.",
      body: nextMondeSoniq
        ? `${nextMondeSoniq.title} at ${nextMondeSoniq.venue}. The Studio KRiX case study tracks the practical infrastructure around the collaboration.`
        : "Studio KRiX continues to support Monde Soniq behind the scenes across practical, digital and creative infrastructure.",
      href: "/projects/monde-soniq",
      link: "Explore Monde Soniq",
    },
  ] as const;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p>Studio KRiX / Now</p>
        <h1>What&apos;s moving.</h1>
        <div>
          <p>
            A small live snapshot of releases, builds and collaborations.
            Not a blog. Not a content treadmill. Just what is actually active.
          </p>
          <span>Updated as the work changes.</span>
        </div>
      </section>

      <section className={styles.list} aria-label="Current Studio KRiX activity">
        {items.map((item) => (
          <article key={item.title}>
            <div className={styles.meta}>
              <span>{item.index}</span>
              <p>{item.discipline}</p>
            </div>
            <div className={styles.copy}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
            <Link href={item.href}>{item.link} ↗</Link>
          </article>
        ))}
      </section>
    </div>
  );
}
