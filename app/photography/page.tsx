import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { getPublishedPhotos } from "@/lib/photography/gallery";

export const revalidate = 60;
export const metadata: Metadata = createMetadata({
  title: "Photography | Studio KRiX",
  description: "Photography by Christopher Helene, curated through Studio KRiX.",
  path: "/photography",
});

export default async function PhotographyPage() {
  const photos = await getPublishedPhotos();
  const collections = [...new Set(photos.map((photo) => photo.collection))];

  return (
    <>
      <section className="photo-intro">
        <div className="site-container photo-intro__inner">
          <h1>Photography<span className="photo-intro__dot">.</span></h1>
          <p>Moments, places and details through my lens. A visual side of Studio KRiX, alongside the music and the things I build.</p>
        </div>
      </section>
      {photos.length ? (
        <div className="site-container photo-gallery">
          <div className="photo-gallery__heading">
            <span>Selected work</span>
            <span>{collections.join(" · ")}</span>
          </div>
          <div className="photo-gallery__grid">
            {photos.map((photo, index) => (
              <figure className={index === 0 ? "photo-gallery__item photo-gallery__item--featured" : "photo-gallery__item"} key={photo.id}>
                <div className="photo-gallery__image">
                  <Image src={photo.imageUrl} alt={photo.alt_text} fill sizes={index === 0 ? "(max-width: 760px) 100vw, 70vw" : "(max-width: 760px) 100vw, 45vw"} unoptimized />
                </div>
                <figcaption><strong>{photo.title}</strong><span>{photo.location || photo.collection}</span>{photo.caption && <p>{photo.caption}</p>}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      ) : (
        <div className="site-container photo-gallery__empty">
          <div aria-hidden="true" className="photo-gallery__aperture"><span /></div>
          <p>The first collection is being prepared.</p>
          <Link href="/contact">Ask me about my photography <span aria-hidden="true">↗</span></Link>
        </div>
      )}
      <section className="photo-outro"><div className="site-container"><p>Have something in mind?</p><Link href="/contact">Let’s talk <span aria-hidden="true">↗</span></Link></div></section>
    </>
  );
}
