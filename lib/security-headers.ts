const cloudflareTurnstileOrigin = "https://challenges.cloudflare.com";
const supabaseOrigin = "https://vvigsolnmebfbaztpixd.supabase.co";

export function createContentSecurityPolicy(isProduction: boolean) {
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' ${cloudflareTurnstileOrigin}`,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: ${supabaseOrigin}`,
    "font-src 'self'",
    `connect-src 'self' ${cloudflareTurnstileOrigin} ${supabaseOrigin}`,
    `frame-src ${cloudflareTurnstileOrigin}`,
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "manifest-src 'self'",
    `media-src 'self' ${supabaseOrigin}`,
  ];

  if (isProduction) {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}

export function createSecurityHeaders(isProduction: boolean) {
  const headers = [
    {
      key: "Content-Security-Policy",
      value: createContentSecurityPolicy(isProduction),
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
    { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=(), payment=(), usb=()" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
  ];

  if (isProduction) {
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains",
    });
  }

  return headers;
}
