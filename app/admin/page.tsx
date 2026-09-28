import type { Metadata } from "next";
import Link from "next/link";
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
  return (
    <>
      <div
        style={{
          background: "#070708",
          color: "#f7f6f3",
          padding: "1rem max(1rem, calc((100vw - 88rem) / 2)) 0",
          display: "flex",
          gap: "1.25rem",
          flexWrap: "wrap",
        }}
      >
        <Link style={{ color: "inherit" }} href="/admin/users">
          Clients & users ↗
        </Link>
        <form action="/api/auth/logout" method="post">
          <button
            style={{
              border: 0,
              padding: 0,
              background: "transparent",
              color: "inherit",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            type="submit"
          >
            Sign out
          </button>
        </form>
      </div>
      <PortfolioAdminDemo />
    </>
  );
}
