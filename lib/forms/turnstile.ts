import type { FormMode } from "@/lib/forms/constants";

const siteverifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const siteverifyTimeoutMs = 5_000;

type SiteverifyResponse = {
  action?: unknown;
  hostname?: unknown;
  success?: unknown;
};

export async function verifyTurnstile(
  token: string,
  expectedAction: FormMode,
  expectedHostname: string,
) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return "unavailable" as const;
  }

  try {
    const response = await fetch(siteverifyUrl, {
      body: new URLSearchParams({ response: token, secret }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      signal: AbortSignal.timeout(siteverifyTimeoutMs),
    });

    if (!response.ok) {
      return "unavailable" as const;
    }

    const result = (await response.json()) as SiteverifyResponse;
    if (
      result.success !== true ||
      result.action !== expectedAction ||
      result.hostname !== expectedHostname
    ) {
      return "invalid" as const;
    }

    return "verified" as const;
  } catch {
    return "unavailable" as const;
  }
}
