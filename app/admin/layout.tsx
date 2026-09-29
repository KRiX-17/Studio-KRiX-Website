import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_COOKIE, getAal, getAuthUser, getProfile } from "@/lib/supabase/auth-rest";
import { AdminNavigation } from "@/components/admin/admin-navigation";
import styles from "./shell.module.css";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!token) redirect("/login");
  const userResult = await getAuthUser(token);
  const user = userResult.ok ? userResult.data : null;
  if (!user?.id) redirect("/login");
  const profile = await getProfile(token, user.id);
  if (!profile?.is_active || profile.role !== "super_admin") redirect("/portal");
  if (getAal(token) !== "aal2") redirect("/mfa?next=/admin");

  return (
    <div className={`${styles.shell} adminShell`}>
      <aside className={styles.sidebar}>
        <Link className={styles.brand} href="/admin">
          <span className={styles.brandMark}>SK</span>
          <span><strong>Studio KRiX</strong><small>ADMIN CONTROL</small></span>
        </Link>
        <AdminNavigation />
        <div className={styles.sidebarFoot}>
          <span className={styles.identity}>{profile.display_name || profile.email || "Super admin"}</span>
          <span className={styles.role}>Super admin · MFA active</span>
          <Link href="/" target="_blank">View website ↗</Link>
          <form action="/api/auth/logout" method="post"><button type="submit">Sign out</button></form>
        </div>
      </aside>
      <div className={styles.workspace}>
        <div className={styles.topline}><span>STUDIO KRIX / OPERATIONS</span><span>PRIVATE WORKSPACE</span></div>
        {children}
      </div>
    </div>
  );
}
