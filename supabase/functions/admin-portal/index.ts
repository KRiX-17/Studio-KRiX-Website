
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

function decodeJwt(token: string) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    return JSON.parse(atob(padded));
  } catch {
    return {};
  }
}

function safeSlug(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

function safeName(input: string) {
  return input.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(-120);
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function randomToken(bytes = 32) {
  const data = crypto.getRandomValues(new Uint8Array(bytes));
  return btoa(String.fromCharCode(...data)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);

  const token = authHeader.slice(7);
  const url = Deno.env.get("SUPABASE_URL") ?? "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

  const userClient = createClient(url, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: userData, error: userError } = await userClient.auth.getUser();
  const caller = userData.user;
  if (userError || !caller) return json({ error: "Unauthorized" }, 401);
  const claims = decodeJwt(token);
  if (claims.aal !== "aal2") return json({ error: "MFA required" }, 403);

  const { data: profile } = await admin.from("profiles").select("role,is_active").eq("id", caller.id).maybeSingle();
  if (!profile?.is_active || profile.role !== "super_admin") return json({ error: "Forbidden" }, 403);

  const payload = await req.json().catch(() => null) as Record<string, any> | null;
  const action = String(payload?.action ?? "");
  const body = payload?.body ?? {};

  const audit = async (event_type: string, entity_type?: string, entity_id?: string | null, details: Record<string, unknown> = {}) => {
    await admin.from("audit_events").insert({
      actor_user_id: caller.id,
      event_type,
      entity_type: entity_type ?? null,
      entity_id: entity_id ?? null,
      details,
      user_agent: req.headers.get("user-agent"),
    });
  };

  if (action === "overview") {
    const [{ data: galleries }, { data: users }, { data: audits }] = await Promise.all([
      admin.from("galleries").select("id,slug,title,category,status,event_date,location,is_featured,published_at,created_at").neq("status", "archived").order("created_at", { ascending: false }),
      admin.from("profiles").select("id,email,display_name,role,is_active,created_at").order("created_at", { ascending: false }),
      admin.from("audit_events").select("id,event_type,entity_type,entity_id,details,created_at,actor_user_id").order("created_at", { ascending: false }).limit(20),
    ]);
    return json({ galleries: galleries ?? [], users: users ?? [], audits: audits ?? [] });
  }

  if (action === "gallery_detail") {
    const galleryId = String(body.galleryId ?? "");
    const [{ data: gallery }, { data: assets }, { data: access }, { data: clients }] = await Promise.all([
      admin.from("galleries").select("*").eq("id", galleryId).maybeSingle(),
      admin.from("gallery_assets").select("*").eq("gallery_id", galleryId).order("sort_order"),
      admin.from("gallery_access").select("gallery_id,user_id,can_download,can_upload,expires_at,granted_at").eq("gallery_id", galleryId),
      admin.from("profiles").select("id,email,display_name,role,is_active").in("role", ["client", "collaborator"]).eq("is_active", true).order("display_name"),
    ]);
    if (!gallery) return json({ error: "Gallery not found" }, 404);

    const previewPaths = (assets ?? []).map(
      (asset: any) => asset.web_storage_path || asset.storage_path,
    );
    const signedResult = previewPaths.length
      ? await admin.storage
          .from("client-galleries")
          .createSignedUrls(previewPaths, 900)
      : { data: [] as any[] };
    const urlByPath = new Map(
      (signedResult.data ?? []).map((item: any) => [item.path, item.signedUrl]),
    );

    return json({
      gallery,
      assets: (assets ?? []).map((asset: any) => ({
        ...asset,
        preview_url:
          urlByPath.get(asset.web_storage_path || asset.storage_path) ?? null,
      })),
      access: access ?? [],
      clients: clients ?? [],
    });
  }

  if (action === "create_gallery") {
    const title = String(body.title ?? "").trim();
    if (!title) return json({ error: "Title required" }, 400);
    const base = safeSlug(String(body.slug ?? title)) || "gallery";
    let slug = base;
    let attempt = 0;
    while (true) {
      const { data: existing } = await admin.from("galleries").select("id").eq("slug", slug).maybeSingle();
      if (!existing) break;
      attempt += 1;
      slug = base + "-" + String(attempt + 1);
    }

    const { data: gallery, error } = await admin.from("galleries").insert({
      slug,
      title,
      description: body.description || null,
      category: body.category || null,
      event_date: body.eventDate || null,
      location: body.location || null,
      credits: body.credits || null,
      status: "draft",
      is_featured: Boolean(body.isFeatured),
      created_by: caller.id,
    }).select("*").single();

    if (error || !gallery) return json({ error: error?.message ?? "Create failed" }, 400);
    await audit("gallery.created", "gallery", gallery.id, { title, slug });
    return json({ gallery });
  }

  if (action === "update_gallery") {
    const galleryId = String(body.galleryId ?? "");
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    const pairs = [
      ["title", "title"],
      ["description", "description"],
      ["category", "category"],
      ["eventDate", "event_date"],
      ["location", "location"],
      ["credits", "credits"],
      ["isFeatured", "is_featured"],
    ];
    for (const [input, column] of pairs) {
      if (input in body) updates[column] = body[input] || null;
    }
    const { data: gallery, error } = await admin.from("galleries").update(updates).eq("id", galleryId).select("*").single();
    if (error || !gallery) return json({ error: error?.message ?? "Update failed" }, 400);
    await audit("gallery.updated", "gallery", galleryId);
    return json({ gallery });
  }

  if (action === "publish_gallery" || action === "unpublish_gallery") {
    const galleryId = String(body.galleryId ?? "");
    const publishing = action === "publish_gallery";

    const { data: currentGallery } = await admin
      .from("galleries")
      .select("id,slug")
      .eq("id", galleryId)
      .maybeSingle();

    if (!currentGallery) return json({ error: "Gallery not found" }, 404);

    const { data: assets } = await admin
      .from("gallery_assets")
      .select("id,storage_path,web_storage_path,public_storage_path,filename")
      .eq("gallery_id", galleryId)
      .order("sort_order");

    if (publishing) {
      const copied: Array<{ id: string; path: string }> = [];

      for (const asset of assets ?? []) {
        if (asset.public_storage_path) continue;

        const sourcePath = asset.web_storage_path || asset.storage_path;
        const sourceName =
          sourcePath.split("/").pop() || asset.filename;
        const publicPath =
          currentGallery.slug + "/" + asset.id + "-" + safeName(sourceName);

        const { error: copyError } = await admin.storage
          .from("client-galleries")
          .copy(sourcePath, publicPath, {
            destinationBucket: "portfolio-public",
          });

        if (copyError) {
          if (copied.length) {
            await admin.storage
              .from("portfolio-public")
              .remove(copied.map((item) => item.path));
          }
          return json(
            {
              error:
                "Could not publish " +
                asset.filename +
                ". Check the web export file size and try again.",
            },
            500,
          );
        }

        copied.push({ id: asset.id, path: publicPath });
      }

      for (const item of copied) {
        await admin
          .from("gallery_assets")
          .update({ public_storage_path: item.path })
          .eq("id", item.id);
      }
    } else {
      const publicPaths = (assets ?? [])
        .map((asset) => asset.public_storage_path)
        .filter(Boolean) as string[];

      if (publicPaths.length) {
        await admin.storage.from("portfolio-public").remove(publicPaths);
      }

      await admin
        .from("gallery_assets")
        .update({ public_storage_path: null })
        .eq("gallery_id", galleryId);
    }

    const { data: gallery, error } = await admin
      .from("galleries")
      .update({
        status: publishing ? "published" : "client_only",
        published_at: publishing ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", galleryId)
      .select("*")
      .single();

    if (error || !gallery) {
      return json({ error: error?.message ?? "Status change failed" }, 400);
    }

    await audit(
      publishing ? "gallery.published" : "gallery.unpublished",
      "gallery",
      galleryId,
      { public_assets: publishing ? (assets ?? []).length : 0 },
    );

    return json({ gallery });
  }

  if (action === "create_upload_url") {
    const galleryId = String(body.galleryId ?? "");
    const filename = safeName(String(body.filename ?? "photo.jpg"));
    const mimeType = String(body.mimeType ?? "image/jpeg");
    const bytes = Number(body.bytes ?? 0);

    const { data: gallery } = await admin.from("galleries").select("id").eq("id", galleryId).maybeSingle();
    if (!gallery) return json({ error: "Gallery not found" }, 404);
    if (!["image/jpeg", "image/png", "image/webp"].includes(mimeType)) return json({ error: "Unsupported image type" }, 415);
    if (bytes > 50 * 1024 * 1024) return json({ error: "File too large" }, 413);

    const kind = body.kind === "web" ? "web" : "original";
    const storagePath =
      galleryId +
      "/" +
      kind +
      "/" +
      crypto.randomUUID() +
      "-" +
      filename;
    const { data, error } = await admin.storage.from("client-galleries").createSignedUploadUrl(storagePath);
    if (error || !data) return json({ error: error?.message ?? "Upload URL failed" }, 500);
    return json({ storagePath, signedUrl: data.signedUrl, token: data.token });
  }

  if (action === "complete_upload") {
    const galleryId = String(body.galleryId ?? "");
    const storagePath = String(body.storagePath ?? "");
    const webStoragePath = String(body.webStoragePath ?? "");
    const filename = safeName(String(body.filename ?? "photo.jpg"));
    if (!storagePath.startsWith(galleryId + "/original/")) {
      return json({ error: "Invalid original path" }, 400);
    }
    if (
      webStoragePath &&
      !webStoragePath.startsWith(galleryId + "/web/")
    ) {
      return json({ error: "Invalid web preview path" }, 400);
    }

    const { count } = await admin.from("gallery_assets").select("*", { count: "exact", head: true }).eq("gallery_id", galleryId);
    const { data: asset, error } = await admin.from("gallery_assets").insert({
      gallery_id: galleryId,
      storage_path: storagePath,
      web_storage_path: webStoragePath || null,
      filename,
      mime_type: body.mimeType || "image/jpeg",
      width: body.width || null,
      height: body.height || null,
      bytes: body.bytes || null,
      alt_text: body.altText || "",
      caption: body.caption || null,
      sort_order: count ?? 0,
      uploaded_by: caller.id,
    }).select("*").single();

    if (error || !asset) return json({ error: error?.message ?? "Register failed" }, 400);

    const { data: gallery } = await admin
      .from("galleries")
      .select("cover_asset_id,status,slug")
      .eq("id", galleryId)
      .single();

    if (!gallery?.cover_asset_id) {
      await admin
        .from("galleries")
        .update({ cover_asset_id: asset.id })
        .eq("id", galleryId);
    }

    let finalAsset = asset;

    if (gallery?.status === "published" && gallery.slug) {
      const publicSource = webStoragePath || storagePath;
      const publicName =
        publicSource.split("/").pop() || filename;
      const publicPath =
        gallery.slug + "/" + asset.id + "-" + safeName(publicName);

      const { error: copyError } = await admin.storage
        .from("client-galleries")
        .copy(publicSource, publicPath, {
          destinationBucket: "portfolio-public",
        });

      if (!copyError) {
        const { data: updated } = await admin
          .from("gallery_assets")
          .update({ public_storage_path: publicPath })
          .eq("id", asset.id)
          .select("*")
          .single();

        if (updated) finalAsset = updated;
      }
    }

    await audit("asset.uploaded", "gallery_asset", asset.id, {
      gallery_id: galleryId,
      filename,
    });

    return json({ asset: finalAsset });
  }

  if (action === "update_asset") {
    const assetId = String(body.assetId ?? "");
    const updates: Record<string, unknown> = {};
    if ("altText" in body) updates.alt_text = String(body.altText ?? "");
    if ("caption" in body) updates.caption = body.caption ? String(body.caption) : null;
    const { data: asset, error } = await admin
      .from("gallery_assets")
      .update(updates)
      .eq("id", assetId)
      .select("*")
      .single();
    if (error || !asset) return json({ error: error?.message ?? "Asset update failed" }, 400);
    await audit("asset.updated", "gallery_asset", assetId);
    return json({ asset });
  }

  if (action === "set_cover") {
    const galleryId = String(body.galleryId ?? "");
    const assetId = String(body.assetId ?? "");
    const { data: asset } = await admin.from("gallery_assets").select("id").eq("id", assetId).eq("gallery_id", galleryId).maybeSingle();
    if (!asset) return json({ error: "Asset not found" }, 404);
    await admin.from("galleries").update({ cover_asset_id: assetId, updated_at: new Date().toISOString() }).eq("id", galleryId);
    await audit("gallery.cover_changed", "gallery", galleryId, { asset_id: assetId });
    return json({ ok: true });
  }

  if (action === "reorder_assets") {
    const galleryId = String(body.galleryId ?? "");
    const ids = Array.isArray(body.assetIds) ? body.assetIds.map(String) : [];
    for (let i = 0; i < ids.length; i += 1) {
      await admin.from("gallery_assets").update({ sort_order: i }).eq("id", ids[i]).eq("gallery_id", galleryId);
    }
    await audit("gallery.assets_reordered", "gallery", galleryId, { count: ids.length });
    return json({ ok: true });
  }

  if (action === "remove_asset") {
    const assetId = String(body.assetId ?? "");
    const { data: asset } = await admin
      .from("gallery_assets")
      .select("id,gallery_id,storage_path,web_storage_path,public_storage_path")
      .eq("id", assetId)
      .maybeSingle();

    if (!asset) return json({ error: "Asset not found" }, 404);

    const privatePaths = [
      asset.storage_path,
      asset.web_storage_path,
    ].filter(Boolean) as string[];

    if (privatePaths.length) {
      await admin.storage.from("client-galleries").remove(privatePaths);
    }

    if (asset.public_storage_path) {
      await admin.storage
        .from("portfolio-public")
        .remove([asset.public_storage_path]);
    }

    await admin.from("gallery_assets").delete().eq("id", assetId);

    await audit("asset.deleted", "gallery_asset", assetId, {
      gallery_id: asset.gallery_id,
    });

    return json({ ok: true });
  }

  if (action === "grant_access") {
    const galleryId = String(body.galleryId ?? "");
    const userId = String(body.userId ?? "");
    const canDownload = body.canDownload !== false;
    const requestedUpload = body.canUpload === true;
    const { data: client } = await admin.from("profiles").select("id,role,is_active").eq("id", userId).maybeSingle();
    if (!client?.is_active || !["client", "collaborator"].includes(client.role)) {
      return json({ error: "Portal user not found" }, 404);
    }
    const canUpload =
      client.role === "collaborator" && requestedUpload;
    const { error } = await admin.from("gallery_access").upsert({
      gallery_id: galleryId,
      user_id: userId,
      can_download: canDownload,
      can_upload: canUpload,
      expires_at: body.expiresAt || null,
      granted_by: caller.id,
      granted_at: new Date().toISOString(),
    });
    if (error) return json({ error: error.message }, 400);
    await audit("gallery.access_granted", "gallery", galleryId, {
      user_id: userId,
      can_download: canDownload,
      can_upload: canUpload,
    });
    return json({ ok: true });
  }

  if (action === "revoke_access") {
    const galleryId = String(body.galleryId ?? "");
    const userId = String(body.userId ?? "");
    await admin.from("gallery_access").delete().eq("gallery_id", galleryId).eq("user_id", userId);
    await audit("gallery.access_revoked", "gallery", galleryId, { user_id: userId });
    return json({ ok: true });
  }

  if (action === "set_user_active") {
    const userId = String(body.userId ?? "");
    const isActive = Boolean(body.isActive);
    const { data: target } = await admin.from("profiles").select("role").eq("id", userId).maybeSingle();
    if (!target || target.role === "super_admin") return json({ error: "Cannot change this user" }, 400);
    await admin.from("profiles").update({ is_active: isActive, updated_at: new Date().toISOString() }).eq("id", userId);
    await audit(isActive ? "client.activated" : "client.deactivated", "user", userId);
    return json({ ok: true });
  }

  if (action === "create_client") {
    const email = String(body.email ?? "").trim().toLowerCase();
    const displayName = String(body.displayName ?? "").trim();
    const requestedRole =
      body.role === "collaborator" ? "collaborator" : "client";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Valid email required" }, 400);

    const { data: existing } = await admin.from("profiles").select("id,email,role").eq("email", email).maybeSingle();
    if (existing) return json({ error: "A portal user already exists for this email" }, 409);

    const inviteToken = randomToken(32);
    const tokenHash = await sha256Hex(inviteToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    await admin.from("auth_allowlist").insert({
      email,
      purpose: "client_invite",
      created_by: caller.id,
      expires_at: expiresAt,
    });

    const tempPassword = randomToken(36) + "Aa1!";
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: { display_name: displayName || null },
    });

    if (createError || !created.user) {
      await admin.from("auth_allowlist").delete().eq("email", email);
      return json({ error: createError?.message ?? "Could not create client" }, 400);
    }

    if (requestedRole === "collaborator") {
      await admin
        .from("profiles")
        .update({ role: "collaborator", updated_at: new Date().toISOString() })
        .eq("id", created.user.id);
    }

    const { error: inviteError } = await admin.from("client_invites").insert({
      user_id: created.user.id,
      email,
      display_name: displayName || null,
      token_hash: tokenHash,
      created_by: caller.id,
      expires_at: expiresAt,
    });

    if (inviteError) {
      await admin.auth.admin.deleteUser(created.user.id);
      return json({ error: inviteError.message }, 500);
    }

    await audit("portal_user.created", "user", created.user.id, {
      email,
      display_name: displayName || null,
      role: requestedRole,
    });
    return json({
      user: {
        id: created.user.id,
        email,
        displayName: displayName || null,
        role: requestedRole,
      },
      inviteToken,
      expiresAt,
    });
  }

  if (action === "audit_feed") {
    const { data: events } = await admin.from("audit_events")
      .select("id,actor_user_id,event_type,entity_type,entity_id,details,user_agent,created_at")
      .order("created_at", { ascending: false })
      .limit(Math.min(Number(body.limit ?? 100), 200));
    const { data: downloads } = await admin.from("download_events")
      .select("id,user_id,gallery_id,asset_id,download_kind,created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    return json({ events: events ?? [], downloads: downloads ?? [] });
  }

  if (action === "monitoring") {
    const [
      { count: galleryCount },
      { count: assetCount },
      { count: activeClientCount },
      { count: downloadCount },
      { data: latestAudit },
    ] = await Promise.all([
      admin.from("galleries").select("*", { count: "exact", head: true }).neq("status", "archived"),
      admin.from("gallery_assets").select("*", { count: "exact", head: true }),
      admin.from("profiles").select("*", { count: "exact", head: true }).eq("role", "client").eq("is_active", true),
      admin.from("download_events").select("*", { count: "exact", head: true }),
      admin.from("audit_events").select("created_at,event_type").order("created_at", { ascending: false }).limit(1),
    ]);
    return json({
      status: "ok",
      database: "connected",
      storage: "connected",
      galleryCount: galleryCount ?? 0,
      assetCount: assetCount ?? 0,
      activeClientCount: activeClientCount ?? 0,
      downloadCount: downloadCount ?? 0,
      latestAudit: latestAudit?.[0] ?? null,
      checkedAt: new Date().toISOString(),
    });
  }

  return json({ error: "Unknown action" }, 400);
});
