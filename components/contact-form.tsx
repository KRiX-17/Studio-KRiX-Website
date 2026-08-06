"use client";

import Script from "next/script";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  CONTACT_SUBJECTS,
  FORM_LIMITS,
  SUPPORT_PRODUCTS,
  type FormMode,
} from "@/lib/forms/constants";

type TurnstileApi = {
  remove(widgetId: string): void;
  render(
    container: HTMLElement,
    options: {
      action: FormMode;
      callback(token: string): void;
      "error-callback"(): void;
      "expired-callback"(): void;
      sitekey: string;
      theme: "auto";
    },
  ): string;
  reset(widgetId: string): void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type FieldErrors = Record<string, string>;

type FormFieldProps = {
  autoComplete?: string;
  error?: string;
  label: string;
  maxLength: number;
  minLength?: number;
  name: string;
  placeholder?: string;
  type?: "email" | "text";
};

function FormField({
  autoComplete,
  error,
  label,
  maxLength,
  minLength,
  name,
  placeholder,
  type = "text",
}: FormFieldProps) {
  const errorId = `${name}-error`;
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        id={name}
        maxLength={maxLength}
        minLength={minLength}
        name={name}
        placeholder={placeholder}
        type={type}
      />
      {error ? (
        <span className="form-field__error" id={errorId}>
          {error}
        </span>
      ) : null}
    </div>
  );
}

type TurnstileWidgetProps = {
  action: FormMode;
  onError(): void;
  onToken(token: string): void;
  resetCount: number;
  siteKey: string;
};

function TurnstileWidget({
  action,
  onError,
  onToken,
  resetCount,
  siteKey,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || widgetIdRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      action,
      callback: onToken,
      "error-callback": onError,
      "expired-callback": onError,
      sitekey: siteKey,
      theme: "auto",
    });
  }, [action, onError, onToken, siteKey]);

  useEffect(() => {
    renderWidget();
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [renderWidget]);

  useEffect(() => {
    if (resetCount > 0 && widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetCount]);

  return (
    <>
      <Script
        id="cloudflare-turnstile"
        onLoad={renderWidget}
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
      />
      <div
        aria-label="Anti-bot verification"
        className="turnstile-widget"
        ref={containerRef}
      />
    </>
  );
}

function validateClientForm(mode: FormMode, formData: FormData) {
  const errors: FieldErrors = {};
  const value = (name: string) => String(formData.get(name) ?? "").trim();
  const required = (name: string, label: string, minimum = 1) => {
    if (value(name).length < minimum) {
      errors[name] =
        minimum > 1
          ? `${label} must be at least ${minimum} characters.`
          : `${label} is required.`;
    }
  };

  required("name", "Name");
  required("replyEmail", "Reply email");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("replyEmail"))) {
    errors.replyEmail = "Enter a valid reply email.";
  }

  if (mode === "contact") {
    required("subject", "Enquiry type");
    required("message", "Message", 20);
  } else {
    required("product", "Product");
    required("deviceModel", "Device model");
    required("operatingSystemVersion", "Operating-system version");
    required("appVersion", "App version");
    required("issueDescription", "Issue description", 20);
    required("stepsToReproduce", "Steps to reproduce", 10);
  }

  return errors;
}

type ContactFormProps = {
  mode: FormMode;
};

