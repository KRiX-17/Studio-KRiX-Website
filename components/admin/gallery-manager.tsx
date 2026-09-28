"use client";

import { DragEvent, FormEvent, useRef, useState } from "react";
import styles from "@/app/admin/galleries/[id]/gallery.module.css";

type GalleryData = {
  gallery: {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    category: string | null;
    event_date: string | null;
    location: string | null;
    credits: string | null;
    status: string;
    is_featured: boolean;
    cover_asset_id: string | null;
  };
  assets: Array<{
    id: string;
    filename: string;
    alt_text: string;
    caption: string | null;
    sort_order: number;
    preview_url: string | null;
  }>;
  access: Array<{
    user_id: string;
    can_download: boolean;
    expires_at: string | null;
  }>;
  clients: Array<{
    id: string;
    email: string | null;
    display_name: string | null;
  }>;
};

async function adminAction<T>(action: string, body: Record<string, unknown>) {
  const response = await fetch("/api/admin/portal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, body }),
  });
  const result = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(result.error ?? "Admin action failed");
  return result;
}

export function GalleryManager({ data }: { data: GalleryData }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [assets, setAssets] = useState(data.assets);
  const [busy, setBusy] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const gallery = data.gallery;

  async function saveMetadata(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy("metadata");
    setMessage(null);
    try {
      const form = new FormData(event.currentTarget);
      await adminAction("update_gallery", {
        galleryId: gallery.id,
        title: form.get("title"),
        category: form.get("category"),
        eventDate: form.get("eventDate"),
        location: form.get("location"),
        description: form.get("description"),
        credits: form.get("credits"),
        isFeatured: form.get("isFeatured") === "on",
      });
      setMessage("Gallery details saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save.");
    } finally {
      setBusy(null);
    }
  }

  async function uploadFiles(files: File[]) {
    const images = files.filter((file) =>
      ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    );
    if (!images.length) return;

    setBusy("upload");
    setMessage("Preparing uploads…");

    try {
      for (let index = 0; index < images.length; index += 1) {
        const file = images[index];
        setMessage(
          "Uploading " + String(index + 1) + " of " + String(images.length) + " · " + file.name,
        );

        const ticket = await adminAction<{
          storagePath: string;
          signedUrl: string;
        }>("create_upload_url", {
          galleryId: gallery.id,
          filename: file.name,
          mimeType: file.type,
          bytes: file.size,
        });

        const uploadBody = new FormData();
        uploadBody.append("cacheControl", "3600");
        uploadBody.append("", file);

        const upload = await fetch(ticket.signedUrl, {
          method: "PUT",
          headers: { "x-upsert": "false" },
          body: uploadBody,
        });

        if (!upload.ok) {
          throw new Error("Upload failed for " + file.name);
        }

        const defaultAlt = file.name
          .replace(/\.[^.]+$/, "")
          .replace(/[-_]+/g, " ")
          .trim();

        await adminAction("complete_upload", {
          galleryId: gallery.id,
          storagePath: ticket.storagePath,
          filename: file.name,
          mimeType: file.type,
          bytes: file.size,
          altText: defaultAlt,
        });
      }

      setMessage("Uploads complete. Refreshing gallery…");
      window.location.reload();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
      setBusy(null);
    }
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    void uploadFiles(Array.from(event.dataTransfer.files));
  }

  async function moveAsset(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= assets.length) return;

    const next = [...assets];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    setAssets(next);

    try {
      await adminAction("reorder_assets", {
        galleryId: gallery.id,
        assetIds: next.map((asset) => asset.id),
      });
    } catch {
      setAssets(assets);
    }
  }

  async function setCover(assetId: string) {
    setBusy("cover-" + assetId);
    await adminAction("set_cover", { galleryId: gallery.id, assetId });
    window.location.reload();
  }

  async function removeAsset(assetId: string) {
    if (!window.confirm("Remove this photo from the gallery?")) return;
    setBusy("remove-" + assetId);
    await adminAction("remove_asset", { assetId });
    window.location.reload();
  }

  async function saveAsset(
    event: FormEvent<HTMLFormElement>,
    assetId: string,
  ) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy("asset-" + assetId);
    try {
      await adminAction("update_asset", {
        assetId,
        altText: form.get("altText"),
        caption: form.get("caption"),
      });
      setMessage("Photo text saved.");
    } finally {
      setBusy(null);
    }
  }

  async function togglePublish() {
    setBusy("publish");
    await adminAction(
      gallery.status === "published" ? "unpublish_gallery" : "publish_gallery",
      { galleryId: gallery.id },
    );
    window.location.reload();
  }

  async function grant(userId: string, canDownload: boolean) {
    setBusy("access-" + userId);
    await adminAction("grant_access", {
      galleryId: gallery.id,
      userId,
      canDownload,
    });
    window.location.reload();
  }

  async function revoke(userId: string) {
    setBusy("access-" + userId);
    await adminAction("revoke_access", {
      galleryId: gallery.id,
      userId,
    });
    window.location.reload();
  }

  return (
    <>
      <header className={styles.hero}>
        <div>
          <p className={styles.kicker}>Gallery / {gallery.status.replace("_", " ")}</p>
          <h1>{gallery.title}</h1>
          <p>
            {assets.length} photo{assets.length === 1 ? "" : "s"} · {gallery.slug}
          </p>
        </div>
        <button
          className={gallery.status === "published" ? styles.secondary : styles.publish}
          disabled={busy === "publish" || assets.length === 0}
          onClick={togglePublish}
          type="button"
        >
          {gallery.status === "published"
            ? "Remove from public portfolio"
            : "Publish to Photography →"}
        </button>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span>01</span>
          <div>
            <p className={styles.kicker}>Metadata</p>
            <h2>Shoot details.</h2>
          </div>
        </div>

        <form className={styles.metaForm} onSubmit={saveMetadata}>
          <label>
            Title
            <input name="title" defaultValue={gallery.title} required />
          </label>
          <label>
            Category
            <select name="category" defaultValue={gallery.category ?? "Fashion"}>
              <option>Fashion</option>
              <option>Portraits</option>
              <option>Events</option>
              <option>Creative</option>
            </select>
          </label>
          <label>
            Date
            <input name="eventDate" type="date" defaultValue={gallery.event_date ?? ""} />
          </label>
          <label>
            Location
            <input name="location" defaultValue={gallery.location ?? ""} />
          </label>
          <label className={styles.wide}>
            Description
            <textarea name="description" rows={4} defaultValue={gallery.description ?? ""} />
          </label>
          <label className={styles.wide}>
            Credits
            <input name="credits" defaultValue={gallery.credits ?? ""} placeholder="Models, styling, venue…" />
          </label>
          <label className={styles.checkbox}>
            <input name="isFeatured" type="checkbox" defaultChecked={gallery.is_featured} />
            Feature this gallery
          </label>
          <button disabled={busy === "metadata"} type="submit">
            {busy === "metadata" ? "Saving…" : "Save details"}
          </button>
        </form>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span>02</span>
          <div>
            <p className={styles.kicker}>Photos</p>
            <h2>Upload & curate.</h2>
          </div>
        </div>

        <div
          className={dragActive ? styles.dropzoneActive : styles.dropzone}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={onDrop}
        >
          <input
            ref={inputRef}
            hidden
            multiple
            accept="image/jpeg,image/png,image/webp"
            type="file"
            onChange={(event) => {
              if (event.target.files) void uploadFiles(Array.from(event.target.files));
              event.target.value = "";
            }}
          />
          <strong>Drag finished JPGs here.</strong>
          <span>JPEG, PNG or WebP · maximum 50 MB each</span>
          <button
            disabled={busy === "upload"}
            onClick={() => inputRef.current?.click()}
            type="button"
          >
            {busy === "upload" ? "Uploading…" : "Choose photos"}
          </button>
        </div>

        {message && <p className={styles.message}>{message}</p>}

        <div className={styles.assetGrid}>
          {assets.map((asset, index) => (
            <article className={styles.asset} key={asset.id}>
              <div className={styles.imageWrap}>
                {asset.preview_url ? (
                  <img alt={asset.alt_text} src={asset.preview_url} />
                ) : (
                  <span>No preview</span>
                )}
                {gallery.cover_asset_id === asset.id && (
                  <b className={styles.cover}>Cover</b>
                )}
              </div>

              <div className={styles.assetTop}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong title={asset.filename}>{asset.filename}</strong>
              </div>

              <form className={styles.assetForm} onSubmit={(event) => saveAsset(event, asset.id)}>
                <label>
                  Alt text
                  <input name="altText" defaultValue={asset.alt_text} />
                </label>
                <label>
                  Caption
                  <input name="caption" defaultValue={asset.caption ?? ""} />
                </label>
                <button disabled={busy === "asset-" + asset.id} type="submit">
                  Save text
                </button>
              </form>

              <div className={styles.assetActions}>
                <button disabled={index === 0} onClick={() => moveAsset(index, -1)} type="button">←</button>
                <button disabled={index === assets.length - 1} onClick={() => moveAsset(index, 1)} type="button">→</button>
                <button
                  disabled={gallery.cover_asset_id === asset.id || busy === "cover-" + asset.id}
                  onClick={() => setCover(asset.id)}
                  type="button"
                >
                  Set cover
                </button>
                <button onClick={() => removeAsset(asset.id)} type="button">Remove</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span>03</span>
          <div>
            <p className={styles.kicker}>Clients</p>
            <h2>Who can see it?</h2>
          </div>
        </div>

        <div className={styles.clientList}>
          {data.clients.length === 0 ? (
            <p>No client accounts yet. Create them from Clients & Users.</p>
          ) : (
            data.clients.map((client) => {
              const current = data.access.find((item) => item.user_id === client.id);
              return (
                <article key={client.id}>
                  <div>
                    <strong>{client.display_name || client.email || "Client"}</strong>
                    <span>{client.email}</span>
                  </div>
                  <div className={styles.clientActions}>
                    {current ? (
                      <>
                        <span>{current.can_download ? "Download access" : "View only"}</span>
                        <button onClick={() => grant(client.id, !current.can_download)} type="button">
                          {current.can_download ? "Make view only" : "Allow downloads"}
                        </button>
                        <button onClick={() => revoke(client.id)} type="button">Revoke</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => grant(client.id, false)} type="button">Grant view</button>
                        <button onClick={() => grant(client.id, true)} type="button">Grant + download</button>
                      </>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}
