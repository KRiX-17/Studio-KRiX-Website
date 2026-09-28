import type { Metadata } from "next";
import { PortfolioAdminDemo } from "@/components/v2/portfolio-admin-demo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio Admin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminPage() {
  return <PortfolioAdminDemo />;
}
