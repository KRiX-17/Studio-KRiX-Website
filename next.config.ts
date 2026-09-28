import type { NextConfig } from "next";
import { createSecurityHeaders } from "./lib/security-headers";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: createSecurityHeaders(isProduction),
      },
      {
        source: "/claim",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "Cache-Control", value: "private, no-store" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "private, no-store" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "studiokrix.com" }],
        destination: "https://studiokrix.com.au/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.studiokrix.com" }],
        destination: "https://studiokrix.com.au/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.studiokrix.com.au" }],
        destination: "https://studiokrix.com.au/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 92],
    remotePatterns: [{
      protocol: "https",
      hostname: "vvigsolnmebfbaztpixd.supabase.co",
      pathname: "/storage/v1/object/public/portfolio-public/**",
    }],
  },
};

export default nextConfig;
