"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { PHOTO_BUCKET, type GalleryPhoto } from "@/lib/photography/gallery";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const extensions: Record<string, string> = {
  "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif",
};

export function PhotoStudio() {
  const client = useMemo<SupabaseClient | null>(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    return url && key ? createClient(url, key) : null;
  }, []);
  const [email, setEmail] = useState("");
  const [access, setAccess] = useState<"loading" | "signed-out" | "denied" | "owner">("loading");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);

  const refresh = useCallback(async () => {
    if (!client) return;
    const { data, error } = await client.from("photographs")
      .select("id,title,alt_text,caption,collection,location,image_path,created_at")
      .order("created_at", { ascending: false });
    if (error) { setStatus(error.message); return; }
    setPhotos((data ?? []).map((photo) => ({
      ...photo,
      imageUrl: client.storage.from(PHOTO_BUCKET).getPublicUrl(photo.image_path).data.publicUrl,
    })));
  }, [client]);

  useEffect(() => {
    if (!client) return;
    const supabase = client;
    let active = true;
    async function checkAccess() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!active) return;
      if (!user) { setAccess("signed-out"); return; }
      const { data } = await supabase.from("photo_admins")
        .select("user_id").eq("user_id", user.id).maybeSingle();
      if (!active) return;
      setAccess(data ? "owner" : "denied");
      if (data) void refresh();
    }
    void checkAccess();
    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      // Defer API calls until auth state changes have finished updating storage.
      setTimeout(() => { if (active) void checkAccess(); }, 0);
    });
    return () => { active = false; subscription.subscription.unsubscribe(); };
  }, [client, refresh]);

  async function sendLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client) return;
    setBusy(true);
    const { error } = await client.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/studio/photos` },
    });
    setStatus(error ? error.message : "Check your email for a sign-in link. Only the authorised owner can publish.");
    setBusy(false);
  }

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client || access !== "owner") return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const file = fields.get("image");
    if (!(file instanceof File) || !file.size) { setStatus("Choose an image first."); return; }
    if (!extensions[file.type] || file.size > MAX_FILE_BYTES) {
      setStatus("Use a JPEG, PNG, WebP or AVIF image up to 10 MB."); return;
    }
    const title = String(fields.get("title") || "").trim();
    const alt_text = String(fields.get("alt_text") || "").trim();
    const collection = String(fields.get("collection") || "").trim();
    const caption = String(fields.get("caption") || "").trim();
    const location = String(fields.get("location") || "").trim();
    if (!title || !alt_text || !collection) { setStatus("Add a title, collection and image description."); return; }

    setBusy(true);
    setStatus("Uploading photograph…");
    const path = `${crypto.randomUUID()}.${extensions[file.type]}`;
    const { error: uploadError } = await client.storage.from(PHOTO_BUCKET).upload(path, file, {
      contentType: file.type, upsert: false,
    });
    if (uploadError) { setStatus(uploadError.message); setBusy(false); return; }
    const { error: insertError } = await client.from("photographs").insert({
      title, alt_text, collection, image_path: path,
      caption: caption || null, location: location || null,
    });
    if (insertError) {
      await client.storage.from(PHOTO_BUCKET).remove([path]);
      setStatus(insertError.message);
    } else {
      form.reset();
      setStatus("Published. The public gallery refreshes within about a minute.");
      await refresh();
    }
    setBusy(false);
  }

  async function remove(photo: GalleryPhoto) {
    if (!client || access !== "owner" || !window.confirm(`Remove “${photo.title}” from the gallery?`)) return;
    setBusy(true);
    const { error } = await client.from("photographs").delete().eq("id", photo.id);
    if (error) setStatus(error.message);
    else {
      const { error: storageError } = await client.storage.from(PHOTO_BUCKET).remove([photo.image_path]);
      setStatus(storageError ? "The gallery entry was removed, but the image file needs manual cleanup." : "Photograph removed.");
      await refresh();
    }
    setBusy(false);
  }

  if (!client) return <div className="site-container photo-studio"><h1>Photography Studio</h1><p>Gallery publishing is waiting for its dedicated photo storage connection.</p></div>;

  return (
    <div className="site-container photo-studio">
      <div className="photo-studio__heading"><div><p className="section-label">Private workspace</p><h1>Photography Studio</h1><p>Upload, describe and publish your photographs.</p></div>
        {access === "owner" && <button type="button" onClick={() => void client.auth.signOut()}>Sign out</button>}
      </div>
      {access === "loading" && <p>Checking access…</p>}
      {access === "signed-out" && <form className="photo-studio__form" onSubmit={sendLink}>
        <label>Email address<input autoComplete="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <button disabled={busy} type="submit">Send sign-in link</button>
      </form>}
      {access === "denied" && <p>This account does not have publishing access.</p>}
      {access === "owner" && <>
        <form className="photo-studio__form" onSubmit={publish}>
          <label>Photograph<input accept="image/jpeg,image/png,image/webp,image/avif" name="image" type="file" required /></label>
          <div className="photo-studio__fields"><label>Title<input maxLength={120} name="title" required /></label><label>Collection<input maxLength={80} name="collection" placeholder="e.g. Night drives" required /></label></div>
          <label>Image description <span>(for accessibility)</span><input maxLength={240} name="alt_text" placeholder="Describe what is visible in the photograph" required /></label>
          <div className="photo-studio__fields"><label>Location <span>(optional)</span><input maxLength={120} name="location" /></label><label>Caption <span>(optional)</span><input maxLength={600} name="caption" /></label></div>
          <button disabled={busy} type="submit">{busy ? "Working…" : "Publish photograph"}</button>
        </form>
        <section className="photo-studio__published"><h2>Published photographs</h2>{photos.length ? <ul>{photos.map((photo) => <li key={photo.id}><span>{photo.title} · {photo.collection}</span><button disabled={busy} onClick={() => void remove(photo)} type="button">Remove</button></li>)}</ul> : <p>No photographs published yet.</p>}</section>
      </>}
      {status && <p className="photo-studio__status" role="status">{status}</p>}
    </div>
  );
}
