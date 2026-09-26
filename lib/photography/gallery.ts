import { createClient } from "@supabase/supabase-js";

export type GalleryPhoto = {
  id: string;
  title: string;
  alt_text: string;
  caption: string | null;
  collection: string;
  location: string | null;
  image_path: string;
  created_at: string;
  imageUrl: string;
};

export const PHOTO_BUCKET = "studio-photography";

export function photoConfiguration() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return url && key ? { url, key } : null;
}

export async function getPublishedPhotos(): Promise<GalleryPhoto[]> {
  const config = photoConfiguration();
  if (!config) return [];

  const client = createClient(config.url, config.key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await client
    .from("photographs")
    .select("id,title,alt_text,caption,collection,location,image_path,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Photography gallery unavailable:", error.message);
    return [];
  }

  return (data ?? []).map((photo) => ({
    ...photo,
    imageUrl: client.storage.from(PHOTO_BUCKET).getPublicUrl(photo.image_path).data.publicUrl,
  }));
}
