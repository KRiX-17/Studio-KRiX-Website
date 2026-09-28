"use client";

import { FormEvent, useMemo, useState } from "react";
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

export function ClientGallery({ data }: { data: Data }) {
  const [selected, setSelected] = useState(
    new Set(data.selections.filter((item) => item.selected).map((item) => item.asset_id)),
  );
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const selectedCount = useMemo(() => selected.size, [selected]);

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
