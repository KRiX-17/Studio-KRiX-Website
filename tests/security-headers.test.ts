import { describe, expect, it } from "vitest";
import {
  createContentSecurityPolicy,
  createSecurityHeaders,
} from "@/lib/security-headers";

describe("security headers", () => {
  it("builds a restrictive production CSP with only required Turnstile origins", () => {
    const policy = createContentSecurityPolicy(true);

    expect(policy).toContain("default-src 'self'");
    expect(policy).toContain("object-src 'none'");
    expect(policy).toContain("base-uri 'self'");
    expect(policy).toContain("frame-ancestors 'none'");
    expect(policy).toContain("form-action 'self'");
    expect(policy).toContain(
      "frame-src https://challenges.cloudflare.com",
    );
    expect(policy).toContain("upgrade-insecure-requests");
    expect(policy).not.toMatch(/(?:^| )https:(?: |;|$)/);
    expect(policy).not.toContain("*");
  });

  it("includes the expected browser hardening headers", () => {
    const headers = new Map(
      createSecurityHeaders(true).map(({ key, value }) => [key, value]),
    );

    expect(headers.get("Strict-Transport-Security")).toContain("max-age=63072000");
    expect(headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(headers.get("Referrer-Policy")).toBe(
      "strict-origin-when-cross-origin",
    );
    expect(headers.get("Cross-Origin-Opener-Policy")).toBe("same-origin");
    expect(headers.get("Cross-Origin-Resource-Policy")).toBe("same-origin");
    expect(headers.get("X-Frame-Options")).toBe("DENY");
  });

  it("does not add HSTS or upgrade-insecure-requests in development", () => {
    expect(createContentSecurityPolicy(false)).not.toContain(
      "upgrade-insecure-requests",
    );
    expect(
      createSecurityHeaders(false).some(
        ({ key }) => key === "Strict-Transport-Security",
      ),
    ).toBe(false);
  });
});
