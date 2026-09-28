import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  getAuthUser,
  getProfile,
  invokePortalFunction,
} from "@/lib/supabase/auth-rest";

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userResult = await getAuthUser(accessToken);
  const user = userResult.ok ? userResult.data : null;
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await getProfile(accessToken, user.id);
  if (!profile?.is_active || profile.role !== "super_admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as
    | {
        email?: string;
        displayName?: string;
        role?: "client" | "collaborator";
      }
    | null;

  if (!body?.email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const result = await invokePortalFunction(
    "admin-invite-client",
    accessToken,
    body,
  );

  return NextResponse.json(
    result.data ?? { error: "Invite failed" },
    { status: result.status },
  );
}
