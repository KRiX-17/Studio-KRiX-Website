import type { Metadata } from "next";
import Link from "next/link";
import styles from "./claim.module.css";

export const metadata: Metadata = {
  title: "Activate client portal",
  robots: { index: false, follow: false },
};

export default async function ClaimPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const params = await searchParams;
  const token = params.token ?? "";

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <p className={styles.kicker}>Studio KRiX / Client Portal</p>
        <h1>Claim your gallery account.</h1>
        <p className={styles.lead}>
          Choose your password, then sign in to the private galleries Studio
          KRiX has shared with you.
        </p>

        {!token ? (
          <p className={styles.error}>
            This invitation link is incomplete. Ask Studio KRiX for a fresh one.
          </p>
        ) : (
          <form className={styles.form} action="/api/client/claim" method="post">
            <input name="token" type="hidden" value={token} />
            <label>
              Choose password
              <input autoComplete="new-password" minLength={12} name="password" required type="password" />
            </label>
            <label>
              Confirm password
              <input autoComplete="new-password" minLength={12} name="confirm" required type="password" />
            </label>
            <button type="submit">Activate my portal →</button>
          </form>
        )}

        {params.error && (
          <p className={styles.error}>
            {params.error === "password"
              ? "Use matching passwords with at least 12 characters."
              : "That invitation is invalid, expired or already used."}
          </p>
        )}

        <Link className={styles.home} href="/">Studio KRiX</Link>
      </section>
    </div>
  );
}
