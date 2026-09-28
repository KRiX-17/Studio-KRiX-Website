"use client";

import {
  DragEvent,
  FormEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "@/app/portal/[slug]/gallery.module.css";

type Data = {
  gallery: {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    category: string | null;
    event_date: string | null;
    location: string | null;
    status: string;
  };
  canDownload: boolean;
  canUpload: boolean;
  assets: Array<{
    id: string;
    filename: string;
    alt_text: string;
    caption: string | null;
    preview_url: string | null;
    is_downloadable: boolean;
  }>;
  selections: Array<{ asset_id: string; selected: boolean }>;
  comments: Array<{
    id: string;
    asset_id: string | null;
    user_id: string;
    body: string;
    is_resolved: boolean;
    created_at: string;
  }>;
};

async function portalAction<T>(action: string, body: Record<string, unknown>) {
  const response = await fetch("/api/portal/action", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, body }),
  });
  const result = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(result.error ?? "Portal action failed");
  return result;
}

function triggerDownload(url: string) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.rel = "noreferrer";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
}

async function createWebPreview(file: File) {
  const bitmap = await createImageBitmap(file);
  const originalWidth = bitmap.width;
  const originalHeight = bitmap.height;
  const scale = Math.min(
    1,
    3200 / Math.max(originalWidth, originalHeight),
  );
  const width = Math.max(1, Math.round(originalWidth * scale));
  const height = Math.max(1, Math.round(originalHeight * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { alpha: false });

  if (!context) {
    bitmap.close();
    throw new Error("Could not create the web preview.");
  }

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) =>
        result
          ? resolve(result)
          : reject(new Error("Could not encode the web preview.")),
      "image/webp",
      0.88,
    );
  });

  const stem = file.name.replace(/\.[^.]+$/, "") || "photo";

  return {
    file: new File([blob], stem + "-web.webp", {
      type: "image/webp",
      lastModified: Date.now(),
    }),
    originalWidth,
    originalHeight,
  };
}

async function uploadToSignedUrl(signedUrl: string, file: File) {
  const form = new FormData();
  form.append("cacheControl", "3600");
  form.append("", file);

  const response = await fetch(signedUrl, {
    method: "PUT",
    headers: { "x-upsert": "false" },
    body: form,
  });

  if (!response.ok) {
    throw new Error("Storage upload failed for " + file.name);
  }
}

