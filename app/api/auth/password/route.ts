import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  updatePassword,
} from "@/lib/supabase/auth-rest";

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url), 303);
  }

  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  const confirm = String(form.get("confirm") ?? "");

  if (password.length < 12 || password !== confirm) {
    return NextResponse.redirect(
      new URL("/auth/invite?error=password", request.url),
      303,
    );
  }

  const result = await updatePassword(accessToken, password);
  if (!result.ok) {
    return NextResponse.redirect(
      new URL("/auth/invite?error=password", request.url),
      303,
    );
  }

  return NextResponse.redirect(new URL("/portal", request.url), 303);
}
