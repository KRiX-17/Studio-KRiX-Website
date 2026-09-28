"use client";

import { useEffect, useState } from "react";
import styles from "@/app/auth/invite/invite.module.css";

export function InviteAcceptor() {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const accessToken = hash.get("access_token");
    const refreshToken = hash.get("refresh_token");
    const expiresIn = Number(hash.get("expires_in") ?? "3600");

    if (!accessToken || !refreshToken) {
      setState("error");
      return;
    }

    fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken, refreshToken, expiresIn }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("session");
        window.history.replaceState({}, "", window.location.pathname);
        setState("ready");
      })
      .catch(() => setState("error"));
  }, []);

  if (state === "loading") {
    return <p className={styles.message}>Securing your Studio KRiX session…</p>;
  }

  if (state === "error") {
    return (
      <p className={styles.message}>
        This invite link could not be verified. Ask Studio KRiX for a fresh invite.
      </p>
    );
  }

  return (
    <form action="/api/auth/password" method="post" className={styles.form}>
      <label>
        Choose a password
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
      <button type="submit">Activate my portal →</button>
    </form>
  );
}