export function ContactForm({ mode }: ContactFormProps) {
  const formId = useId();
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");
  const [resetCount, setResetCount] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<{
    kind: "error" | "idle" | "success";
    message: string;
  }>({ kind: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const handleToken = useCallback((token: string) => {
    setTurnstileToken(token);
    setTurnstileError("");
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken("");
    setTurnstileError("Verification expired or was unsuccessful. Please try again.");
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const errors = validateClientForm(mode, formData);
    if (!turnstileToken) {
      setTurnstileError("Complete the anti-bot verification before sending.");
    }
    if (Object.keys(errors).length > 0 || !turnstileToken) {
      setFieldErrors(errors);
      setStatus({ kind: "error", message: "Please review the highlighted fields." });
      return;
    }

    setFieldErrors({});
    setStatus({ kind: "idle", message: "" });
    setIsSubmitting(true);

    const common = {
      name: String(formData.get("name") ?? ""),
      replyEmail: String(formData.get("replyEmail") ?? ""),
      startedAt,
      turnstileToken,
      website: String(formData.get("website") ?? ""),
    };
    const payload =
      mode === "contact"
        ? {
            ...common,
            message: String(formData.get("message") ?? ""),
            subject: String(formData.get("subject") ?? ""),
          }
        : {
            ...common,
            appVersion: String(formData.get("appVersion") ?? ""),
            deviceModel: String(formData.get("deviceModel") ?? ""),
            issueDescription: String(formData.get("issueDescription") ?? ""),
            operatingSystemVersion: String(
              formData.get("operatingSystemVersion") ?? "",
            ),
            product: String(formData.get("product") ?? ""),
            stepsToReproduce: String(formData.get("stepsToReproduce") ?? ""),
          };

    try {
      const response = await fetch(`/api/${mode}`, {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const result = (await response.json()) as {
        error?: string;
        fieldErrors?: FieldErrors;
        message?: string;
      };

      setResetCount((count) => count + 1);
      setTurnstileToken("");

      if (!response.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setStatus({
          kind: "error",
          message: result.error ?? "The form could not be sent. Please try again.",
        });
        return;
      }

      form.reset();
      setStartedAt(Date.now());
      setStatus({
        kind: "success",
        message: result.message ?? "Thanks — your message has been sent.",
      });
    } catch {
      setResetCount((count) => count + 1);
      setTurnstileToken("");
      setStatus({
        kind: "error",
        message: "The form is temporarily unavailable. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const descriptionId = `${formId}-description`;

  return (
    <form
      aria-busy={isSubmitting}
      aria-describedby={descriptionId}
      className="contact-form-shell"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="contact-form-shell__heading">
        <h2>{mode === "contact" ? "Send a private message." : "Describe the issue."}</h2>
        <p id={descriptionId}>
          {mode === "contact"
            ? "Your details are sent securely and used only to respond to this enquiry."
            : "Include only the technical detail needed to investigate. Do not send passwords or other sensitive information."}
        </p>
      </div>

      <div className="form-grid form-grid--two">
        <FormField
          autoComplete="name"
          error={fieldErrors.name}
          label="Name"
          maxLength={FORM_LIMITS.name}
          name="name"
        />
        <FormField
          autoComplete="email"
          error={fieldErrors.replyEmail}
          label="Reply email"
          maxLength={FORM_LIMITS.email}
          name="replyEmail"
          type="email"
        />
      </div>

      {mode === "contact" ? (
        <>
          <div className="form-field">
            <label htmlFor="subject">Subject or enquiry type</label>
            <select
              aria-describedby={fieldErrors.subject ? "subject-error" : undefined}
              aria-invalid={Boolean(fieldErrors.subject)}
              defaultValue=""
              id="subject"
              name="subject"
            >
              <option disabled value="">
                Choose an enquiry type
              </option>
              {CONTACT_SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            {fieldErrors.subject ? (
              <span className="form-field__error" id="subject-error">
                {fieldErrors.subject}
              </span>
            ) : null}
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              aria-describedby={fieldErrors.message ? "message-error" : undefined}
              aria-invalid={Boolean(fieldErrors.message)}
              id="message"
              maxLength={FORM_LIMITS.message}
              name="message"
              rows={8}
            />
            <span className="form-field__hint">Maximum 5,000 characters.</span>
            {fieldErrors.message ? (
              <span className="form-field__error" id="message-error">
                {fieldErrors.message}
              </span>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <div className="form-field">
            <label htmlFor="product">Product</label>
            <select
              aria-describedby={fieldErrors.product ? "product-error" : undefined}
              aria-invalid={Boolean(fieldErrors.product)}
              defaultValue=""
              id="product"
              name="product"
            >
              <option disabled value="">
                Choose a product
              </option>
              {SUPPORT_PRODUCTS.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
            {fieldErrors.product ? (
              <span className="form-field__error" id="product-error">
                {fieldErrors.product}
              </span>
            ) : null}
          </div>
          <div className="form-grid form-grid--two">
            <FormField
              error={fieldErrors.deviceModel}
              label="Device model"
              maxLength={FORM_LIMITS.deviceModel}
              name="deviceModel"
              placeholder="For example, iPhone 17"
            />
            <FormField
              error={fieldErrors.operatingSystemVersion}
              label="Operating-system version"
              maxLength={FORM_LIMITS.operatingSystemVersion}
              name="operatingSystemVersion"
              placeholder="For example, iOS 26.1"
            />
          </div>
          <FormField
            error={fieldErrors.appVersion}
            label="App version"
            maxLength={FORM_LIMITS.appVersion}
            name="appVersion"
            placeholder="Shown in the app or App Store"
          />
          <div className="form-field">
            <label htmlFor="issueDescription">Issue description</label>
            <textarea
              aria-describedby={
                fieldErrors.issueDescription ? "issueDescription-error" : undefined
              }
              aria-invalid={Boolean(fieldErrors.issueDescription)}
              id="issueDescription"
              maxLength={FORM_LIMITS.issueDescription}
              name="issueDescription"
              rows={8}
            />
            <span className="form-field__hint">Maximum 8,000 characters.</span>
            {fieldErrors.issueDescription ? (
              <span className="form-field__error" id="issueDescription-error">
                {fieldErrors.issueDescription}
              </span>
            ) : null}
          </div>
          <div className="form-field">
            <label htmlFor="stepsToReproduce">Steps to reproduce</label>
            <textarea
              aria-describedby={
                fieldErrors.stepsToReproduce ? "stepsToReproduce-error" : undefined
              }
              aria-invalid={Boolean(fieldErrors.stepsToReproduce)}
              id="stepsToReproduce"
              maxLength={FORM_LIMITS.stepsToReproduce}
              name="stepsToReproduce"
              rows={6}
            />
            {fieldErrors.stepsToReproduce ? (
              <span className="form-field__error" id="stepsToReproduce-error">
                {fieldErrors.stepsToReproduce}
              </span>
            ) : null}
          </div>
        </>
      )}

      <div aria-hidden="true" className="form-honeypot">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          autoComplete="off"
          id={`${formId}-website`}
          name="website"
          tabIndex={-1}
          type="text"
        />
      </div>

      <div className="form-verification">
        <p>Anti-bot verification</p>
        {siteKey ? (
          <TurnstileWidget
            action={mode}
            onError={handleTurnstileError}
            onToken={handleToken}
            resetCount={resetCount}
            siteKey={siteKey}
          />
        ) : (
          <p className="form-unavailable" role="status">
            Secure messaging is not configured yet.
          </p>
        )}
        {turnstileError ? (
          <span className="form-field__error" role="alert">
            {turnstileError}
          </span>
        ) : null}
      </div>

      {status.message ? (
        <div
          className={`form-status form-status--${status.kind}`}
          role={status.kind === "error" ? "alert" : "status"}
        >
          {status.message}
        </div>
      ) : null}

      <button
        className="form-submit"
        disabled={isSubmitting || !siteKey}
        type="submit"
      >
        {isSubmitting
          ? "Sending…"
          : mode === "contact"
            ? "Send message"
            : "Send support request"}
      </button>
    </form>
  );
}
