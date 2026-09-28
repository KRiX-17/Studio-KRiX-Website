import { NextRequest, NextResponse } from "next/server";
import {
  REFRESH_COOKIE,
  refreshAuthSession,
} from "@/lib/supabase/auth-rest";
import {
  clearSessionCookies,
  setSessionCookies,
} from "@/lib/supabase/session-cookies";

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  const requestedNext = request.nextUrl.searchParams.get("next") ?? "/portal";
  const next =
    requestedNext.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/portal";

  if (!refreshToken) {
    return clearSessionCookies(
      NextResponse.redirect(new URL("/login", request.url), 303),
    );
  }

  const result = await refreshAuthSession(refreshToken);
  const session = result.ok ? result.data : null;

  if (!session?.access_token || !session.refresh_token) {
    return clearSessionCookies(
      NextResponse.redirect(new URL("/login?error=session", request.url), 303),
    );
  }

  return setSessionCookies(
    NextResponse.redirect(new URL(next, request.url), 303),
    session,
  );
}
