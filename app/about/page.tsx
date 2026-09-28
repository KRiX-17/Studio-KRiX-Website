import type { Metadata } from "next";
import Link from "next/link";
import { linksHubItems } from "@/data/links";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "About Christopher Helene, Studio KRiX and the photography, music and development work behind the studio.",
};

const disciplines = [
  {
    index: "01",
    title: "Photography",
    href: "/photography",
    body: "Fashion, portraits, events and creative image-making, with a focus on expressive lighting and strong finished frames.",
  },
  {
    index: "02",
    title: "KRiX / Music",
    href: "/music",
    body: "DJ sets, electronic music production, releases and collaborations spanning drum & bass, neurofunk and melodic electronic music.",
  },
  {
    index: "03",
    title: "Development",
    href: "/development",
    body: "Apps, practical tools and software experiments, from OhmXact to LaCaz and future Studio KRiX projects.",
  },
] as const;

const socialLinks = linksHubItems.filter(
  (item) => item.category === "social",
);

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Studio KRiX / About Me</p>
        <h1>One studio. Three versions of me.</h1>
        <p className={styles.lead}>
          I&apos;m Christopher Helene, also known as KRiX. Studio KRiX is the
          umbrella for the things I keep coming back to: making images, making
          music and building useful software.
        </p>
      </section>

      <section className={styles.story}>
        <div>
          <p className={styles.kicker}>The thread through it</p>
          <h2>Different tools. Same obsession with making things work.</h2>
        </div>
        <div className={styles.copy}>
          <p>
            My background is deeply practical and technical, from automotive
            electrical work, diagnostics and fabrication through to software,
            networking and systems. Photography and music sit beside that rather
            than outside it. They are all ways of taking an idea, shaping it and
            turning it into something finished.
          </p>
          <p>
            Studio KRiX is intentionally personal. It is not pretending to be a
            giant agency. It is a home for the work I actually make, the tools I
            actually build and the creative projects I genuinely care about.
          </p>
        </div>
      </section>

      <section className={styles.disciplines} aria-label="Studio KRiX disciplines">
        {disciplines.map((discipline) => (
          <Link className={styles.card} href={discipline.href} key={discipline.href}>
            <span>{discipline.index}</span>
            <div>
              <h2>{discipline.title}</h2>
              <p>{discipline.body}</p>
            </div>
            <strong aria-hidden="true">→</strong>
          </Link>
        ))}
      </section>

      <section className={styles.contact}>
        <div>
          <p className={styles.kicker}>Contact + links</p>
          <h2>Find me where the work lives.</h2>
          <p>
            For photography, music, app work or general enquiries, use the
            contact form or jump straight to the platforms below.
          </p>
          <Link className={styles.contactButton} href="/contact">
            Contact Studio KRiX →
          </Link>
        </div>

        <div className={styles.links}>
          {socialLinks.map((item) => (
            <a
              href={item.href}
              key={item.href}
              rel="noreferrer"
              target="_blank"
            >
              <span>{item.title}</span>
              <strong aria-hidden="true">↗</strong>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
