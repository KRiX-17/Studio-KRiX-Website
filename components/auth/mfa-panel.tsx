"use client";

import { FormEvent, useState } from "react";
import styles from "@/app/mfa/mfa.module.css";

type EnrollData = {
  id: string;
  totp?: {
    qr_code?: string;
    secret?: string;
    uri?: string;
  };
};

export function MfaPanel({
  factorId: initialFactorId,
  next,
}: {
  factorId: string | null;
  next: string;
}) {
  const [factorId, setFactorId] = useState(initialFactorId);
  const [enroll, setEnroll] = useState<EnrollData | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startEnrollment() {
    setBusy(true);
    setError(null);
    const response = await fetch("/api/auth/mfa/enroll", { method: "POST" });
    const data = (await response.json()) as EnrollData & { error?: string };
    setBusy(false);
    if (!response.ok) {
      setError(data.error ?? "Could not start MFA setup.");
      return;
    }
    setEnroll(data);
    setFactorId(data.id);
  }

  async function verify(event: FormEvent) {
    event.preventDefault();
    if (!factorId || code.length < 6) return;

    setBusy(true);
    setError(null);
    const response = await fetch("/api/auth/mfa/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ factorId, code, next }),
    });
    const data = (await response.json()) as { ok?: boolean; next?: string; error?: string };
    setBusy(false);

    if (!response.ok) {
      setError(data.error ?? "That code did not verify.");
      return;
    }

    window.location.assign(data.next ?? "/admin");
  }

  const qr = enroll?.totp?.qr_code;
  const qrSrc = qr
    ? qr.startsWith("data:")
      ? qr
      : "data:image/svg+xml;utf8," + encodeURIComponent(qr)
    : null;

  return (
    <div className={styles.panel}>
      {!factorId && (
        <button
          className={styles.primary}
          disabled={busy}
          onClick={startEnrollment}
          type="button"
        >
          {busy ? "Starting…" : "Set up authenticator →"}
        </button>
      )}

      {enroll && (
        <div className={styles.enrolment}>
          {qrSrc && <img alt="Studio KRiX MFA QR code" src={qrSrc} />}
          <div>
            <strong>Authenticator secret</strong>
            <code>{enroll.totp?.secret ?? "Use the QR code"}</code>
            <p>
              Scan the QR code or enter the secret manually, then type the
              six-digit code below.
            </p>
          </div>
        </div>
      )}

      {factorId && (
        <form className={styles.form} onSubmit={verify}>
          <label>
            Six-digit code
            <input
              autoComplete="one-time-code"
              inputMode="numeric"
              maxLength={8}
              onChange={(event) =>
                setCode(event.target.value.replace(/\D/g, ""))
              }
              placeholder="123456"
              value={code}
            />
          </label>
          <button className={styles.primary} disabled={busy} type="submit">
            {busy ? "Verifying…" : "Unlock Super Admin →"}
          </button>
        </form>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
