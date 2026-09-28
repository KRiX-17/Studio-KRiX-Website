export type PhotoProjectStatus = "draft" | "published";

export type PhotoProject = {
  id: string;
  slug: string;
  title: string;
  category: "Fashion" | "Portraits" | "Events" | "Creative";
  eventDate: string | null;
  location: string | null;
  description: string | null;
  coverPhotoId: string | null;
  isFeatured: boolean;
  status: PhotoProjectStatus;
  publishedAt: string | null;
  sortOrder: number;
};

export type PortfolioPhoto = {
  id: string;
  projectId: string;
  storagePath: string;
  altText: string;
  caption: string | null;
  width: number | null;
  height: number | null;
  sortOrder: number;
};
