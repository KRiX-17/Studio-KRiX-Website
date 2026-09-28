import type { Metadata } from "next";
import Link from "next/link";
import { getPublicGalleries } from "@/lib/portfolio/public";
import styles from "./photography.module.css";

export const dynamic = "force-dynamic";

const disciplines = [
  ["01", "Portraits", "People first. Natural expression, character and atmosphere."],
  ["02", "Fashion", "Editorial portraits, styling and location-led shoots."],
  ["03", "Events", "Live energy, nightlife and moments that disappear quickly."],
  ["04", "Travel", "Sydney, Mauritius and places seen from ground and air."],
  ["05", "Automotive", "Machines, detail and environments with a technical eye."],
  ["06", "Creative", "Experiments, nature, long exposure and ideas that do not need a box."],
];

export async function generateMetadata(): Promise<Metadata> {
  const galleries = await getPublicGalleries();
  return {
    title: "Photography",
    description:
      "Portrait, fashion, event, travel, automotive and creative photography by Studio KRiX in Sydney.",
    robots: { index: galleries.length > 0, follow: true },
  };
}

export default async function PhotographyPage() {
  const galleries = await getPublicGalleries();

  return (
    <div className={styles.page}>
      <section className={styles.portfolioHero}>
        <p className={styles.status}>Studio KRiX / Photography</p>
        <h1>People, places and moments.</h1>
        <p className={styles.lead}>
          Photography has been part of the Studio KRiX story since 2012, from
          portraits and fashion to events, travel, automotive and experimental work.
        </p>
        <div className={styles.heroActions}>
          <a href="#work">Explore the work ↓</a>
          <Link href="/contact?subject=Photography%20enquiry">Enquire / Book a shoot ↗</Link>
        </div>
      </section>

      {galleries.length > 0 ? (
        <section className={styles.portfolioGrid} id="work">
          {galleries.map((gallery, index) => (
            <Link className={styles.portfolioCard} href={"/photography/" + gallery.slug} key={gallery.id}>
              <div className={styles.portfolioImage}>
                {gallery.cover_url ? (
                  <img alt={gallery.cover_alt} src={gallery.cover_url} />
                ) : (
                  <span>No cover selected</span>
                )}
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className={styles.portfolioMeta}>
                <p>{[gallery.category, gallery.location, gallery.event_date].filter(Boolean).join(" · ")}</p>
                <h2>{gallery.title}</h2>
                <b aria-hidden="true">↗</b>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <section className={styles.archive} id="work">
          <div className={styles.archiveIntro}>
            <p className={styles.status}>Archive / New portfolio developing</p>
            <h2>A wider body of work is coming back online.</h2>
            <p>
              The old Emma Corsa photography archive is being re-curated for Studio KRiX,
              alongside new Sydney work. Rather than rebuilding the old wall of images,
              the strongest photographs will return as focused galleries.
            </p>
          </div>
          <div className={styles.disciplineGrid}>
            {disciplines.map(([number, title, copy]) => (
              <article className={styles.discipline} key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className={styles.booking}>
        <div>
          <p className={styles.status}>Work together</p>
          <h2>Have something worth photographing?</h2>
          <p>
            Portraits, fashion, events, creative concepts and selected commercial projects
            around Sydney.
          </p>
        </div>
        <Link href="/contact?subject=Photography%20enquiry">Enquire / Book a shoot ↗</Link>
      </section>

      <section className={styles.note}>
        <p>New galleries are published directly from the Studio KRiX photography portal.</p>
        <div>
          <Link href="/about">About Me ↗</Link>
          <Link href="/contact">General enquiries ↗</Link>
        </div>
      </section>
    </div>
  );
}
