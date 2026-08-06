export const CONTACT_SUBJECTS = [
  "General enquiry",
  "Professional opportunity",
  "Creative collaboration",
  "OhmXact question",
] as const;

export const SUPPORT_PRODUCTS = [
  "OhmXact for iPhone",
  "OhmXact for iPad",
  "Other Studio KRiX software",
] as const;

export const FORM_LIMITS = {
  appVersion: 50,
  deviceModel: 120,
  email: 254,
  issueDescription: 8_000,
  message: 5_000,
  name: 100,
  operatingSystemVersion: 120,
  stepsToReproduce: 5_000,
  turnstileToken: 2_048,
} as const;

export type FormMode = "contact" | "support";
