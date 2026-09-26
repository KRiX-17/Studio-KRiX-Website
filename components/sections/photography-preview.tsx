import Image from "next/image";
import Link from "next/link";
import { getPublishedPhotos } from "@/lib/photography/gallery";

export async function PhotographyPreview() {
  const [photo] = await getPublishedPhotos();
  return (
    <section className="photo-preview">
      <div className="site-container photo-preview__grid">
        <div className="photo-preview__copy">
          <span className="photo-preview__number">03 / Photography</span>
          <h2>A different way of seeing.</h2>
          <p>Photography brings the visual side of my work into Studio KRiX: light, movement, machines, people and the moments between.</p>
          <Link href="/photography">View photography <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="photo-preview__visual">
          {photo ? <Image src={photo.imageUrl} alt={photo.alt_text} fill sizes="(max-width: 760px) 100vw, 50vw" unoptimized /> : <div className="photo-preview__frame" aria-hidden="true"><span /></div>}
        </div>
      </div>
    </section>
  );
}