export function ClientGallery({ data }: { data: Data }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selected, setSelected] = useState(
    new Set(data.selections.filter((item) => item.selected).map((item) => item.asset_id)),
  );
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const selectedCount = useMemo(() => selected.size, [selected]);

  async function uploadFiles(files: File[]) {
    const images = files.filter((file) =>
      ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    );
    if (!images.length || !data.canUpload) return;

    setBusy("upload");
    setMessage("Preparing collaborator upload…");

    try {
      for (let index = 0; index < images.length; index += 1) {
        const file = images[index];
        const preview = await createWebPreview(file);

        const [originalTicket, webTicket] = await Promise.all([
          portalAction<{ storagePath: string; signedUrl: string }>(
            "create_upload_url",
            {
              galleryId: data.gallery.id,
              filename: file.name,
              mimeType: file.type,
              bytes: file.size,
              kind: "original",
            },
          ),
          portalAction<{ storagePath: string; signedUrl: string }>(
            "create_upload_url",
            {
              galleryId: data.gallery.id,
              filename: preview.file.name,
              mimeType: preview.file.type,
              bytes: preview.file.size,
              kind: "web",
            },
          ),
        ]);

        setMessage(
          "Uploading " +
            String(index + 1) +
            " of " +
            String(images.length) +
            " · " +
            file.name,
        );

        await Promise.all([
          uploadToSignedUrl(originalTicket.signedUrl, file),
          uploadToSignedUrl(webTicket.signedUrl, preview.file),
        ]);

        const altText = file.name
          .replace(/\.[^.]+$/, "")
          .replace(/[-_]+/g, " ")
          .trim();

        await portalAction("complete_upload", {
          galleryId: data.gallery.id,
          storagePath: originalTicket.storagePath,
          webStoragePath: webTicket.storagePath,
          filename: file.name,
          mimeType: file.type,
          bytes: file.size,
          width: preview.originalWidth,
          height: preview.originalHeight,
          altText,
        });
      }

      setMessage("Upload complete. Studio KRiX can now curate these frames.");
      window.setTimeout(() => window.location.reload(), 450);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Collaborator upload failed.",
      );
      setBusy(null);
    }
  }

  function onUploadDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    void uploadFiles(Array.from(event.dataTransfer.files));
  }

  async function toggle(assetId: string) {
    const next = !selected.has(assetId);
    const clone = new Set(selected);
    if (next) clone.add(assetId);
    else clone.delete(assetId);
    setSelected(clone);

    try {
      await portalAction("toggle_selection", {
        galleryId: data.gallery.id,
        assetId,
        selected: next,
      });
    } catch {
      setSelected(selected);
    }
  }

  async function downloadAsset(assetId: string) {
    setBusy("download-" + assetId);
    setMessage(null);
    try {
      const result = await portalAction<{ url: string }>("download_asset", {
        assetId,
      });
      triggerDownload(result.url);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Download failed.");
    } finally {
      setBusy(null);
    }
  }

  async function downloadAll() {
    setBusy("all");
    setMessage("Preparing secure downloads…");
    try {
      const result = await portalAction<{
        files: Array<{ filename: string; url: string }>;
      }>("download_all", { galleryId: data.gallery.id });

      result.files.forEach((file, index) => {
        window.setTimeout(() => triggerDownload(file.url), index * 250);
      });
      setMessage("Download links opened. Your browser may ask to allow multiple downloads.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Download failed.");
    } finally {
      setBusy(null);
    }
  }

  async function addComment(
    event: FormEvent<HTMLFormElement>,
    assetId: string,
  ) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const comment = String(form.get("comment") ?? "").trim();
    if (!comment) return;

    setBusy("comment-" + assetId);
    try {
      await portalAction("comment", {
        galleryId: data.gallery.id,
        assetId,
        comment,
      });
      setMessage("Note saved.");
      event.currentTarget.reset();
      window.location.reload();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save note.");
      setBusy(null);
    }
  }

  return (
    <>
      <header className={styles.hero}>
        <div>
          <p className={styles.kicker}>
            {[data.gallery.category, data.gallery.location, data.gallery.event_date]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <h1>{data.gallery.title}</h1>
          {data.gallery.description && <p>{data.gallery.description}</p>}
        </div>

        <div className={styles.heroActions}>
          <span>{selectedCount} selected</span>
          {data.canDownload && (
            <button disabled={busy === "all"} onClick={downloadAll} type="button">
              {busy === "all" ? "Preparing…" : "Download all ↓"}
            </button>
          )}
        </div>
      </header>

      {message && <p className={styles.message}>{message}</p>}

      {data.canUpload && (
        <section className={styles.collaboratorUpload}>
          <div>
            <p className={styles.kicker}>Collaborator upload</p>
            <h2>Add finished frames.</h2>
            <p>
              Upload rights are limited to this gallery. Studio KRiX keeps
              publishing, client permissions and user management locked to the
              Super Admin.
            </p>
          </div>
          <div
            className={
              dragActive
                ? styles.collaboratorDropActive
                : styles.collaboratorDrop
            }
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={onUploadDrop}
          >
            <input
              ref={inputRef}
              hidden
              multiple
              accept="image/jpeg,image/png,image/webp"
              type="file"
              onChange={(event) => {
                if (event.target.files) {
                  void uploadFiles(Array.from(event.target.files));
                }
                event.target.value = "";
              }}
            />
            <strong>Drop full-resolution finals here</strong>
            <span>Web previews are generated automatically</span>
            <button
              disabled={busy === "upload"}
              onClick={() => inputRef.current?.click()}
              type="button"
            >
              {busy === "upload" ? "Uploading…" : "Choose photos"}
            </button>
          </div>
        </section>
      )}

      <section className={styles.grid}>
        {data.assets.map((asset, index) => {
          const isSelected = selected.has(asset.id);
          const comments = data.comments.filter((comment) => comment.asset_id === asset.id);

          return (
            <article className={styles.card} key={asset.id}>
              <div className={styles.imageWrap}>
                {asset.preview_url ? (
                  <img alt={asset.alt_text} src={asset.preview_url} />
                ) : (
                  <span>Preview unavailable</span>
                )}
                <span className={styles.number}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={styles.actions}>
                <button
                  className={isSelected ? styles.selected : ""}
                  onClick={() => toggle(asset.id)}
                  type="button"
                >
                  {isSelected ? "Selected ♥" : "Select ♡"}
                </button>
                {data.canDownload && asset.is_downloadable && (
                  <button
                    disabled={busy === "download-" + asset.id}
                    onClick={() => downloadAsset(asset.id)}
                    type="button"
                  >
                    Download ↓
                  </button>
                )}
              </div>

              {(asset.caption || comments.length > 0) && (
                <div className={styles.notes}>
                  {asset.caption && <p>{asset.caption}</p>}
                  {comments.map((comment) => (
                    <blockquote key={comment.id}>{comment.body}</blockquote>
                  ))}
                </div>
              )}

              <details className={styles.commentBox}>
                <summary>Add a note</summary>
                <form onSubmit={(event) => addComment(event, asset.id)}>
                  <textarea
                    maxLength={2000}
                    name="comment"
                    placeholder="Retouching note, selection feedback, question…"
                    rows={3}
                  />
                  <button
                    disabled={busy === "comment-" + asset.id}
                    type="submit"
                  >
                    Save note
                  </button>
                </form>
              </details>
            </article>
          );
        })}
      </section>
    </>
  );
}
