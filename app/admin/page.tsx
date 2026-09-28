import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ACCESS_COOKIE,
  invokePortalFunction,
} from "@/lib/supabase/auth-rest";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Studio KRiX Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminPage() {
  const accessToken = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!accessToken) redirect("/login");

  const result = await invokePortalFunction<{
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
  }>("admin-portal", accessToken, { action: "overview", body: {} });

  if (!result.ok || !result.data) redirect("/mfa?next=/admin");

  return (
    <div className={styles.page}>
      <AdminDashboard data={result.data} />
    </div>
  );
}
