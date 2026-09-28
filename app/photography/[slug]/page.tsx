import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicGallery } from "@/lib/portfolio/public";
import styles from "./gallery.module.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPublicGallery(slug);
  if (!data) return { title: "Photography" };

  return {
    title: data.gallery.title,
    description:
      data.gallery.description ||
      "Photography gallery by Studio KRiX in Sydney.",
  };
}

export default async function PublicGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPublicGallery(slug);
  if (!data) notFound();

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <Link href="/photography">← Photography</Link>
        <span>Studio KRiX / Sydney</span>
      </div>

      <header className={styles.hero}>
        <p className={styles.kicker}>
          {[data.gallery.category, data.gallery.location, data.gallery.event_date]
            .filter(Boolean)
            .join(" · ")}
        </p>
        <h1>{data.gallery.title}</h1>
        {data.gallery.description && <p>{data.gallery.description}</p>}
      </header>

      <section className={styles.grid}>
        {data.assets.map((asset, index) => (
          <figure className={styles.frame} key={asset.id}>
            {asset.url ? (
              <img alt={asset.alt_text} src={asset.url} />
            ) : (
              <div className={styles.missing}>Image unavailable</div>
            )}
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {asset.caption && <p>{asset.caption}</p>}
            </figcaption>
          </figure>
        ))}
      </section>
    </div>
  );
}
