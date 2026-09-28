import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ACCESS_COOKIE,
  getAuthUser,
  getClientGalleryAccess,
  getProfile,
} from "@/lib/supabase/auth-rest";
import styles from "./portal.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Client Portal",
  robots: { index: false, follow: false },
};

export default async function PortalPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE)?.value;
  if (!accessToken) redirect("/login");

  const userResult = await getAuthUser(accessToken);
  const user = userResult.ok ? userResult.data : null;
  if (!user?.id) redirect("/login");

  const [profile, access] = await Promise.all([
    getProfile(accessToken, user.id),
    getClientGalleryAccess(accessToken, user.id),
  ]);

  if (!profile?.is_active) redirect("/login");

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className={styles.kicker}>Studio KRiX / Client Portal</p>
          <h1>
            {profile.display_name
              ? "Welcome, " + profile.display_name + "."
              : "Your galleries."}
          </h1>
          <p>
            Private galleries shared with your Studio KRiX account appear here.
          </p>
        </div>
        <form action="/api/auth/logout" method="post">
          <button type="submit">Sign out</button>
        </form>
      </header>

      <section className={styles.galleries}>
        {access.length === 0 ? (
          <div className={styles.empty}>
            <span>00</span>
            <h2>No galleries shared yet.</h2>
            <p>
              When Studio KRiX shares a gallery with you, it will appear here
              automatically.
            </p>
          </div>
        ) : (
          access.map((entry, index) =>
            entry.galleries ? (
              <Link
                className={styles.gallery}
                href={"/portal/" + entry.galleries.slug}
                key={entry.gallery_id}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>
                    {[entry.galleries.category, entry.galleries.location]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <h2>{entry.galleries.title}</h2>
                  <small>
                    {entry.can_download ? "Downloads enabled" : "View only"}
                  </small>
                </div>
                <b aria-hidden="true">↗</b>
              </Link>
            ) : null,
          )
        )}
      </section>
    </div>
  );
}
