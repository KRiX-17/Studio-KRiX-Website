import { createHash, randomBytes } from "node:crypto";
import type { FormMode } from "@/lib/forms/constants";
import type { ValidSubmission } from "@/lib/forms/validation";

const rateLimitWindowMs = 10 * 60 * 1_000;
const rateLimitMaximum = 5;
const duplicateWindowMs = 10 * 60 * 1_000;
const runtimeSalt = randomBytes(32);

type RateEntry = { count: number; resetAt: number };
type DuplicateEntry = { expiresAt: number; state: "pending" | "sent" };

const rateEntries = new Map<string, RateEntry>();
const duplicateEntries = new Map<string, DuplicateEntry>();
const duplicateIgnoredFields = new Set(["startedAt", "turnstileToken", "website"]);

function digest(value: string) {
  return createHash("sha256").update(runtimeSalt).update(value).digest("hex");
}

function pruneExpired<Entry extends { expiresAt?: number; resetAt?: number }>(
  entries: Map<string, Entry>,
  now: number,
) {
  if (entries.size < 1_000) {
    return;
  }

  for (const [key, entry] of entries) {
    const expiry = entry.expiresAt ?? entry.resetAt ?? 0;
    if (expiry <= now) {
      entries.delete(key);
    }
  }

  while (entries.size > 2_000) {
    const oldestKey = entries.keys().next().value;
    if (typeof oldestKey !== "string") {
      break;
    }
    entries.delete(oldestKey);
  }
}

export function requestRateLimitKey(request: Request, mode: FormMode) {
  const forwarded =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for") ??
    "unknown";
  const clientAddress = forwarded.split(",", 1)[0]?.trim() || "unknown";
  const clientIdentity =
    clientAddress === "unknown"
      ? request.headers.get("user-agent") ?? "unknown"
      : clientAddress;

  return digest(`${mode}:${clientIdentity}`);
}

export function consumeRateLimit(key: string, now = Date.now()) {
  pruneExpired(rateEntries, now);
  const existing = rateEntries.get(key);

  if (!existing || existing.resetAt <= now) {
    rateEntries.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return { allowed: true as const, retryAfterSeconds: 0 };
  }

  if (existing.count >= rateLimitMaximum) {
    return {
      allowed: false as const,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1_000)),
    };
  }

  existing.count += 1;
  return { allowed: true as const, retryAfterSeconds: 0 };
}

export function reserveSubmission(
  mode: FormMode,
  submission: ValidSubmission,
  now = Date.now(),
) {
  pruneExpired(duplicateEntries, now);
  const content = Object.fromEntries(
    Object.entries(submission).filter(
      ([field]) => !duplicateIgnoredFields.has(field),
    ),
  );
  const key = digest(`${mode}:${JSON.stringify(content)}`);
  const existing = duplicateEntries.get(key);

  if (existing && existing.expiresAt > now) {
    return { duplicate: true as const, key };
  }

  duplicateEntries.set(key, {
    expiresAt: now + duplicateWindowMs,
    state: "pending",
  });
  return { duplicate: false as const, key };
}

export function markSubmissionSent(key: string) {
  const entry = duplicateEntries.get(key);
  if (entry) {
    entry.state = "sent";
  }
}

export function releaseSubmission(key: string) {
  const entry = duplicateEntries.get(key);
  if (entry?.state === "pending") {
    duplicateEntries.delete(key);
  }
}

export function resetAbuseProtectionForTests() {
  rateEntries.clear();
  duplicateEntries.clear();
}
