import type { Metadata } from "next";
import { PhotoStudio } from "@/components/photo-studio";

export const metadata: Metadata = {
  title: "Photography Studio | Studio KRiX",
  robots: { index: false, follow: false },
};

export default function PhotoStudioPage() {
  return <PhotoStudio />;
}
