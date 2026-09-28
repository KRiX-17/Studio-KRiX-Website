import { NextResponse } from "next/server";
import { ACCESS_COOKIE, REFRESH_COOKIE, type AuthSession } from "@/lib/supabase/auth-rest";

const base = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
};

export function setSessionCookies(response: NextResponse, session: AuthSession) {
  response.cookies.set(ACCESS_COOKIE, session.access_token, {
    ...base,
    maxAge: Math.max(60, session.expires_in || 3600),
  });
  response.cookies.set(REFRESH_COOKIE, session.refresh_token, {
    ...base,
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

export function clearSessionCookies(response: NextResponse) {
  response.cookies.set(ACCESS_COOKIE, "", { ...base, maxAge: 0 });
  response.cookies.set(REFRESH_COOKIE, "", { ...base, maxAge: 0 });
  return response;
}
