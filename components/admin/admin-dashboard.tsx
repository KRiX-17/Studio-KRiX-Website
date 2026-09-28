"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/admin/admin.module.css";

type AdminData = {
  galleries: Array<{
    id: string;
    slug: string;
    title: string;
    category: string | null;
    status: string;
    event_date: string | null;
    location: string | null;
    is_featured: boolean;
    published_at: string | null;
    created_at: string;
  }>;
  users: Array<{
    id: string;
    email: string | null;
    display_name: string | null;
    role: string;
    is_active: boolean;
  }>;
  audits: Array<{
    id: number;
    event_type: string;
    created_at: string;
  }>;
};

export function AdminDashboard({ data }: { data: AdminData }) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clients = data.users.filter(
    (user) => user.role === "client" && user.is_active,
  );

  async function createGallery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreating(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create_gallery",
        body: {
          title: form.get("title"),
          category: form.get("category"),
          eventDate: form.get("eventDate"),
          location: form.get("location"),
          description: form.get("description"),
        },
      }),
    });

    const result = (await response.json()) as {
      gallery?: { id: string };
      error?: string;
    };

    setCreating(false);
    if (!response.ok || !result.gallery?.id) {
      setError(result.error ?? "Could not create gallery.");
      return;
    }

    router.push("/admin/galleries/" + result.gallery.id);
  }

  return (
    <>
      <header className={styles.hero}>
        <div>
          <p className={styles.kicker}>Studio KRiX / Super Admin</p>
          <h1>Control room.</h1>
          <p>
            Galleries, clients, downloads, proofing and the public portfolio from
            one place.
          </p>
        </div>
        <form action="/api/auth/logout" method="post">
          <button className={styles.ghost} type="submit">Sign out</button>
        </form>
      </header>

      <nav className={styles.adminNav} aria-label="Admin">
        <Link href="/admin">Galleries</Link>
        <Link href="/admin/users">Clients & Users</Link>
        <Link href="/admin/audit">Audit</Link>
        <Link href="/admin/monitoring">Monitoring</Link>
      </nav>

      <section className={styles.metrics}>
        <article>
          <span>Galleries</span>
          <strong>{data.galleries.length}</strong>
        </article>
        <article>
          <span>Active clients</span>
          <strong>{clients.length}</strong>
        </article>
        <article>
          <span>Published</span>
          <strong>
            {data.galleries.filter((gallery) => gallery.status === "published").length}
          </strong>
        </article>
        <article>
          <span>Recent events</span>
          <strong>{data.audits.length}</strong>
        </article>
      </section>

      <section className={styles.createPanel}>
        <div>
          <p className={styles.kicker}>New shoot</p>
          <h2>Create a gallery.</h2>
        </div>
        <form onSubmit={createGallery}>
          <label>
            Gallery title
            <input name="title" placeholder="Industry Event 3" required />
          </label>
          <label>
            Category
            <select name="category" defaultValue="Fashion">
              <option>Fashion</option>
              <option>Portraits</option>
              <option>Events</option>
              <option>Creative</option>
            </select>
          </label>
          <label>
            Date
            <input name="eventDate" type="date" />
          </label>
          <label>
            Location
            <input name="location" placeholder="Sydney, NSW" />
          </label>
          <label className={styles.wide}>
            Description
            <textarea name="description" rows={3} />
          </label>
          <button disabled={creating} type="submit">
            {creating ? "Creating…" : "Create gallery →"}
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </section>

      <section className={styles.galleryList}>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Galleries</p>
          <h2>Current work.</h2>
        </div>

        {data.galleries.length === 0 ? (
          <div className={styles.empty}>No galleries yet. Create the first one above.</div>
        ) : (
          data.galleries.map((gallery, index) => (
            <Link
              className={styles.galleryRow}
              href={"/admin/galleries/" + gallery.id}
              key={gallery.id}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{gallery.title}</strong>
                <small>
                  {[gallery.category, gallery.location, gallery.event_date]
                    .filter(Boolean)
                    .join(" · ")}
                </small>
              </div>
              <em data-status={gallery.status}>{gallery.status.replace("_", " ")}</em>
              <b aria-hidden="true">↗</b>
            </Link>
          ))
        )}
      </section>
    </>
  );
}
