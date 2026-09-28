import type { Metadata } from "next";
import Link from "next/link";
import styles from "./setup-owner.module.css";

export const metadata: Metadata = {
  title: "Set up Studio KRiX owner",
  robots: { index: false, follow: false },
};

export default async function SetupOwnerPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <p className={styles.kicker}>Studio KRiX / One-time setup</p>
        <h1>Create the owner account.</h1>
        <p className={styles.lead}>
          This page can create the first Super Admin only. Once an owner exists,
          the backend permanently refuses further bootstrap attempts.
        </p>

        {params.error && (
          <p className={styles.error}>
            Setup didn&apos;t complete. Check the details and bootstrap code.
          </p>
        )}

        <form action="/api/auth/bootstrap-owner" method="post" className={styles.form}>
          <label>
            Your name
            <input name="displayName" defaultValue="Christopher" required />
          </label>
          <label>
            Email
            <input autoComplete="email" name="email" type="email" required />
          </label>
          <label>
            Password
            <input
              autoComplete="new-password"
              minLength={12}
              name="password"
              type="password"
              required
            />
          </label>
          <label>
            Confirm password
            <input
              autoComplete="new-password"
              minLength={12}
              name="confirm"
              type="password"
              required
            />
          </label>
          <label>
            One-time bootstrap code
            <input
              autoComplete="off"
              name="secret"
              type="password"
              required
            />
          </label>
          <button type="submit">Create Super Admin →</button>
        </form>

        <p className={styles.note}>
          Use a unique password. MFA will be added to the Super Admin account next.
        </p>

        <Link className={styles.home} href="/">
          Back to Studio KRiX
        </Link>
      </section>
    </div>
  );
}
