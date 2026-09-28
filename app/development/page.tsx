import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Development",
  description: "Apps, tools and software projects by Studio KRiX.",
};

export default function DevelopmentPage() {
  return (
    <div
      style={{
        minHeight: "100svh",
        background: "#08090b",
        color: "#f7f7f5",
        padding: "clamp(5rem, 10vw, 9rem) max(1rem, calc((100vw - 88rem) / 2))",
      }}
    >
      <p style={{ textTransform: "uppercase", letterSpacing: ".22em", fontSize: ".7rem", opacity: .58 }}>
        Studio KRiX / Development
      </p>
      <h1
        style={{
          margin: ".8rem 0 1.25rem",
          fontSize: "clamp(3.6rem, 10vw, 8rem)",
          lineHeight: .9,
          letterSpacing: "-.06em",
          fontWeight: 500,
        }}
      >
        Apps, tools and software.
      </h1>
      <p style={{ maxWidth: "42rem", lineHeight: 1.65, opacity: .66 }}>
        Practical products and experiments, from OhmXact to LaCaz and whatever
        Studio KRiX builds next.
      </p>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(17rem, 1fr))",
          gap: "1rem",
          marginTop: "4rem",
        }}
      >
        <Link
          href="/ohmxact"
          style={{
            minHeight: "25rem",
            border: "1px solid rgba(255,255,255,.14)",
            color: "inherit",
            textDecoration: "none",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "linear-gradient(145deg, #101923, #08090b)",
          }}
        >
          <Image
            src="/images/ohmxact-iphone-dark.png"
            alt="OhmXact on iPhone"
            width={360}
            height={720}
            style={{ width: "auto", height: "15rem", objectFit: "contain", alignSelf: "center" }}
          />
          <div>
            <p style={{ opacity: .55, margin: 0, fontSize: ".72rem", textTransform: "uppercase", letterSpacing: ".14em" }}>
              Available product
            </p>
            <h2 style={{ margin: ".45rem 0 0", fontSize: "2rem" }}>OhmXact</h2>
          </div>
        </Link>

        <Link
          href="/lakaz"
          style={{
            minHeight: "25rem",
            border: "1px solid rgba(255,255,255,.14)",
            color: "inherit",
            textDecoration: "none",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            background: "linear-gradient(145deg, rgba(36,83,82,.42), #08090b)",
          }}
        >
          <p style={{ opacity: .55, margin: 0, fontSize: ".72rem", textTransform: "uppercase", letterSpacing: ".14em" }}>
            In development
          </p>
          <h2 style={{ margin: ".45rem 0 0", fontSize: "2rem" }}>LaCaz</h2>
        </Link>
      </section>
    </div>
  );
}
