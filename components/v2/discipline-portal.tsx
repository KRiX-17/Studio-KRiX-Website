import Image from "next/image";
import Link from "next/link";
import styles from "./discipline-portal.module.css";

export function DisciplinePortal() {
  const worlds = [
    {
      index: "01",
      eyebrow: "Fashion · Portraits · Events · Creative",
      title: "Photography",
      href: "/photography",
      className: styles.photography,
      image: "/images/photography/portrait-garden.webp",
    },
    {
      index: "02",
      eyebrow: "DJ · Production · Releases · Live",
      title: "KRiX",
      href: "/music",
      className: styles.music,
      image: "/images/music/drift-glass-cover.webp",
    },
    {
      index: "03",
      eyebrow: "Apps · Tools · Software · Experiments",
      title: "Development",
      href: "/development",
      className: styles.development,
      image: "/images/ohmxact/home.webp",
    },
  ];

  return (
    <section className={styles.shell} aria-labelledby="studio-krix-v2-title">
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.intro}>
        <p className={styles.kicker}>Studio KRiX · Sydney</p>
        <h1 id="studio-krix-v2-title">Three disciplines. One studio.</h1>
        <p>Images, sound and software. Same hands. Different rooms.</p>
      </div>

      <div className={styles.grid}>
        <span className={styles.pageTraceHorizontal} aria-hidden="true" />
        <span className={styles.pageTraceVertical} aria-hidden="true" />
        {worlds.map((world) => (
          <Link
            className={[styles.card, world.className].join(" ")}
            href={world.href}
            key={world.href}
            aria-label={"Explore " + world.title}
          >
            <Image
              alt=""
              className={styles.image}
              fill
              priority={world.href === "/photography"}
              sizes="(max-width: 760px) 100vw, 34vw"
              src={world.image}
            />
            <div className={styles.overlay} />
            <div className={styles.content}>
              <span className={styles.index}>{world.index}</span>
              <div>
                <h2>{world.title}</h2>
                <p>{world.eyebrow}</p>
              </div>
              <span className={styles.enter} aria-hidden="true">↗</span>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.footerLine}>
        <span>Christopher Helene / KRiX</span>
        <span>Photography · Music · Development</span>
      </div>
    </section>
  );
}
