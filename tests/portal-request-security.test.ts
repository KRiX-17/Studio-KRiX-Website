import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { rejectCrossOriginPost, safeReturnPath } from "@/lib/supabase/request-security";
import { validImageTicket } from "@/supabase/functions/_shared/image-upload";

describe("portal request boundaries", () => {
  it("rejects same-site subdomains and missing origins for cookie actions", () => {
    for (const origin of ["https://evil.studiokrix.com.au", "https://other.example", null]) {
      const request = new NextRequest("https://studiokrix.com.au/api/admin/portal", {
        method: "POST",
        headers: origin ? { origin } : {},
      });
      expect(rejectCrossOriginPost(request)?.status).toBe(403);
    }
    expect(rejectCrossOriginPost(new NextRequest("https://studiokrix.com.au/api/admin/portal", {
      method: "POST",
      headers: { origin: "https://studiokrix.com.au" },
    }))).toBeNull();
  });

  it("keeps post-login redirects on local paths", () => {
    expect(safeReturnPath("/portal/assigned?tab=photos", "/portal")).toBe("/portal/assigned?tab=photos");
    for (const value of ["//evil.example", "/\\evil.example", "https://evil.example", "/admin\nLocation: evil.example"]) {
      expect(safeReturnPath(value, "/portal")).toBe("/portal");
    }
  });

  it("requires matching image MIME, extension and bounded positive size", () => {
    expect(validImageTicket("portrait.jpg", "image/jpeg", 1000, "original")).toBe(true);
    expect(validImageTicket("portrait-web.webp", "image/webp", 1000, "web")).toBe(true);
    expect(validImageTicket("portrait.html", "image/jpeg", 1000, "original")).toBe(false);
    expect(validImageTicket("portrait.png", "image/png", -1, "original")).toBe(false);
    expect(validImageTicket("portrait.jpg", "image/jpeg", 1000, "web")).toBe(false);
  });
});
