import { randomUUID } from "node:crypto";
import {
  consumeRateLimit,
  markSubmissionSent,
  releaseSubmission,
  requestRateLimitKey,
  reserveSubmission,
} from "@/lib/forms/abuse-protection";
import type { FormMode } from "@/lib/forms/constants";
import {
  sendSubmission,
  submissionServicesConfigured,
} from "@/lib/forms/resend";
import { verifyTurnstile } from "@/lib/forms/turnstile";
import { validateSubmission } from "@/lib/forms/validation";

const bodyLimits: Record<FormMode, number> = {
  contact: 12_000,
  support: 24_000,
};

function jsonResponse(
  requestId: string,
  body: Record<string, unknown>,
  status: number,
  extraHeaders?: Record<string, string>,
) {
  return Response.json(body, {
    headers: {
      "Cache-Control": "no-store",
      "X-Request-ID": requestId,
      ...extraHeaders,
    },
    status,
  });
}

function operationalError(requestId: string, errorClass: string) {
  console.error(`[form:${requestId}] ${errorClass}`);
}

function hasValidOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

async function readRequestBody(request: Request, maximumBytes: number) {
  const statedLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(statedLength) && statedLength > maximumBytes) {
    return { tooLarge: true as const };
  }

  if (!request.body) {
    return { text: "", tooLarge: false as const };
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    bytes += value.byteLength;
    if (bytes > maximumBytes) {
      await reader.cancel();
      return { tooLarge: true as const };
    }

    text += decoder.decode(value, { stream: true });
  }

  text += decoder.decode();
  return { text, tooLarge: false as const };
}

export function methodNotAllowed() {
  return jsonResponse(randomUUID(), { error: "Method not allowed." }, 405, {
    Allow: "POST",
  });
}

export async function handleSubmission(request: Request, mode: FormMode) {
  const requestId = randomUUID();
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";

  if (!contentType.startsWith("application/json")) {
    return jsonResponse(
      requestId,
      { error: "This form only accepts JSON requests." },
      415,
    );
  }

  if (!hasValidOrigin(request)) {
    return jsonResponse(requestId, { error: "The request could not be accepted." }, 403);
  }

  const rateLimit = consumeRateLimit(requestRateLimitKey(request, mode));
  if (!rateLimit.allowed) {
    return jsonResponse(
      requestId,
      { error: "Too many attempts. Please wait before trying again." },
      429,
      { "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  let bodyText: string;
  try {
    const body = await readRequestBody(request, bodyLimits[mode]);
    if (body.tooLarge) {
      return jsonResponse(requestId, { error: "The submitted form is too large." }, 413);
    }
    bodyText = body.text;
  } catch {
    return jsonResponse(requestId, { error: "The request could not be read." }, 400);
  }

  let input: unknown;
  try {
    input = JSON.parse(bodyText);
  } catch {
    return jsonResponse(requestId, { error: "The request could not be read." }, 400);
  }

  const validation = validateSubmission(mode, input);
  if (!validation.success) {
    if (validation.reason === "automated") {
      return jsonResponse(
        requestId,
        { error: "The request could not be accepted. Please try again." },
        400,
      );
    }

    return jsonResponse(
      requestId,
      {
        error: "Please review the highlighted fields.",
        fieldErrors: validation.fieldErrors,
      },
      400,
    );
  }

  if (!submissionServicesConfigured(mode)) {
    return jsonResponse(
      requestId,
      { error: "Messaging is temporarily unavailable. Please try again later." },
      503,
    );
  }

  const requestHostname = new URL(request.url).hostname;
  const turnstile = await verifyTurnstile(
    validation.data.turnstileToken,
    mode,
    requestHostname,
  );
  if (turnstile === "unavailable") {
    operationalError(requestId, "turnstile_unavailable");
    return jsonResponse(
      requestId,
      { error: "Verification is temporarily unavailable. Please try again." },
      503,
    );
  }
  if (turnstile === "invalid") {
    return jsonResponse(
      requestId,
      { error: "Verification expired or was unsuccessful. Please try again." },
      400,
    );
  }

  const reservation = reserveSubmission(mode, validation.data);
  if (reservation.duplicate) {
    return jsonResponse(
      requestId,
      { error: "This message was already submitted recently." },
      409,
    );
  }

  const delivery = await sendSubmission(mode, validation.data);
  if (delivery !== "sent") {
    releaseSubmission(reservation.key);
    operationalError(requestId, `delivery_${delivery}`);
    return jsonResponse(
      requestId,
      { error: "The message could not be sent right now. Please try again later." },
      503,
    );
  }

  markSubmissionSent(reservation.key);
  return jsonResponse(
    requestId,
    {
      message:
        mode === "contact"
          ? "Thanks — your message has been sent."
          : "Thanks — your support request has been sent.",
    },
    200,
  );
}
