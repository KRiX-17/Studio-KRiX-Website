import { NextRequest, NextResponse } from "next/server";
import {
  REFRESH_COOKIE,
  refreshAuthSession,
} from "@/lib/supabase/auth-rest";
import {
  clearSessionCookies,
  setSessionCookies,
} from "@/lib/supabase/session-cookies";
import { noStore, safeReturnPath } from "@/lib/supabase/request-security";

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  const next = safeReturnPath(request.nextUrl.searchParams.get("next"), "/portal");

  if (!refreshToken) {
    return noStore(clearSessionCookies(
      NextResponse.redirect(new URL("/login", request.url), 303),
    ));
  }

  const result = await refreshAuthSession(refreshToken);
  const session = result.ok ? result.data : null;

  if (!session?.access_token || !session.refresh_token) {
    return noStore(clearSessionCookies(
      NextResponse.redirect(new URL("/login?error=session", request.url), 303),
    ));
  }

  return noStore(setSessionCookies(
    NextResponse.redirect(new URL(next, request.url), 303),
    session,
  ));
}
