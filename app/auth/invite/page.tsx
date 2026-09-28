import type { Metadata } from "next";
import Link from "next/link";
import { InviteAcceptor } from "@/components/auth/invite-acceptor";
import styles from "./invite.module.css";

export const metadata: Metadata = {
  title: "Activate client portal",
  robots: { index: false, follow: false },
};

export default function InvitePage() {
  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <p className={styles.kicker}>Studio KRiX / Client Portal</p>
        <h1>Welcome in.</h1>
        <p className={styles.lead}>
          Finish setting up your private account to access galleries shared with you.
        </p>
        <InviteAcceptor />
        <Link className={styles.home} href="/">
          Studio KRiX
        </Link>
      </section>
    </div>
  );
}
