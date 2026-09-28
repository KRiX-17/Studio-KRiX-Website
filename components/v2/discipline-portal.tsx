import Image from "next/image";
import Link from "next/link";
import styles from "./discipline-portal.module.css";

const worlds = [
  {
    index: "01",
    eyebrow: "Fashion · Portraits · Events · Creative",
    title: "Photography",
    href: "/photography",
    className: null,
    image: null,
  },
  {
    index: "02",
    eyebrow: "DJ · Production · Releases · Live",
    title: "KRiX",
    href: "/music",
    className: styles.music,
    image: "/images/monde-soniq/ok-williams.webp",
  },
  {
    index: "03",
    eyebrow: "Apps · Tools · Software · Experiments",
    title: "Development",
    href: "/development",
    className: styles.development,
    image: "/images/ohmxact-iphone-dark.png",
  },
] as const;

export function DisciplinePortal() {
  return (
    <section className={styles.shell} aria-labelledby="studio-krix-v2-title">
      <div className={styles.intro}>
        <p className={styles.kicker}>Studio KRiX</p>
        <h1 id="studio-krix-v2-title">Three disciplines. One studio.</h1>
        <p>
          Photography, music and software. Choose a world and step inside.
        </p>
      </div>

      <div className={styles.grid}>
        {worlds.map((world) => (
          <Link
            className={[styles.card, world.className].filter(Boolean).join(" ")}
            href={world.href}
            key={world.href}
            aria-label={`Explore ${world.title}`}
          >
            {world.image ? (
              <Image
                alt=""
                className={styles.image}
                fill
                priority={world.href === "/music"}
                sizes="(max-width: 760px) 100vw, 34vw"
                src={world.image}
              />
            ) : (
              <div className={styles.photoPlaceholder} aria-hidden="true">
                <span>YOUR NEXT HERO FRAME</span>
              </div>
            )}
            <div className={styles.overlay} />
            <div className={styles.content}>
              <span className={styles.index}>{world.index}</span>
              <div>
                <h2>{world.title}</h2>
                <p>{world.eyebrow}</p>
              </div>
              <span className={styles.enter} aria-hidden="true">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
