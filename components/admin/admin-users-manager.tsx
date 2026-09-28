"use client";

import { FormEvent, useState } from "react";
import styles from "@/app/admin/users/users.module.css";

type User = {
  id: string;
  email: string | null;
  display_name: string | null;
  role: "super_admin" | "client" | "collaborator";
  is_active: boolean;
  created_at?: string;
};

export function AdminUsersManager({ users }: { users: User[] }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [invite, setInvite] = useState<{
    emailSent: boolean;
    inviteUrl: string;
    emailError?: string | null;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function createClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy("invite");
    setInvite(null);
    setError(null);

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        displayName: form.get("displayName"),
        email: form.get("email"),
        role: form.get("role"),
      }),
    });

    const result = (await response.json()) as {
      error?: string;
      emailSent?: boolean;
      inviteUrl?: string;
      emailError?: string | null;
    };

    setBusy(null);

    if (!response.ok || !result.inviteUrl) {
      setError(result.error ?? "Could not create client.");
      return;
    }

    setInvite({
      emailSent: Boolean(result.emailSent),
      inviteUrl: result.inviteUrl,
      emailError: result.emailError,
    });
    event.currentTarget.reset();
  }

  async function setActive(userId: string, isActive: boolean) {
    setBusy(userId);
    setError(null);

    const response = await fetch("/api/admin/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "set_user_active",
        body: { userId, isActive },
      }),
    });

    const result = (await response.json()) as { error?: string };
    setBusy(null);

    if (!response.ok) {
      setError(result.error ?? "Could not update client.");
      return;
    }

    window.location.reload();
  }

  return (
    <>
      <section className={styles.create}>
        <div>
          <p className={styles.kicker}>Create client</p>
          <h2>Invite someone into their gallery.</h2>
          <p>
            Portal accounts are invitation-only. Clients can view/download their
            assigned galleries; collaborators can also be granted per-gallery
            upload access.
          </p>
        </div>

        <form className={styles.inviteForm} onSubmit={createClient}>
          <label>
            Name
            <input name="displayName" placeholder="Client name" />
          </label>
          <label>
            Email
            <input name="email" type="email" required placeholder="client@example.com" />
          </label>
          <label>
            Account type
            <select name="role" defaultValue="client">
              <option value="client">Client</option>
              <option value="collaborator">Collaborator</option>
            </select>
          </label>
          <button disabled={busy === "invite"} type="submit">
            {busy === "invite" ? "Creating…" : "Create & invite →"}
          </button>
        </form>
      </section>

      {invite && (
        <section className={styles.inviteResult}>
          <strong>
            {invite.emailSent ? "Invite email sent ✓" : "Client created · email needs manual help"}
          </strong>
          {invite.emailError && <p>{invite.emailError}</p>}
          <label>
            One-time invite link
            <input readOnly value={invite.inviteUrl} onFocus={(event) => event.currentTarget.select()} />
          </label>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(invite.inviteUrl)}
          >
            Copy link
          </button>
        </section>
      )}

      {error && <p className={styles.error}>{error}</p>}

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
              {user.role !== "super_admin" ? (
                <button
                  disabled={busy === user.id}
                  onClick={() => setActive(user.id, !user.is_active)}
                  type="button"
                >
                  {user.is_active ? "Disable" : "Enable"}
                </button>
              ) : (
                <span>Protected</span>
              )}
            </article>
          ))
        )}
      </section>
    </>
  );
}
