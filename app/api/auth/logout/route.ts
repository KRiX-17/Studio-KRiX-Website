import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, signOut } from "@/lib/supabase/auth-rest";
import { clearSessionCookies } from "@/lib/supabase/session-cookies";

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  if (accessToken) await signOut(accessToken);

  return clearSessionCookies(
    NextResponse.redirect(new URL("/", request.url), 303),
  );
}
