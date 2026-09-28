import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  enrollTotp,
} from "@/lib/supabase/auth-rest";

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await enrollTotp(accessToken);
  if (!result.ok || !result.data) {
    const error = result.data as { message?: string } | null;
    return NextResponse.json(
      { error: error?.message ?? "Could not enroll MFA" },
      { status: result.status || 400 },
    );
  }

  return NextResponse.json(result.data);
}
