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
        <div className={styles.heroMeta}>
          <p className={styles.kicker}>Studio KRiX / Photography</p>
          <span>Sydney · Australia</span>
        </div>
        <h1>People, light and moments.</h1>
        <div className={styles.heroBottom}>
          <p className={styles.lead}>
            Fashion, portraits, events and creative work by Christopher Helene.
          </p>
          <span className={styles.issue}>Portfolio / 001</span>
        </div>
      </section>

      <section className={styles.featured} aria-labelledby="featured-work">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>Selected work</p>
            <h2 id="featured-work">First frames.</h2>
          </div>
          <p>
            The portfolio is opening with Industry Event 3, photographed in Sydney.
            Final selects will replace these placeholders as the edits are finished.
          </p>
        </div>

        <article className={styles.heroCard}>
          <div className={styles.frame} aria-hidden="true">
            <span>SK / 27.09.26</span>
          </div>
          <div className={styles.heroCardCopy}>
            <p>Fashion / Sydney / 2026</p>
            <h3>Industry Event 3</h3>
            <p>
              A fashion photography industry night at Ted&apos;s World of Imaging,
              built around emerging models, studio direction and new portfolio work.
            </p>
            <span>Gallery coming from the final selects</span>
          </div>
        </article>

        <div className={styles.categoryGrid}>
          {categories.map(([title, description], index) => (
            <article className={styles.categoryCard} key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.endNote}>
        <p className={styles.kicker}>Studio KRiX Photography</p>
        <h2>New work will land here as it is made.</h2>
        <div>
          <Link href="/about">About the photographer ↗</Link>
          <Link href="/contact">Enquiries ↗</Link>
        </div>
      </section>
    </div>
  );
}
