import type { Metadata } from "next";
import Link from "next/link";
import styles from "./photography.module.css";

export const metadata: Metadata = {
  title: "Photography — Under Construction",
  description:
    "Studio KRiX Photography is currently being rebuilt. New fashion, portrait, event and creative work is coming soon.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PhotographyPage() {
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
