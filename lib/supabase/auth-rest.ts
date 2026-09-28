export const SUPABASE_URL = "https://vvigsolnmebfbaztpixd.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_ORjDk1mQ6u5VDUMHZpCf-Q_QEhBTn8X";
export const ACCESS_COOKIE = "sk_access";
export const REFRESH_COOKIE = "sk_refresh";

export type PortalRole = "super_admin" | "client" | "collaborator";
export type AuthFactor = {
  id: string;
  factor_type: "totp" | "phone" | "webauthn" | string;
  status: "verified" | "unverified" | string;
  friendly_name?: string | null;
};
export type AuthUser = {
  id: string;
  email?: string | null;
  factors?: AuthFactor[];
};
export type AuthSession = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user?: AuthUser;
};
export type PortalProfile = {
  id: string;
  email: string | null;
  display_name: string | null;
  role: PortalRole;
  is_active: boolean;
  created_at?: string;
};

async function jsonFetch<T>(url: string, init: RequestInit) {
  const response = await fetch(url, {
    ...init,
    cache: "no-store",
    headers: { apikey: SUPABASE_PUBLISHABLE_KEY, ...init.headers },
  });
  let data: T | null = null;
  try {
    data = (await response.json()) as T;
  } catch {}
  return { ok: response.ok, status: response.status, data };
}

export function getAal(accessToken: string): "aal1" | "aal2" | null {
  try {
    const payload = accessToken.split(".")[1];
    const normalised = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalised + "=".repeat((4 - (normalised.length % 4)) % 4);
    const decoded = JSON.parse(atob(padded)) as {
      aal?: "aal1" | "aal2";
    };
    return decoded.aal ?? null;
  } catch {
    return null;
  }
}

export function signInWithPassword(email: string, password: string) {
  return jsonFetch<AuthSession>(
    SUPABASE_URL + "/auth/v1/token?grant_type=password",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
  );
}

export function refreshAuthSession(refreshToken: string) {
  return jsonFetch<AuthSession>(
    SUPABASE_URL + "/auth/v1/token?grant_type=refresh_token",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    },
  );
}

export function getAuthUser(accessToken: string) {
  return jsonFetch<AuthUser>(SUPABASE_URL + "/auth/v1/user", {
    method: "GET",
    headers: { Authorization: "Bearer " + accessToken },
  });
}

export function updatePassword(accessToken: string, password: string) {
  return jsonFetch<AuthUser>(SUPABASE_URL + "/auth/v1/user", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });
}

export function signOut(accessToken: string) {
  return jsonFetch<Record<string, never>>(SUPABASE_URL + "/auth/v1/logout", {
    method: "POST",
    headers: { Authorization: "Bearer " + accessToken },
  });
}

export type MfaEnrollResponse = {
  id: string;
  type: string;
  friendly_name?: string;
  totp?: {
    qr_code?: string;
    secret?: string;
    uri?: string;
  };
};

export function enrollTotp(accessToken: string) {
  return jsonFetch<MfaEnrollResponse>(SUPABASE_URL + "/auth/v1/factors", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      factor_type: "totp",
      friendly_name: "Studio KRiX Super Admin",
    }),
  });
}

export function challengeMfa(accessToken: string, factorId: string) {
  return jsonFetch<{ id: string }>(
    SUPABASE_URL + "/auth/v1/factors/" + factorId + "/challenge",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    },
  );
}

export function verifyMfa(
  accessToken: string,
  factorId: string,
  challengeId: string,
  code: string,
) {
  return jsonFetch<AuthSession>(
    SUPABASE_URL + "/auth/v1/factors/" + factorId + "/verify",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        challenge_id: challengeId,
        code,
      }),
    },
  );
}

async function restGet<T>(path: string, accessToken: string) {
  return jsonFetch<T>(SUPABASE_URL + "/rest/v1/" + path, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      Accept: "application/json",
    },
  });
}

export async function getProfile(accessToken: string, userId: string) {
  const params = new URLSearchParams({
    id: "eq." + userId,
    select: "id,email,display_name,role,is_active,created_at",
    limit: "1",
  });
  const result = await restGet<PortalProfile[]>(
    "profiles?" + params.toString(),
    accessToken,
  );
  return result.ok ? result.data?.[0] ?? null : null;
}

export async function getAdminProfiles(accessToken: string) {
  const params = new URLSearchParams({
    select: "id,email,display_name,role,is_active,created_at",
    order: "created_at.desc",
  });
  const result = await restGet<PortalProfile[]>(
    "profiles?" + params.toString(),
    accessToken,
  );
  return result.ok ? result.data ?? [] : [];
}

export type ClientGalleryAccess = {
  gallery_id: string;
  can_download: boolean;
  can_upload: boolean;
  expires_at: string | null;
  galleries: {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    category: string | null;
    event_date: string | null;
    location: string | null;
    status: string;
  } | null;
};

export async function getClientGalleryAccess(
  accessToken: string,
  userId: string,
) {
  const params = new URLSearchParams({
    user_id: "eq." + userId,
    select:
      "gallery_id,can_download,can_upload,expires_at,galleries!gallery_access_gallery_id_fkey(id,slug,title,description,category,event_date,location,status)",
    order: "granted_at.desc",
  });
  const result = await restGet<ClientGalleryAccess[]>(
    "gallery_access?" + params.toString(),
    accessToken,
  );
  return result.ok ? result.data ?? [] : [];
}

export function invokePortalFunction<T>(
  slug: string,
  accessToken: string,
  body: unknown,
) {
  return jsonFetch<T>(SUPABASE_URL + "/functions/v1/" + slug, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function invokePublicFunction<T>(slug: string, body: unknown) {
  return jsonFetch<T>(SUPABASE_URL + "/functions/v1/" + slug, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
