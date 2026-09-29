"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/admin/admin.module.css";

type AdminData = {
  galleries: Array<{ id: string; slug: string; title: string; category: string | null; status: string; event_date: string | null; location: string | null; is_featured: boolean; published_at: string | null; created_at: string }>;
  users: Array<{ id: string; email: string | null; display_name: string | null; role: string; is_active: boolean }>;
  audits: Array<{ id: number; event_type: string; created_at: string }>;
};

export function AdminDashboard({ data }: { data: AdminData }) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const clients = data.users.filter((user) => user.role === "client" && user.is_active);
  const published = data.galleries.filter((gallery) => gallery.status === "published");
  const drafts = data.galleries.filter((gallery) => gallery.status === "draft");
  const filtered = useMemo(() => data.galleries.filter((gallery) =>
    (filter === "all" || gallery.status === filter) &&
    [gallery.title, gallery.slug, gallery.category, gallery.location].some((part) => part?.toLowerCase().includes(query.toLowerCase()))
  ), [data.galleries, query, filter]);

  async function createGallery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreating(true);
    setError(null);
    try {
      const form = new FormData(event.currentTarget);
      const response = await fetch("/api/admin/portal", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create_gallery", body: {
          title: form.get("title"), category: form.get("category"), eventDate: form.get("eventDate"),
          location: form.get("location"), description: form.get("description"),
        } }),
      });
      const result = (await response.json()) as { gallery?: { id: string }; error?: string };
      if (!response.ok || !result.gallery?.id) throw new Error(result.error ?? "Could not create gallery.");
      router.push("/admin/galleries/" + result.gallery.id);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not create gallery.");
    } finally { setCreating(false); }
  }

  return <>
    <header className={styles.heading}>
      <div><p className={styles.eyebrow}>OVERVIEW / LIVE DATA</p><h1>Control room</h1><p>Galleries, client access and activity in one workspace.</p></div>
      <div className={styles.headingActions}><Link className={styles.secondary} href="/admin/demo">Explore demo</Link><Link className={styles.primary} href="#new-gallery">+ New gallery</Link></div>
    </header>

    <section className={styles.metrics} aria-label="Portal totals">
      <article><span>Galleries</span><strong>{data.galleries.length}</strong><small>Active records</small></article>
      <article><span>Published</span><strong>{published.length}</strong><small>Public portfolio</small></article>
      <article><span>Clients</span><strong>{clients.length}</strong><small>Active accounts</small></article>
      <article><span>Drafts</span><strong>{drafts.length}</strong><small>Awaiting review</small></article>
    </section>

    <div className={styles.columns}>
      <section className={styles.panel} aria-labelledby="attention-title">
        <div className={styles.panelHead}><h2 id="attention-title">Needs attention</h2><span>{drafts.length}</span></div>
        {drafts.length ? <ul className={styles.attention}>{drafts.slice(0, 4).map((gallery) => <li key={gallery.id}><span className={styles.warning}>DRAFT</span><Link href={`/admin/galleries/${gallery.id}`}>{gallery.title}</Link><small>Review photos and access</small></li>)}</ul> : <p className={styles.quiet}>No draft galleries waiting. Check <Link href="/admin/monitoring">system status</Link> for service signals.</p>}
      </section>
      <section className={styles.panel} aria-labelledby="quick-title">
        <div className={styles.panelHead}><h2 id="quick-title">Quick actions</h2></div>
        <div className={styles.quick}><Link href="#new-gallery">Create gallery <span>↗</span></Link><Link href="/admin/users#invite">Invite client <span>↗</span></Link><Link href="/admin/demo">Preview customer flow <span>↗</span></Link><Link href="/admin/audit">Review downloads <span>↗</span></Link></div>
      </section>
    </div>

    <section className={styles.panel} aria-labelledby="galleries-title">
      <div className={styles.panelHead}><div><p className={styles.eyebrow}>LIBRARY</p><h2 id="galleries-title">Galleries</h2></div><span>{filtered.length} shown</span></div>
      <div className={styles.toolbar}><label className={styles.search}>Search galleries<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, location or category" /></label><label>Show<select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">All statuses</option><option value="draft">Draft</option><option value="client_only">Client only</option><option value="published">Published</option></select></label></div>
      <div className={styles.tableScroll}><table className={styles.table}><thead><tr><th>Gallery</th><th>Category / location</th><th>Status</th><th>Created</th><th>Action</th></tr></thead><tbody>
        {filtered.map((gallery) => <tr key={gallery.id}><td><strong>{gallery.title}</strong><small>{gallery.slug}</small></td><td>{[gallery.category, gallery.location].filter(Boolean).join(" · ") || "—"}</td><td><span className={styles.status} data-status={gallery.status}>{gallery.status.replaceAll("_", " ")}</span></td><td>{new Date(gallery.created_at).toLocaleDateString("en-AU")}</td><td><Link href={`/admin/galleries/${gallery.id}`}>Manage</Link></td></tr>)}
      </tbody></table></div>
      {!filtered.length && <p className={styles.quiet}>{data.galleries.length ? "No galleries match these filters." : "No galleries yet. Create one below."}</p>}
    </section>

    <div className={styles.columns}>
      <section className={styles.panel} id="new-gallery" aria-labelledby="create-title">
        <div className={styles.panelHead}><div><p className={styles.eyebrow}>CREATE</p><h2 id="create-title">New gallery</h2></div></div>
        <form className={styles.createForm} onSubmit={createGallery}>
          <label>Title<input name="title" placeholder="Shoot name" required /></label>
          <label>Category<select name="category" defaultValue="Portraits"><option>Fashion</option><option>Portraits</option><option>Events</option><option>Creative</option></select></label>
          <label>Date<input name="eventDate" type="date" /></label>
          <label>Location<input name="location" placeholder="Sydney, NSW" /></label>
          <label className={styles.full}>Description<textarea name="description" rows={2} /></label>
          <button className={styles.primary} disabled={creating} type="submit">{creating ? "Creating…" : "Create draft gallery"}</button>
        </form>
        {error && <p role="alert" className={styles.error}>{error}</p>}
      </section>
      <section className={styles.panel} aria-labelledby="activity-title">
        <div className={styles.panelHead}><div><p className={styles.eyebrow}>RECENT</p><h2 id="activity-title">Activity</h2></div><Link href="/admin/audit">Full audit ↗</Link></div>
        {data.audits.length ? <ol className={styles.activity}>{data.audits.slice(0, 8).map((event) => <li key={event.id}><span>{event.event_type.replaceAll(".", " / ")}</span><time dateTime={event.created_at}>{new Date(event.created_at).toLocaleString("en-AU")}</time></li>)}</ol> : <p className={styles.quiet}>No activity recorded yet.</p>}
      </section>
    </div>
  </>;
}
