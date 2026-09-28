import type { Metadata } from "next";
import { DisciplinePortal } from "@/components/v2/discipline-portal";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { alternates: { canonical: siteConfig.url } };

export default function HomePage() {
  return <DisciplinePortal />;
}
