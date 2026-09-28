import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./development.module.css";

export const metadata: Metadata = {
  title: "Development",
  alternates: { canonical: "/development" },
  description: "Apps, tools, connected systems and software projects by Studio KRiX.",
  openGraph: {
    images: [{
      url: "/images/connected-systems/network-rack-concept.webp",
      width: 1672,
      height: 940,
      alt: "Studio KRiX connected systems concept infrastructure",
    }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/connected-systems/network-rack-concept.webp"],
  },
};

const systems = [
  {
    index: "03",
    eyebrow: "Systems",
    title: "Connected Systems",
    body: "Networks, security, automation and software considered as one practical environment.",
    href: "/connected-systems",
  },
  {
    index: "04",
    eyebrow: "Automation",
    title: "Home Automation",
    body: "Local-first automation concepts built around reliability, clear control and useful integrations.",
    href: "/connected-systems/home-automation",
  },
  {
    index: "05",
    eyebrow: "Exploration",
    title: "Local AI",
    body: "Private local model infrastructure, retrieval and guarded intelligence layers for practical systems.",
    href: "/connected-systems/local-ai",
  },
  {
    index: "06",
    eyebrow: "Case study",
    title: "Monde Soniq",
    body: "Operational, digital and creative infrastructure supporting an independent Sydney music platform.",
    href: "/projects/monde-soniq",
  },
  {
    index: "07",
    eyebrow: "Platform",
    title: "Studio KRiX Website",
    body: "The portfolio, publishing, private-gallery and product platform you are using right now.",
    href: "/projects",
  },
] as const;

const principles = [
  ["01", "Useful", "Solve a real problem before adding decoration."],
  ["02", "Precise", "Interfaces should feel deliberate, fast and dependable."],
  ["03", "Accessible", "Good tools should not make people fight the interface."],
] as const;

export default function DevelopmentPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.status}>
          <span />
          Studio KRiX / Development
        </div>
        <h1>Tools for real life.</h1>
        <div className={styles.heroFoot}>
          <p>
            Apps, practical software and experiments built around useful problems,
            clean interfaces and systems that hold up outside a mock-up.
          </p>
          <span>BUILD / TEST / SHIP</span>
        </div>
      </section>

      <section className={styles.projects} aria-labelledby="development-projects">
        <div className={styles.heading}>
          <p>Selected products</p>
          <h2 id="development-projects">Current builds.</h2>
        </div>

        <div className={styles.projectGrid}>
          <Link className={styles.ohmxact} href="/ohmxact">
            <div className={styles.cardTop}>
              <span>01 / Available</span>
              <strong>OhmXact ↗</strong>
            </div>
            <div className={styles.device}>
              <Image
                src="/images/ohmxact/home.webp"
                alt="OhmXact home screen on iPhone"
                width={1284}
                height={2778}
                sizes="(max-width: 760px) 60vw, 24rem"
              />
            </div>
            <div className={styles.cardCopy}>
              <h3>Electrical calculation tools.</h3>
              <p>
                Resistor, Ohm&apos;s Law and practical electrical tools designed for
                fast use across iPhone, iPad, Mac and Apple Watch.
              </p>
            </div>
          </Link>

          <Link className={styles.lakaz} href="/lakaz">
            <div className={styles.cardTop}>
              <span>02 / In development</span>
              <strong>LaCaz ↗</strong>
            </div>
            <div className={styles.systemGraphic} aria-hidden="true">
              <span>HOME</span>
              <span>TASKS</span>
              <span>MEALS</span>
              <span>SHOPPING</span>
              <i />
            </div>
            <div className={styles.cardCopy}>
              <h3>A household operating layer.</h3>
              <p>
                A calmer way to coordinate tasks, meals, shopping and home systems
                without turning everyday life into another admin job.
              </p>
            </div>
          </Link>
        </div>

        <div className={styles.secondaryHeading}>
          <p>Systems, experiments &amp; infrastructure</p>
          <h2>Work beyond the product cards.</h2>
        </div>
        <div className={styles.secondaryGrid}>
          {systems.map((system) => (
            <Link href={system.href} key={system.title}>
              <span>{system.index} / {system.eyebrow}</span>
              <h3>{system.title}</h3>
              <p>{system.body}</p>
              <strong aria-hidden="true">↗</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.principles}>
        {principles.map(([index, title, body]) => (
          <article key={title}>
            <span>{index}</span>
            <div>
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
