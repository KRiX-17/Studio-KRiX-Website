import { NextRequest, NextResponse } from "next/server";
import { invokePublicFunction } from "@/lib/supabase/auth-rest";
import { noStore, rejectCrossOriginPost } from "@/lib/supabase/request-security";

export async function POST(request: NextRequest) {
  const crossOrigin = rejectCrossOriginPost(request);
  if (crossOrigin) return crossOrigin;
  const form = await request.formData();
  const token = String(form.get("token") ?? "");
  const password = String(form.get("password") ?? "");
  const confirm = String(form.get("confirm") ?? "");

  if (!token || password.length < 12 || password !== confirm) {
    const url = new URL("/claim", request.url);
    url.searchParams.set("token", token);
    url.searchParams.set("error", "password");
    return noStore(NextResponse.redirect(url, 303));
  }

  const result = await invokePublicFunction<{ ok?: boolean; error?: string }>(
    "claim-client-invite",
    { token, password },
  );

  if (!result.ok || !result.data?.ok) {
    const url = new URL("/claim", request.url);
    url.searchParams.set("token", token);
    url.searchParams.set("error", "invite");
    return noStore(NextResponse.redirect(url, 303));
  }

  return noStore(NextResponse.redirect(new URL("/login?claimed=1", request.url), 303));
}
