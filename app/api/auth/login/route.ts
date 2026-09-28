import { NextRequest, NextResponse } from "next/server";
import {
  getProfile,
  signInWithPassword,
} from "@/lib/supabase/auth-rest";
import { setSessionCookies } from "@/lib/supabase/session-cookies";
import { noStore, rejectCrossOriginPost, safeReturnPath } from "@/lib/supabase/request-security";

export async function POST(request: NextRequest) {
  const crossOrigin = rejectCrossOriginPost(request);
  if (crossOrigin) return crossOrigin;
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const requestedNext = safeReturnPath(String(form.get("next") ?? ""), "/portal");

  const result = await signInWithPassword(email, password);
  const session = result.ok ? result.data : null;

  if (!session?.access_token || !session.refresh_token || !session.user?.id) {
    return NextResponse.redirect(
      new URL("/login?error=invalid", request.url),
      303,
    );
  }

  const profile = await getProfile(session.access_token, session.user.id);
  if (!profile?.is_active) {
    return NextResponse.redirect(
      new URL("/login?error=inactive", request.url),
      303,
    );
  }

  let next = "/portal";
  if (profile.role === "super_admin") {
    const mfa = new URL("/mfa", request.url);
    mfa.searchParams.set("next", requestedNext.startsWith("/admin") ? requestedNext : "/admin");
    next = mfa.pathname + mfa.search;
  } else {
    next = requestedNext;
  }

  return noStore(setSessionCookies(
    NextResponse.redirect(new URL(next, request.url), 303),
    session,
  ));
}
