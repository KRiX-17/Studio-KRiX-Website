import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ACCESS_COOKIE,
  invokePortalFunction,
} from "@/lib/supabase/auth-rest";
import styles from "../system.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portal Monitoring",
  robots: { index: false, follow: false },
};

export default async function MonitoringPage() {
  const accessToken = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!accessToken) redirect("/login");

  const result = await invokePortalFunction<{
    status: string;
    database: string;
    storage: string;
    galleryCount: number;
    assetCount: number;
    activeClientCount: number;
    downloadCount: number;
    latestAudit: { created_at: string; event_type: string } | null;
    checkedAt: string;
  }>("admin-portal", accessToken, {
    action: "monitoring",
    body: {},
  });

  if (!result.ok || !result.data) {
    redirect("/mfa?next=/admin/monitoring");
  }

  const data = result.data;

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className={styles.kicker}>SYSTEM / STATUS</p>
          <h1>Monitoring</h1>
          <p>Portal counters and the latest recorded activity.</p>
        </div>
      </header>

      <section className={styles.healthGrid}>
        <article><span>Portal response</span><strong>{data.status}</strong></article>
        <article><span>Database query</span><strong>{data.database}</strong></article>
        <article><span>Storage configuration</span><strong>{data.storage}</strong></article>
      </section>

      <section className={styles.metrics}>
        <article><span>Galleries</span><strong>{data.galleryCount}</strong></article>
        <article><span>Photos</span><strong>{data.assetCount}</strong></article>
        <article><span>Active clients</span><strong>{data.activeClientCount}</strong></article>
        <article><span>Downloads</span><strong>{data.downloadCount}</strong></article>
      </section>

      <section className={styles.section}>
        <p className={styles.kicker}>Latest signal</p>
        <h2>
          {data.latestAudit
            ? data.latestAudit.event_type.replaceAll(".", " / ")
            : "No activity yet."}
        </h2>
        <p className={styles.muted}>
          Checked {new Date(data.checkedAt).toLocaleString("en-AU")}
          {data.latestAudit
            ? " · Last event " +
              new Date(data.latestAudit.created_at).toLocaleString("en-AU")
            : ""}
        </p>
        <p className={styles.muted}>These values confirm the admin function can query the database. They do not test every upload, RLS policy or customer login.</p>
      </section>
    </div>
  );
}
