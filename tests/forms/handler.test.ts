import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/contact/route";
import { resetAbuseProtectionForTests } from "@/lib/forms/abuse-protection";
import { handleSubmission } from "@/lib/forms/handler";

function validPayload(overrides: Record<string, unknown> = {}) {
  return {
    message: "I would like to discuss a thoughtful Studio KRiX project.",
    name: "Alex Example",
    replyEmail: "alex@example.com",
    startedAt: Date.now() - 5_000,
    subject: "General enquiry",
    turnstileToken: "valid-token",
    website: "",
    ...overrides,
  };
}

function submissionRequest(
  payload: unknown,
  options: { contentType?: string; ip?: string; length?: string } = {},
) {
  const headers = new Headers({
    "Content-Type": options.contentType ?? "application/json",
    Origin: "https://studiokrix.com.au",
    "User-Agent": "vitest",
    "X-Forwarded-For": options.ip ?? "203.0.113.10",
  });
  if (options.length) {
    headers.set("Content-Length", options.length);
  }

  return new Request("https://studiokrix.com.au/api/contact", {
    body: JSON.stringify(payload),
    headers,
    method: "POST",
  });
}

function successfulProviderMock() {
  return vi.fn(async (...args: [string | URL | Request, RequestInit?]) => {
    const [input] = args;
    const url = input instanceof Request ? input.url : String(input);
    if (url.includes("challenges.cloudflare.com")) {
      return Response.json({
        action: "contact",
        hostname: "studiokrix.com.au",
        success: true,
      });
    }
    if (url.includes("api.resend.com")) {
      return Response.json({ id: "message-id" }, { status: 200 });
    }
    throw new Error("Unexpected provider URL");
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

describe("contact endpoint", () => {
  it("rejects GET with 405 and an Allow header", async () => {
    const response = GET();

    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("POST");
  });

  it("rejects non-JSON requests", async () => {
    const response = await handleSubmission(
      submissionRequest(validPayload(), { contentType: "text/plain" }),
      "contact",
    );

    expect(response.status).toBe(415);
  });

  it("rejects an oversized request before parsing", async () => {
    const response = await handleSubmission(
      submissionRequest(validPayload(), { length: "12001" }),
      "contact",
    );

    expect(response.status).toBe(413);
  });

  it("rejects an invalid Turnstile result without calling Resend", async () => {
    const providerFetch = vi.fn(async () =>
      Response.json({ success: false }, { status: 200 }),
    );
    vi.stubGlobal("fetch", providerFetch);

    const response = await handleSubmission(
      submissionRequest(validPayload()),
      "contact",
    );

    expect(response.status).toBe(400);
    expect(providerFetch).toHaveBeenCalledTimes(1);
  });

  it("returns 429 after five attempts in the fallback window", async () => {
    const statuses: number[] = [];
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const response = await handleSubmission(
        submissionRequest({}, { ip: "203.0.113.20" }),
        "contact",
      );
      statuses.push(response.status);
    }

    expect(statuses.slice(0, 5)).toEqual([400, 400, 400, 400, 400]);
    expect(statuses[5]).toBe(429);
  });

  it("sends a validated plain-text message through Resend", async () => {
    const providerFetch = successfulProviderMock();
    vi.stubGlobal("fetch", providerFetch);

    const response = await handleSubmission(
      submissionRequest(validPayload()),
      "contact",
    );

    expect(response.status).toBe(200);
    expect(providerFetch).toHaveBeenCalledTimes(2);
    const resendCall = providerFetch.mock.calls[1];
    const resendOptions = resendCall?.[1] as RequestInit;
    const resendBody = JSON.parse(String(resendOptions.body)) as Record<string, unknown>;
    expect(resendBody).toMatchObject({
      reply_to: "alex@example.com",
      text: expect.stringContaining("Studio KRiX project"),
      to: ["private@example.invalid"],
    });
    expect(resendBody).not.toHaveProperty("html");
  });

  it("suppresses a duplicate submission after the first delivery", async () => {
    const providerFetch = successfulProviderMock();
    vi.stubGlobal("fetch", providerFetch);
    const payload = validPayload();

    const firstResponse = await handleSubmission(
      submissionRequest(payload),
      "contact",
    );
    const duplicateResponse = await handleSubmission(
      submissionRequest({ ...payload, turnstileToken: "valid-token-2" }),
      "contact",
    );

    expect(firstResponse.status).toBe(200);
    expect(duplicateResponse.status).toBe(409);
    expect(providerFetch).toHaveBeenCalledTimes(3);
    expect(
      providerFetch.mock.calls.filter(([input]) =>
        String(input).includes("api.resend.com"),
      ),
    ).toHaveLength(1);
  });

  it("fails safely when Resend rejects the request", async () => {
    const providerFetch = vi.fn(async (input: string | URL | Request) => {
      const url = input instanceof Request ? input.url : String(input);
      if (url.includes("challenges.cloudflare.com")) {
        return Response.json({
          action: "contact",
          hostname: "studiokrix.com.au",
          success: true,
        });
      }
      return Response.json({ error: "provider failure" }, { status: 500 });
    });
    vi.stubGlobal("fetch", providerFetch);
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    const response = await handleSubmission(
      submissionRequest(validPayload()),
      "contact",
    );
    const body = (await response.json()) as { error: string };

    expect(response.status).toBe(503);
    expect(body.error).toBe(
      "The message could not be sent right now. Please try again later.",
    );
  });

  it("fails closed when provider configuration is missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    const response = await handleSubmission(
      submissionRequest(validPayload()),
      "contact",
    );

    expect(response.status).toBe(503);
  });
});
