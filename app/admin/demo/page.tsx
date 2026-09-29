import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./demo.module.css";

export const metadata: Metadata = { title: "Gallery Demo", robots: { index: false, follow: false, nocache: true } };

const personas = {
  ahri: {
    name: "Ahri",
    title: "Coastal light",
    category: "Landscape study",
    photos: [
      { src: "/images/photography/beach-from-above.webp", alt: "Aerial view of a sandy beach" },
      { src: "/images/photography/coastline-from-above.webp", alt: "Coastline photographed from above" },
      { src: "/images/photography/rocky-cove.webp", alt: "Rocky cove beside the sea" },
    ],
  },
  aurora: {
    name: "Aurora",
    title: "Garden portraits",
    category: "Portrait study",
    photos: [
      { src: "/images/photography/portrait-garden.webp", alt: "Portrait in a garden" },
      { src: "/images/photography/portrait-butterflies.webp", alt: "Portrait among butterflies" },
      { src: "/images/photography/fashion-floral.webp", alt: "Floral fashion portrait" },
    ],
  },
} as const;

type Persona = keyof typeof personas;

export default async function DemoPage({ searchParams }: { searchParams: Promise<{ as?: string; gallery?: string }> }) {
  const params = await searchParams;
  const viewer: Persona = params.as === "aurora" ? "aurora" : "ahri";
  const target: Persona = params.gallery === "aurora" ? "aurora" : "ahri";
  const allowed = viewer === target;
  const person = personas[viewer];
  const gallery = personas[target];

  return <div className={styles.page}>
    <header className={styles.heading}><div><p>ADMIN / GALLERY DEMO</p><h1>Customer experience</h1><span>Two fictional customers · sample galleries using Studio KRiX photography</span></div><Link href="/admin">← Control room</Link></header>
    <div className={styles.notice}><strong>Interactive preview only.</strong> These personas are sample data inside the admin area. They are not real accounts, and this screen does not prove Supabase RLS or private storage access.</div>
    <div className={styles.switcher}><span>View as</span>{(Object.keys(personas) as Persona[]).map((id) => <Link key={id} aria-current={viewer === id ? "page" : undefined} href={`/admin/demo?as=${id}&gallery=${id}`}>{personas[id].name}</Link>)}</div>
    <section className={styles.client}>
      <div className={styles.clientHead}><div><span>STUDIO KRIX / CLIENT PORTAL</span><h2>Welcome, {person.name}.</h2><p>Your private galleries appear here.</p></div><span className={styles.sample}>SAMPLE VIEW</span></div>
      <div className={styles.galleryLinks}><Link aria-current={target === "ahri" ? "page" : undefined} href={`/admin/demo?as=${viewer}&gallery=ahri`}>Coastal light</Link><Link aria-current={target === "aurora" ? "page" : undefined} href={`/admin/demo?as=${viewer}&gallery=aurora`}>Garden portraits</Link></div>
      {allowed ? <><div className={styles.galleryHead}><div><span>{gallery.category}</span><h3>{gallery.title}</h3><p>3 sample photos · View and download controls are shown in the real client portal.</p></div><span className={styles.access}>ACCESS GRANTED</span></div><div className={styles.photos}>{gallery.photos.map((photo) => <figure key={photo.src}><Image alt={photo.alt} src={photo.src} width={700} height={520} sizes="(max-width: 700px) 100vw, 33vw" /><figcaption>{photo.alt}</figcaption></figure>)}</div></> : <div className={styles.denied} role="status"><span>ACCESS DENIED / SAMPLE RULE</span><h3>{person.name} cannot open {gallery.title}.</h3><p>This demonstrates the intended customer view. The real boundary must also be tested with separate Supabase accounts, direct URLs and signed asset requests.</p><Link href={`/admin/demo?as=${viewer}&gallery=${viewer}`}>Return to {person.name}&apos;s gallery</Link></div>}
    </section>
    <section className={styles.check}><h2>Real access check</h2><ol><li>Create two client accounts from <Link href="/admin/users#invite">Clients & users</Link> and privately claim each invitation.</li><li>Create two draft galleries, upload photos, and grant each customer access only to their own gallery.</li><li>Sign in separately as both customers. Try the other gallery URL and asset request; repeat while signed out.</li></ol><p>A result from this sample page does not count as the real security test.</p></section>
  </div>;
}
