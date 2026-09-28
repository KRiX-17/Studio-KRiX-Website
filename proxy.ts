import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  getAuthUser,
  getProfile,
} from "@/lib/supabase/auth-rest";

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  const nextPath = request.nextUrl.pathname + request.nextUrl.search;

  if (!accessToken) {
    if (refreshToken) {
      const refreshUrl = new URL("/api/auth/refresh", request.url);
      refreshUrl.searchParams.set("next", nextPath);
      return NextResponse.redirect(refreshUrl);
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", nextPath);
    return NextResponse.redirect(loginUrl);
  }

  const userResult = await getAuthUser(accessToken);
  const user = userResult.ok ? userResult.data : null;

  if (!user?.id) {
    if (refreshToken) {
      const refreshUrl = new URL("/api/auth/refresh", request.url);
      refreshUrl.searchParams.set("next", nextPath);
      return NextResponse.redirect(refreshUrl);
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  const profile = await getProfile(accessToken, user.id);
  if (!profile?.is_active) {
    return NextResponse.redirect(new URL("/login?error=inactive", request.url));
  }

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    profile.role !== "super_admin"
  ) {
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*"],
};
