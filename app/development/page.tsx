import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./development.module.css";

export const metadata: Metadata = {
  title: "Development",
  description: "Apps, tools and software projects by Studio KRiX.",
};

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
                src="/images/ohmxact-iphone-dark.png"
                alt="OhmXact on iPhone"
                width={360}
                height={720}
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
