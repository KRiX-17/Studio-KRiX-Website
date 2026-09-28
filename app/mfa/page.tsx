import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ACCESS_COOKIE,
  getAal,
  getAuthUser,
  getProfile,
} from "@/lib/supabase/auth-rest";
import { MfaPanel } from "@/components/auth/mfa-panel";
import styles from "./mfa.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Super Admin MFA",
  robots: { index: false, follow: false },
};

export default async function MfaPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const accessToken = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!accessToken) redirect("/login");

  const userResult = await getAuthUser(accessToken);
  const user = userResult.ok ? userResult.data : null;
  if (!user?.id) redirect("/login");

  const profile = await getProfile(accessToken, user.id);
  if (!profile?.is_active) redirect("/login");
  if (profile.role !== "super_admin") redirect("/portal");

  const next =
    params.next?.startsWith("/") && !params.next.startsWith("//")
      ? params.next
      : "/admin";

  if (getAal(accessToken) === "aal2") redirect(next);

  const factor =
    user.factors?.find(
      (item) => item.factor_type === "totp" && item.status === "verified",
    ) ?? null;

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <p className={styles.kicker}>Studio KRiX / Super Admin Security</p>
        <h1>{factor ? "Verify it’s you." : "Add your second factor."}</h1>
        <p className={styles.lead}>
          {factor
            ? "Enter the six-digit code from your authenticator to unlock Super Admin."
            : "Set up TOTP with Apple Passwords, 1Password, Authy, Google Authenticator or another authenticator app."}
        </p>
        <MfaPanel factorId={factor?.id ?? null} next={next} />
      </section>
    </div>
  );
}
