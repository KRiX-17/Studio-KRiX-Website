import type { FormMode } from "@/lib/forms/constants";
import type {
  ContactSubmission,
  SupportSubmission,
  ValidSubmission,
} from "@/lib/forms/validation";

const resendEndpoint = "https://api.resend.com/emails";
const resendTimeoutMs = 8_000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export async function sendSubmission(
  mode: FormMode,
  submission: ValidSubmission,
) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = destinationFor(mode);

  if (
    !apiKey ||
    !isSafeHeader(from) ||
    !isDestinationEmail(to) ||
    !isDestinationEmail(submission.replyEmail)
  ) {
    return "unavailable" as const;
  }

  const email =
    mode === "contact"
      ? contactEmail(submission as ContactSubmission)
      : supportEmail(submission as SupportSubmission);

  try {
    const response = await fetch(resendEndpoint, {
      body: JSON.stringify({
        from,
        reply_to: submission.replyEmail,
        subject: email.subject,
        text: email.text,
        to: [to],
      }),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      signal: AbortSignal.timeout(resendTimeoutMs),
    });

    return response.ok ? ("sent" as const) : ("failed" as const);
  } catch {
    return "failed" as const;
  }
}
