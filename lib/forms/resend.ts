import type { FormMode } from "@/lib/forms/constants";
import type {
  ContactSubmission,
  SupportSubmission,
  ValidSubmission,
} from "@/lib/forms/validation";

const resendEndpoint = "https://api.resend.com/emails";
const resendTimeoutMs = 8_000;
const resendMaximumAttempts = 2;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type DeliveryResult =
  | { status: "sent" }
  | { status: "configuration_error" }
  | { status: "message_build_error" }
  | { errorClass: string; status: "resend_request_error" }
  | { responseStatus: number; status: "resend_rejected" };

function isSafeHeader(value: string | undefined, maximum = 320) {
  return Boolean(
    value &&
      value.length <= maximum &&
      !/[\r\n\u0000]/.test(value),
  );
}

function isDestinationEmail(value: string | undefined) {
  return Boolean(
    value &&
      value.length <= 254 &&
      isSafeHeader(value, 254) &&
      emailPattern.test(value),
  );
}

function destinationFor(mode: FormMode) {
  return mode === "contact"
    ? process.env.CONTACT_TO_EMAIL
    : process.env.SUPPORT_TO_EMAIL;
}

export function submissionServicesConfigured(mode: FormMode) {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.TURNSTILE_SECRET_KEY &&
      isDestinationEmail(destinationFor(mode)) &&
      isSafeHeader(process.env.CONTACT_FROM_EMAIL),
  );
}

function contactEmail(submission: ContactSubmission) {
  return {
    subject: `Studio KRiX contact — ${submission.subject}`,
    text: [
      "New Studio KRiX contact form submission",
      "",
      `Name: ${submission.name}`,
      `Reply email: ${submission.replyEmail}`,
      `Enquiry type: ${submission.subject}`,
      ...(submission.source || submission.medium || submission.campaign
        ? [
            `Campaign source: ${submission.source || "—"}`,
            `Campaign medium: ${submission.medium || "—"}`,
            `Campaign name: ${submission.campaign || "—"}`,
          ]
        : []),
      "",
      "Message:",
      submission.message,
    ].join("\n"),
  };
}

function supportEmail(submission: SupportSubmission) {
  return {
    subject: `Studio KRiX support — ${submission.product}`,
    text: [
      "New Studio KRiX support form submission",
      "",
      `Name: ${submission.name}`,
      `Reply email: ${submission.replyEmail}`,
      `Product: ${submission.product}`,
      `Device model: ${submission.deviceModel}`,
      `Operating-system version: ${submission.operatingSystemVersion}`,
      `App version: ${submission.appVersion}`,
      "",
      "Issue description:",
      submission.issueDescription,
      "",
      "Steps to reproduce:",
      submission.stepsToReproduce,
    ].join("\n"),
  };
}

function safeErrorClass(error: unknown) {
  if (
    error instanceof Error &&
    /^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(error.name)
  ) {
    return error.name;
  }

  return "UnknownError";
}

export async function sendSubmission(
  mode: FormMode,
  submission: ValidSubmission,
  requestId: string,
): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = destinationFor(mode);

  if (
    !apiKey ||
    !isSafeHeader(from) ||
    !isDestinationEmail(to) ||
    !isDestinationEmail(submission.replyEmail)
  ) {
    return { status: "configuration_error" };
  }

  let body: string;
  try {
    const email =
      mode === "contact"
        ? contactEmail(submission as ContactSubmission)
        : supportEmail(submission as SupportSubmission);
    body = JSON.stringify({
      from,
      reply_to: submission.replyEmail,
      subject: email.subject,
      text: email.text,
      to: [to],
    });
  } catch {
    return { status: "message_build_error" };
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "Idempotency-Key": `form/${requestId}`,
  };

  for (let attempt = 1; attempt <= resendMaximumAttempts; attempt += 1) {
    try {
      const response = await fetch(resendEndpoint, {
        body,
        headers,
        method: "POST",
        signal: AbortSignal.timeout(resendTimeoutMs),
      });

      if (response.ok) {
        return { status: "sent" };
      }
      if (response.status < 500 || attempt === resendMaximumAttempts) {
        return { responseStatus: response.status, status: "resend_rejected" };
      }
    } catch (error) {
      if (attempt === resendMaximumAttempts) {
        return {
          errorClass: safeErrorClass(error),
          status: "resend_request_error",
        };
      }
    }
  }

  return { errorClass: "UnknownError", status: "resend_request_error" };
}
