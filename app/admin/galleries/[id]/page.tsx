import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  ACCESS_COOKIE,
  invokePortalFunction,
} from "@/lib/supabase/auth-rest";
import { GalleryManager } from "@/components/admin/gallery-manager";
import styles from "./gallery.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery Manager",
  robots: { index: false, follow: false },
};

export default async function AdminGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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
      credits: string | null;
      status: string;
      is_featured: boolean;
      cover_asset_id: string | null;
    };
    assets: Array<{
      id: string;
      filename: string;
      alt_text: string;
      caption: string | null;
      sort_order: number;
      preview_url: string | null;
    }>;
    access: Array<{
      user_id: string;
      can_download: boolean;
      can_upload: boolean;
      expires_at: string | null;
    }>;
    clients: Array<{
      id: string;
      email: string | null;
      display_name: string | null;
      role: "client" | "collaborator";
    }>;
  }>("admin-portal", accessToken, {
    action: "gallery_detail",
    body: { galleryId: id },
  });

  if (!result.ok || !result.data?.gallery) notFound();

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <Link href="/admin">← All galleries</Link>
        <span>/{result.data.gallery.slug}</span>
      </div>
      <GalleryManager data={result.data} />
    </div>
  );
}
