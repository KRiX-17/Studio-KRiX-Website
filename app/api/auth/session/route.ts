import { NextResponse } from "next/server";
import {
  getAuthUser,
  type AuthSession,
} from "@/lib/supabase/auth-rest";
import { setSessionCookies } from "@/lib/supabase/session-cookies";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        accessToken?: string;
        refreshToken?: string;
        expiresIn?: number;
      }
    | null;

  if (!body?.accessToken || !body.refreshToken) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  const user = await getAuthUser(body.accessToken);
  if (!user.ok || !user.data?.id) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  const session: AuthSession = {
    access_token: body.accessToken,
    refresh_token: body.refreshToken,
    expires_in: body.expiresIn ?? 3600,
    user: user.data,
  };

  return setSessionCookies(NextResponse.json({ ok: true }), session);
}
