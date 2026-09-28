import { invokePublicFunction } from "@/lib/supabase/auth-rest";

export type PublicGallerySummary = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  event_date: string | null;
  location: string | null;
  is_featured: boolean;
  published_at: string | null;
  cover_url: string | null;
  cover_alt: string;
};

export type PublicGalleryDetail = {
  gallery: {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    category: string | null;
    event_date: string | null;
    location: string | null;
    published_at: string | null;
  };
  assets: Array<{
    id: string;
    alt_text: string;
    caption: string | null;
    width: number | null;
    height: number | null;
    sort_order: number;
    url: string | null;
  }>;
};

export async function getPublicGalleries() {
  const result = await invokePublicFunction<{
    galleries: PublicGallerySummary[];
  }>("public-portfolio", { action: "feed", body: {} });

  return result.ok ? result.data?.galleries ?? [] : [];
}

export async function getPublicGallery(slug: string) {
  const result = await invokePublicFunction<PublicGalleryDetail>(
    "public-portfolio",
    { action: "gallery", body: { slug } },
  );

  return result.ok ? result.data ?? null : null;
}
