import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  invokePortalFunction,
} from "@/lib/supabase/auth-rest";

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const result = await invokePortalFunction(
    "admin-portal",
    accessToken,
    body,
  );

  return NextResponse.json(
    result.data ?? { error: "Admin action failed" },
    { status: result.status },
  );
}
