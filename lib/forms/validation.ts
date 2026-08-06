import { z } from "zod";
import {
  CONTACT_SUBJECTS,
  FORM_LIMITS,
  SUPPORT_PRODUCTS,
  type FormMode,
} from "@/lib/forms/constants";

const minimumCompletionTimeMs = 3_000;
const maximumCompletionTimeMs = 2 * 60 * 60 * 1_000;

function normalizeSingleLine(value: unknown) {
  if (typeof value !== "string") {
    return value;
  }

  return value
    .normalize("NFC")
    .replace(/[\u0000-\u001F\u007F]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeMultiline(value: unknown) {
  if (typeof value !== "string") {
    return value;
  }

  return value
    .normalize("NFC")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

const singleLine = (label: string, maximum: number) =>
  z.preprocess(
    normalizeSingleLine,
    z
      .string({ error: `${label} is required.` })
      .min(1, `${label} is required.`)
      .max(maximum, `${label} must be ${maximum} characters or fewer.`),
  );

const multiline = (label: string, maximum: number, minimum = 1) =>
  z.preprocess(
    normalizeMultiline,
    z
      .string({ error: `${label} is required.` })
      .min(minimum, `${label} must be at least ${minimum} characters.`)
      .max(maximum, `${label} must be ${maximum.toLocaleString()} characters or fewer.`),
  );

const sharedShape = {
  name: singleLine("Name", FORM_LIMITS.name),
  replyEmail: z.preprocess(
    normalizeSingleLine,
    z
      .string({ error: "Reply email is required." })
      .min(1, "Reply email is required.")
      .max(FORM_LIMITS.email, "Reply email must be 254 characters or fewer.")
      .email("Enter a valid reply email."),
  ),
  startedAt: z.number().int().positive(),
  turnstileToken: z.preprocess(
    normalizeSingleLine,
    z.string().min(1).max(FORM_LIMITS.turnstileToken),
  ),
  website: z.preprocess(normalizeSingleLine, z.string().max(200)),
};

export const contactSubmissionSchema = z
  .object({
    ...sharedShape,
    message: multiline("Message", FORM_LIMITS.message, 20),
    subject: z.preprocess(normalizeSingleLine, z.enum(CONTACT_SUBJECTS)),
  })
  .strict();

export const supportSubmissionSchema = z
  .object({
    ...sharedShape,
    appVersion: singleLine("App version", FORM_LIMITS.appVersion),
    deviceModel: singleLine("Device model", FORM_LIMITS.deviceModel),
    issueDescription: multiline(
      "Issue description",
      FORM_LIMITS.issueDescription,
      20,
    ),
    operatingSystemVersion: singleLine(
      "Operating-system version",
      FORM_LIMITS.operatingSystemVersion,
    ),
    product: z.preprocess(normalizeSingleLine, z.enum(SUPPORT_PRODUCTS)),
    stepsToReproduce: multiline(
      "Steps to reproduce",
      FORM_LIMITS.stepsToReproduce,
      10,
    ),
  })
  .strict();

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
export type SupportSubmission = z.infer<typeof supportSubmissionSchema>;
export type ValidSubmission = ContactSubmission | SupportSubmission;

type ValidationResult =
  | { success: true; data: ValidSubmission }
  | {
      success: false;
      reason: "automated" | "invalid";
      fieldErrors?: Record<string, string>;
    };

function flattenFieldErrors(error: z.ZodError) {
  const fieldErrors: Record<string, string> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
  }

  return fieldErrors;
}

export function validateSubmission(
  mode: FormMode,
  input: unknown,
  now = Date.now(),
): ValidationResult {
  const schema = mode === "contact" ? contactSubmissionSchema : supportSubmissionSchema;
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      reason: "invalid",
      fieldErrors: flattenFieldErrors(parsed.error),
    };
  }

  const elapsed = now - parsed.data.startedAt;
  if (
    parsed.data.website.length > 0 ||
    elapsed < minimumCompletionTimeMs ||
    elapsed > maximumCompletionTimeMs
  ) {
    return { success: false, reason: "automated" };
  }

  return { success: true, data: parsed.data };
}
