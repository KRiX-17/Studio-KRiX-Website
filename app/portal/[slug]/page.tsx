import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  ACCESS_COOKIE,
  invokePortalFunction,
} from "@/lib/supabase/auth-rest";
import { ClientGallery } from "@/components/portal/client-gallery";
import styles from "./gallery.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Private Gallery",
  robots: { index: false, follow: false },
};

export default async function ClientGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const accessToken = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!accessToken) redirect("/login");

  const result = await invokePortalFunction<{
    gallery: {
      id: string;
      slug: string;
      title: string;
      description: string | null;
      category: string | null;
      event_date: string | null;
      location: string | null;
      status: string;
    };
    canDownload: boolean;
    assets: Array<{
      id: string;
      filename: string;
      alt_text: string;
      caption: string | null;
      preview_url: string | null;
      is_downloadable: boolean;
    }>;
    selections: Array<{ asset_id: string; selected: boolean }>;
    comments: Array<{
      id: string;
      asset_id: string | null;
      user_id: string;
      body: string;
      is_resolved: boolean;
      created_at: string;
    }>;
  }>("client-portal", accessToken, {
    action: "gallery",
    body: { slug },
  });

  if (!result.ok || !result.data?.gallery) notFound();

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <Link href="/portal">← Your galleries</Link>
        <span>Studio KRiX / Private</span>
      </div>
      <ClientGallery data={result.data} />
    </div>
  );
}
