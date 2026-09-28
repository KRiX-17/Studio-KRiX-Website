import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, signOut } from "@/lib/supabase/auth-rest";
import { clearSessionCookies } from "@/lib/supabase/session-cookies";
import { noStore, rejectCrossOriginPost } from "@/lib/supabase/request-security";

export async function POST(request: NextRequest) {
  const crossOrigin = rejectCrossOriginPost(request);
  if (crossOrigin) return crossOrigin;
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  if (accessToken) await signOut(accessToken);

  return noStore(clearSessionCookies(
    NextResponse.redirect(new URL("/", request.url), 303),
  ));
}
