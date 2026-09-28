import type { Metadata } from "next";
import Link from "next/link";
import {
  getPublicGalleries,
} from "@/lib/portfolio/public";
import styles from "./photography.module.css";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const galleries = await getPublicGalleries();
  const live = galleries.length > 0;

  return {
    title: live ? "Photography" : "Photography — Under Construction",
    description: live
      ? "Fashion, portrait, event and creative photography by Studio KRiX in Sydney."
      : "Studio KRiX Photography is currently being rebuilt. New work is coming soon.",
    robots: {
      index: live,
      follow: true,
    },
  };
}

export default async function PhotographyPage() {
  const galleries = await getPublicGalleries();

  if (galleries.length === 0) {
    return (
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.topline}>
            <p>Studio KRiX / Photography</p>
            <span>Sydney · Australia</span>
          </div>

          <div className={styles.main}>
            <p className={styles.status}>Portfolio / Under construction</p>
            <h1>New work is developing.</h1>
            <p className={styles.lead}>
              The Photography side of Studio KRiX is being rebuilt around new
              fashion, portrait, event and creative work. The first galleries are
              currently being edited and curated.
            </p>
          </div>

          <div className={styles.bottom}>
            <div><span>01</span><p>Fashion</p></div>
            <div><span>02</span><p>Portraits</p></div>
            <div><span>03</span><p>Events</p></div>
            <div><span>04</span><p>Creative</p></div>
          </div>
        </section>

        <section className={styles.note}>
          <p>
            The first Studio KRiX photography galleries will go live once the
            current selects are finished.
          </p>
          <div>
            <Link href="/">← Studio KRiX</Link>
            <Link href="/about">About Me ↗</Link>
            <Link href="/contact">Enquiries ↗</Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <section className={styles.portfolioHero}>
        <p className={styles.status}>Studio KRiX / Photography</p>
        <h1>People, light and moments.</h1>
        <p className={styles.lead}>
          Fashion, portraits, events and creative work by Christopher Helene.
        </p>
      </section>

      <section className={styles.portfolioGrid}>
        {galleries.map((gallery, index) => (
          <Link
            className={styles.portfolioCard}
            href={"/photography/" + gallery.slug}
            key={gallery.id}
          >
            <div className={styles.portfolioImage}>
              {gallery.cover_url ? (
                <img alt={gallery.cover_alt} src={gallery.cover_url} />
              ) : (
                <span>No cover selected</span>
              )}
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className={styles.portfolioMeta}>
              <p>
                {[gallery.category, gallery.location, gallery.event_date]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <h2>{gallery.title}</h2>
              <b aria-hidden="true">↗</b>
            </div>
          </Link>
        ))}
      </section>

      <section className={styles.note}>
        <p>New work lands here when it is published from the Studio KRiX admin.</p>
        <div>
          <Link href="/about">About Me ↗</Link>
          <Link href="/contact">Enquiries ↗</Link>
        </div>
      </section>
    </div>
  );
}
