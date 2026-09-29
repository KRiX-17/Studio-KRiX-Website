import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ACCESS_COOKIE,
  getAdminProfiles,
} from "@/lib/supabase/auth-rest";
import { AdminUsersManager } from "@/components/admin/admin-users-manager";
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
          <p>ACCOUNTS / ACCESS</p>
          <h1>Clients & users</h1>
        </div>
        <span>Invitation only · {users.length} accounts</span>
      </header>

      <AdminUsersManager users={users} />
    </div>
  );
}
