import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  challengeMfa,
  verifyMfa,
} from "@/lib/supabase/auth-rest";
import { setSessionCookies } from "@/lib/supabase/session-cookies";

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { factorId?: string; code?: string; next?: string }
    | null;

  const factorId = String(body?.factorId ?? "");
  const code = String(body?.code ?? "").replace(/\D/g, "");
  const next =
    body?.next?.startsWith("/") && !body.next.startsWith("//")
      ? body.next
      : "/admin";

  if (!factorId || code.length < 6) {
    return NextResponse.json({ error: "Invalid MFA code" }, { status: 400 });
  }

  const challenge = await challengeMfa(accessToken, factorId);
  if (!challenge.ok || !challenge.data?.id) {
    return NextResponse.json(
      { error: "Could not create MFA challenge" },
      { status: challenge.status || 400 },
    );
  }

  const verified = await verifyMfa(
    accessToken,
    factorId,
    challenge.data.id,
    code,
  );

  if (
    !verified.ok ||
    !verified.data?.access_token ||
    !verified.data.refresh_token
  ) {
    return NextResponse.json(
      { error: "That code did not verify" },
      { status: verified.status || 400 },
    );
  }

  return setSessionCookies(
    NextResponse.json({ ok: true, next }),
    verified.data,
  );
}
