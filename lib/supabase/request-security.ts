import { NextRequest, NextResponse } from "next/server";

// Cookie-authenticated actions must come from this exact site. SameSite=Lax
// alone does not protect against another origin on the same registrable domain.
export function rejectCrossOriginPost(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }
  return null;
}

export function safeReturnPath(input: string | null | undefined, fallback: string) {
  if (!input?.startsWith("/") || input.startsWith("//") || /[\\\u0000-\u001f]/.test(input)) {
    return fallback;
  }
  try {
    const url = new URL(input, "https://studiokrix.com.au");
    return url.origin === "https://studiokrix.com.au"
      ? url.pathname + url.search
      : fallback;
  } catch {
    return fallback;
  }
}

export function noStore<T extends NextResponse>(response: T): T {
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
