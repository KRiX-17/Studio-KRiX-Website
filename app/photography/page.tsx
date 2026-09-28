import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublicGalleries } from "@/lib/portfolio/public";
import styles from "./photography.module.css";

export const dynamic = "force-dynamic";

const portraits = [
  { src: "/images/photography/fashion-floral.webp", width: 1144, height: 1800, category: "Fashion", title: "Floral study", alt: "Fashion portrait in a floral outfit against a soft green background" },
  { src: "/images/photography/portrait-butterflies.webp", width: 1200, height: 1800, category: "Portraits", title: "Quiet moment", alt: "Portrait of a woman in a butterfly-print outfit beneath the trees, with the original Emma Corsa watermark" },
] as const;
const leadPortrait = { src: "/images/photography/portrait-garden.webp", width: 1492, height: 1800, alt: "Close portrait in a floral outfit framed by soft greenery, with the original Emma Corsa watermark" } as const;

const places = [
  { src: "/images/photography/beach-from-above.webp", width: 1182, height: 665, category: "Travel", title: "The shore from above", alt: "Aerial view of swimmers and long shadows along a turquoise shoreline, with the original Emma Corsa watermark" },
  { src: "/images/photography/coastline-from-above.webp", width: 1182, height: 665, category: "Travel", title: "Coastal geometry", alt: "Aerial view of a green coastline and bright blue water" },
  { src: "/images/photography/rocky-cove.webp", width: 1182, height: 665, category: "Creative", title: "Between the rocks", alt: "Aerial view of clear water cutting through a rocky coast" },
  { src: "/images/photography/earthwork-from-above.webp", width: 1182, height: 664, category: "Creative", title: "Earthwork", alt: "Aerial photograph of a circular earthwork in a green landscape" },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Photography",
    alternates: { canonical: "/photography" },
    description:
      "Portrait, fashion, event, travel, automotive and creative photography by Studio KRiX in Sydney.",
    robots: { index: true, follow: true },
  };
}

export default async function PhotographyPage() {
  const galleries = await getPublicGalleries();

  return (
    <div className={styles.page}>
      <section className={styles.portfolioHero}>
        <div className={styles.heroCopy}>
          <p className={styles.status}>Studio KRiX / Photography</p>
          <h1>People, places and moments.</h1>
          <p className={styles.lead}>
            Photography has been part of the Studio KRiX story since 2012.
            The work was previously published as Emma Corsa and now returns as a
            considered selection of portraits, fashion and places seen from above.
          </p>
          <div className={styles.heroActions}>
            <a href="#work">Explore the work ↓</a>
            <Link href="/contact?subject=Photography%20enquiry">Enquire / Book a shoot ↗</Link>
          </div>
        </div>
        <figure className={styles.heroPhoto}>
          <Image src={leadPortrait.src} alt={leadPortrait.alt} width={leadPortrait.width} height={leadPortrait.height} sizes="(max-width: 700px) 100vw, 45vw" priority />
          <figcaption>Portraits / Emma Corsa archive</figcaption>
        </figure>
      </section>

      <section className={styles.editorial} id="work" aria-labelledby="people-title">
        <div className={styles.editorialHeading}>
          <p className={styles.status}>01 / Portraits &amp; Fashion</p>
          <h2 id="people-title">A person, a place, a little bit of magic.</h2>
          <p>Natural expression and styling, captured with room for the person to come through.</p>
        </div>
        <div className={styles.portraitGrid}>
          {portraits.map((photo) => (
            <figure key={photo.src}>
              <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 700px) 100vw, 46vw" />
              <figcaption><span>{photo.category}</span>{photo.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.editorial} aria-labelledby="places-title">
        <div className={styles.editorialHeading}>
          <p className={styles.status}>02 / Travel &amp; Creative</p>
          <h2 id="places-title">A different point of view.</h2>
          <p>Coastlines, patterns and the quiet geometry that appears when you step back.</p>
        </div>
        <div className={styles.placeGrid}>
          {places.map((photo) => (
            <figure key={photo.src}>
              <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 700px) 100vw, 46vw" />
              <figcaption><span>{photo.category}</span>{photo.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {galleries.length > 0 && (
        <section className={styles.portfolioGrid} aria-label="More published galleries">
          {galleries.map((gallery, index) => (
            <Link className={styles.portfolioCard} href={"/photography/" + gallery.slug} key={gallery.id}>
              <div className={styles.portfolioImage}>
                {gallery.cover_url ? (
                  <Image alt={gallery.cover_alt || gallery.title} src={gallery.cover_url} fill sizes="(max-width: 700px) 100vw, 46vw" />
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
        <p>Selected work from the Emma Corsa archive, with new Studio KRiX galleries to follow.</p>
        <div>
          <a href="https://500px.com/p/studio_krix" target="_blank" rel="noreferrer">500px ↗</a>
          <a href="https://gurushots.com/studiokrix/photos" target="_blank" rel="noreferrer">GuruShots ↗</a>
          <Link href="/about">About Me ↗</Link>
          <Link href="/contact">General enquiries ↗</Link>
        </div>
      </section>
    </div>
  );
}
