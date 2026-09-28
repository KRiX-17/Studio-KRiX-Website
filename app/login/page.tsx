import type { Metadata } from "next";
import Link from "next/link";
import styles from "./login.module.css";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <p className={styles.kicker}>Studio KRiX / Private portal</p>
        <h1>Sign in.</h1>
        <p className={styles.lead}>
          Client galleries and Studio KRiX administration live behind this door.
        </p>

        {params.error && (
          <p className={styles.error}>
            Sign-in didn&apos;t work. Check your details and try again.
          </p>
        )}

        <form action="/api/auth/login" method="post" className={styles.form}>
          <input
            type="hidden"
            name="next"
            value={params.next?.startsWith("/") ? params.next : ""}
          />
          <label>
            Email
            <input autoComplete="email" name="email" type="email" required />
          </label>
          <label>
            Password
            <input
              autoComplete="current-password"
              name="password"
              type="password"
              required
            />
          </label>
          <button type="submit">Sign in →</button>
        </form>

        <div className={styles.foot}>
          <span>Accounts are created by Studio KRiX.</span>
          <Link href="/">Back to Studio KRiX</Link>
        </div>
      </section>
    </div>
  );
}
