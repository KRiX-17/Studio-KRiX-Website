import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { resetAbuseProtectionForTests } from "@/lib/forms/abuse-protection";
import { handleSubmission } from "@/lib/forms/handler";

const productionFailureShape = {
  appVersion: "PR 6 Production",
  deviceModel: "Production smoke device",
  issueDescription:
    "Production release smoke test for the protected support delivery path.",
  name: "Studio KRiX PR 6 Production",
  operatingSystemVersion: "Production smoke OS",
  product: "OhmXact for iPhone",
  replyEmail: "pr6.production.20260809@example.com",
  startedAt: Date.now() - 5_000,
  stepsToReproduce:
    "Submit this protected Production smoke-test support request.",
  turnstileToken: "valid-support-token",
  website: "",
};

function supportRequest() {
  return new Request("https://studiokrix.com.au/api/support", {
    body: JSON.stringify(productionFailureShape),
    headers: {
      "Content-Type": "application/json",
      Origin: "https://studiokrix.com.au",
      "User-Agent": "vitest",
      "X-Forwarded-For": "203.0.113.40",
    },
    method: "POST",
  });
}

function verifiedTurnstileResponse() {
  return Response.json({
    action: "support",
    hostname: "studiokrix.com.au",
    success: true,
  });
}

beforeEach(() => {
  resetAbuseProtectionForTests();
  vi.stubEnv("CONTACT_FROM_EMAIL", "Studio KRiX <forms@send.example.invalid>");
  vi.stubEnv("CONTACT_TO_EMAIL", "private@example.invalid");
  vi.stubEnv("RESEND_API_KEY", "test-resend-key");
  vi.stubEnv("SUPPORT_TO_EMAIL", "support@example.invalid");
  vi.stubEnv("TURNSTILE_SECRET_KEY", "test-turnstile-secret");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("support delivery", () => {
  it("retries one transient Resend request failure without duplicating the email", async () => {
    let resendAttempts = 0;
    const providerFetch = vi.fn(
      async (...args: [string | URL | Request, RequestInit?]) => {
        const [input] = args;
        const url = input instanceof Request ? input.url : String(input);
        if (url.includes("challenges.cloudflare.com")) {
          return verifiedTurnstileResponse();
        }

        resendAttempts += 1;
        if (resendAttempts === 1) {
          throw new DOMException("The operation timed out", "TimeoutError");
        }
        return Response.json({ id: "support-message-id" }, { status: 200 });
      },
    );
    vi.stubGlobal("fetch", providerFetch);

    const response = await handleSubmission(supportRequest(), "support");

    expect(response.status).toBe(200);
    const resendCalls = providerFetch.mock.calls.filter(([input]) =>
      String(input).includes("api.resend.com"),
    );
    expect(resendCalls).toHaveLength(2);

    const firstHeaders = new Headers(resendCalls[0]?.[1]?.headers);
    const secondHeaders = new Headers(resendCalls[1]?.[1]?.headers);
    const idempotencyKey = firstHeaders.get("Idempotency-Key");
    expect(idempotencyKey).toMatch(/^form\/[0-9a-f-]{36}$/);
    expect(secondHeaders.get("Idempotency-Key")).toBe(idempotencyKey);

    const body = JSON.parse(String(resendCalls[1]?.[1]?.body)) as Record<
      string,
      unknown
    >;
    expect(body).toMatchObject({
      reply_to: productionFailureShape.replyEmail,
      subject: "Studio KRiX support — OhmXact for iPhone",
      text: expect.stringContaining(productionFailureShape.issueDescription),
      to: ["support@example.invalid"],
    });
    expect(body).not.toHaveProperty("html");
  });

  it("distinguishes a Resend rejection from a request failure", async () => {
    const providerFetch = vi.fn(async (input: string | URL | Request) => {
      const url = input instanceof Request ? input.url : String(input);
      return url.includes("challenges.cloudflare.com")
        ? verifiedTurnstileResponse()
        : Response.json({ error: "provider rejection" }, { status: 422 });
    });
    vi.stubGlobal("fetch", providerFetch);
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const response = await handleSubmission(supportRequest(), "support");

    expect(response.status).toBe(503);
    expect(errorLog).toHaveBeenCalledWith(
      expect.stringMatching(/resend_rejected status=422$/),
    );
  });

  it("records the safe exception class when both Resend requests fail", async () => {
    const providerFetch = vi.fn(async (input: string | URL | Request) => {
      const url = input instanceof Request ? input.url : String(input);
      if (url.includes("challenges.cloudflare.com")) {
        return verifiedTurnstileResponse();
      }
      throw new DOMException("The operation timed out", "TimeoutError");
    });
    vi.stubGlobal("fetch", providerFetch);
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const response = await handleSubmission(supportRequest(), "support");

    expect(response.status).toBe(503);
    expect(
      providerFetch.mock.calls.filter(([input]) =>
        String(input).includes("api.resend.com"),
      ),
    ).toHaveLength(2);
    expect(errorLog).toHaveBeenCalledWith(
      expect.stringMatching(/resend_request_error error=TimeoutError$/),
    );
  });

  it("logs configuration errors without printing environment values", async () => {
    vi.stubEnv("SUPPORT_TO_EMAIL", "");
    const providerFetch = vi.fn();
    vi.stubGlobal("fetch", providerFetch);
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const response = await handleSubmission(supportRequest(), "support");

    expect(response.status).toBe(503);
    expect(providerFetch).not.toHaveBeenCalled();
    expect(errorLog).toHaveBeenCalledWith(
      expect.stringMatching(/configuration_error$/),
    );
  });
});
