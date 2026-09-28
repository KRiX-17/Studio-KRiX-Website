import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ACCESS_COOKIE,
  getAdminProfiles,
  invokePortalFunction,
} from "@/lib/supabase/auth-rest";
import styles from "../system.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Audit Log",
  robots: { index: false, follow: false },
};

export default async function AuditPage() {
  const accessToken = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!accessToken) redirect("/login");

  const [audit, users] = await Promise.all([
    invokePortalFunction<{
      events: Array<{
        id: number;
        actor_user_id: string | null;
        event_type: string;
        entity_type: string | null;
        entity_id: string | null;
        details: Record<string, unknown>;
        user_agent: string | null;
        created_at: string;
      }>;
      downloads: Array<{
        id: number;
        user_id: string;
        gallery_id: string;
        asset_id: string | null;
        download_kind: string;
        created_at: string;
      }>;
    }>("admin-portal", accessToken, {
      action: "audit_feed",
      body: { limit: 150 },
    }),
    getAdminProfiles(accessToken),
  ]);

  if (!audit.ok || !audit.data) redirect("/mfa?next=/admin/audit");

  const names = new Map(
    users.map((user) => [
      user.id,
      user.display_name || user.email || user.id.slice(0, 8),
    ]),
  );

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className={styles.kicker}>Studio KRiX / Super Admin</p>
          <h1>Audit.</h1>
          <p>Who did what, and when.</p>
        </div>
        <Link href="/admin">← Admin</Link>
      </header>

      <nav className={styles.nav}>
        <Link href="/admin">Galleries</Link>
        <Link href="/admin/users">Clients & Users</Link>
        <Link href="/admin/audit">Audit</Link>
        <Link href="/admin/monitoring">Monitoring</Link>
      </nav>

      <section className={styles.section}>
        <p className={styles.kicker}>Activity</p>
        <h2>Recent events.</h2>
        <div className={styles.log}>
          {audit.data.events.map((event) => (
            <article key={event.id}>
              <time>{new Date(event.created_at).toLocaleString("en-AU")}</time>
              <strong>{event.event_type.replaceAll(".", " / ")}</strong>
              <span>
                {event.actor_user_id
                  ? names.get(event.actor_user_id) || event.actor_user_id.slice(0, 8)
                  : "System"}
              </span>
              <small>
                {[event.entity_type, event.entity_id?.slice(0, 8)]
                  .filter(Boolean)
                  .join(" · ")}
              </small>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.kicker}>Downloads</p>
        <h2>Delivery activity.</h2>
        <div className={styles.log}>
          {audit.data.downloads.length === 0 ? (
            <p className={styles.muted}>No client downloads yet.</p>
          ) : (
            audit.data.downloads.map((event) => (
              <article key={event.id}>
                <time>{new Date(event.created_at).toLocaleString("en-AU")}</time>
                <strong>{event.download_kind.replace("_", " ")}</strong>
                <span>{names.get(event.user_id) || event.user_id.slice(0, 8)}</span>
                <small>{"Gallery " + event.gallery_id.slice(0, 8)}</small>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
