import type { Metadata } from "next";
import Link from "next/link";
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
          <p className={styles.kicker}>Studio KRiX / Super Admin</p>
          <h1>Monitoring.</h1>
          <p>Portal health and security posture at a glance.</p>
        </div>
        <Link href="/admin">← Admin</Link>
      </header>

      <nav className={styles.nav}>
        <Link href="/admin">Galleries</Link>
        <Link href="/admin/users">Clients & Users</Link>
        <Link href="/admin/audit">Audit</Link>
        <Link href="/admin/monitoring">Monitoring</Link>
      </nav>

      <section className={styles.healthGrid}>
        <article><span>Portal</span><strong>{data.status}</strong><i /></article>
        <article><span>Database</span><strong>{data.database}</strong><i /></article>
        <article><span>Private storage</span><strong>{data.storage}</strong><i /></article>
        <article><span>Super Admin MFA</span><strong>required</strong><i /></article>
        <article><span>Public signup</span><strong>blocked</strong><i /></article>
        <article><span>Client assets</span><strong>private</strong><i /></article>
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
      </section>
    </div>
  );
}
