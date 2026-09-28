import { NextResponse } from "next/server";
import {
  SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_URL,
} from "@/lib/supabase/auth-rest";

export async function POST(request: Request) {
  const form = await request.formData();
  const displayName = String(form.get("displayName") ?? "").trim();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const confirm = String(form.get("confirm") ?? "");
  const secret = String(form.get("secret") ?? "");

  if (
    !displayName ||
    !email ||
    password.length < 12 ||
    password !== confirm ||
    !secret
  ) {
    return NextResponse.redirect(
      new URL("/setup-owner?error=invalid", request.url),
      303,
    );
  }

  const response = await fetch(
    SUPABASE_URL + "/functions/v1/bootstrap-super-admin",
    {
      method: "POST",
      cache: "no-store",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName,
        email,
        password,
        secret,
      }),
    },
  );

  if (!response.ok) {
    return NextResponse.redirect(
      new URL("/setup-owner?error=failed", request.url),
      303,
    );
  }

  return NextResponse.redirect(
    new URL("/login?owner=ready", request.url),
    303,
  );
}
