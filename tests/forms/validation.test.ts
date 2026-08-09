import { describe, expect, it } from "vitest";
import { FORM_LIMITS } from "@/lib/forms/constants";
import { validateSubmission } from "@/lib/forms/validation";

const now = 1_800_000_000_000;

function validContact(overrides: Record<string, unknown> = {}) {
  return {
    message: "I would like to discuss a thoughtful Studio KRiX project.",
    name: "  Alex Example  ",
    replyEmail: "alex@example.com",
    startedAt: now - 5_000,
    subject: "General enquiry",
    turnstileToken: "valid-token",
    website: "",
    ...overrides,
  };
}

describe("contact submission validation", () => {
  it("normalises valid plain-text fields", () => {
    const result = validateSubmission("contact", validContact(), now);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Alex Example");
    }
  });

  it("rejects an invalid reply email", () => {
    const result = validateSubmission(
      "contact",
      validContact({ replyEmail: "not-an-email" }),
      now,
    );

    expect(result).toMatchObject({
      success: false,
      reason: "invalid",
      fieldErrors: { replyEmail: "Enter a valid reply email." },
    });
  });

  it("rejects an oversized message", () => {
    const result = validateSubmission(
      "contact",
      validContact({ message: "x".repeat(FORM_LIMITS.message + 1) }),
      now,
    );

    expect(result).toMatchObject({
      success: false,
      reason: "invalid",
    });
  });

  it("rejects a completed honeypot", () => {
    const result = validateSubmission(
      "contact",
      validContact({ website: "https://bot.example" }),
      now,
    );

    expect(result).toEqual({ success: false, reason: "automated" });
  });

  it("rejects unrealistically fast submissions", () => {
    const result = validateSubmission(
      "contact",
      validContact({ startedAt: now - 500 }),
      now,
    );

    expect(result).toEqual({ success: false, reason: "automated" });
  });

  it("rejects unrecognised fields and subject values", () => {
    const result = validateSubmission(
      "contact",
      validContact({ redirectTo: "https://example.com", subject: "Anything" }),
      now,
    );

    expect(result).toMatchObject({ success: false, reason: "invalid" });
  });
});
