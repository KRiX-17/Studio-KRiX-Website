import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ACCESS_COOKIE,
  getAdminProfiles,
} from "@/lib/supabase/auth-rest";
import styles from "./users.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clients & Users",
  robots: { index: false, follow: false },
};

export default async function AdminUsersPage() {
  const accessToken = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!accessToken) redirect("/login");

  const users = await getAdminProfiles(accessToken);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p>Studio KRiX / Super Admin</p>
          <h1>Clients & users.</h1>
        </div>
        <Link href="/admin">← Admin</Link>
      </header>

      <section className={styles.create}>
        <div>
          <p className={styles.kicker}>Create client</p>
          <h2>Invitation controls are staged.</h2>
          <p>
            The secure invite function is already deployed. Email delivery will
            be switched on after the Studio KRiX Auth redirect URL is finalised.
          </p>
        </div>
        <button type="button" disabled>
          Invite client
        </button>
      </section>

      <section className={styles.list}>
        {users.length === 0 ? (
          <p>No portal users yet.</p>
        ) : (
          users.map((user) => (
            <article key={user.id}>
              <div>
                <strong>{user.display_name || user.email || "Unnamed user"}</strong>
                <span>{user.email}</span>
              </div>
              <span>{user.role.replace("_", " ")}</span>
              <span>{user.is_active ? "Active" : "Disabled"}</span>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
