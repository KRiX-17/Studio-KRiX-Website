import type { Metadata } from "next";
import Link from "next/link";
import styles from "./photography.module.css";

export const metadata: Metadata = {
  title: "Photography",
  description:
    "Fashion, portrait, event and creative photography by Studio KRiX in Sydney.",
};

const categories = [
  ["Fashion", "Editorial, studio and fashion-led portrait work."],
  ["Portraits", "People, personality and carefully shaped light."],
  ["Events", "Creative events, industry nights and live moments."],
  ["Creative", "Conceptual, experimental and visual storytelling."],
] as const;

export default function PhotographyPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Studio KRiX / Photography</p>
        <h1>People, light and moments.</h1>
        <p className={styles.lead}>
          Fashion, portraits, events and creative work. The first live galleries
          will be built from real Studio KRiX shoots, beginning with Industry Event 3.
        </p>
      </section>

      <section className={styles.featured} aria-labelledby="featured-work">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>Portfolio</p>
            <h2 id="featured-work">Featured work</h2>
          </div>
          <p>Real galleries will publish here from the private Studio KRiX photo admin.</p>
        </div>

        <div className={styles.placeholderGallery}>
          <article className={styles.heroCard}>
            <div className={styles.frame} aria-hidden="true" />
            <div>
              <p>Coming first</p>
              <h3>Industry Event 3</h3>
              <span>Sydney · Fashion · 2026</span>
            </div>
          </article>

          <div className={styles.categoryGrid}>
            {categories.map(([title, description]) => (
              <article className={styles.categoryCard} key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.adminNote}>
        <div>
          <p className={styles.kicker}>Built to evolve</p>
          <h2>No code required to add a shoot.</h2>
          <p>
            The portfolio admin will let Studio KRiX create a gallery, upload JPGs,
            reorder images, choose a cover, add credits and publish.
          </p>
        </div>
        <Link href="/about">About Studio KRiX →</Link>
      </section>
    </div>
  );
}
