"use client";
/* eslint-disable @next/next/no-img-element -- Local blob previews are generated in this browser and have no stable image URL. */

import { ChangeEvent, DragEvent, useMemo, useRef, useState } from "react";
import styles from "./portfolio-admin-demo.module.css";

type LocalPhoto = {
  id: string;
  file: File;
  url: string;
};

function createPhoto(file: File): LocalPhoto {
  return {
    id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
    file,
    url: URL.createObjectURL(file),
  };
}

export function PortfolioAdminDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<LocalPhoto[]>([]);
  const [coverId, setCoverId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const totalMegabytes = useMemo(
    () => photos.reduce((total, photo) => total + photo.file.size, 0) / 1024 / 1024,
    [photos],
  );

  function addFiles(fileList: FileList | File[]) {
    const accepted = Array.from(fileList).filter(
      (file) => file.type === "image/jpeg" || /\.jpe?g$/i.test(file.name),
    );

    if (!accepted.length) return;

    const incoming = accepted.map(createPhoto);
    setPhotos((current) => [...current, ...incoming]);
    setCoverId((current) => current ?? incoming[0]?.id ?? null);
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) addFiles(event.target.files);
    event.target.value = "";
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    addFiles(event.dataTransfer.files);
  }

  function removePhoto(id: string) {
    setPhotos((current) => {
      const target = current.find((photo) => photo.id === id);
      if (target) URL.revokeObjectURL(target.url);

      const next = current.filter((photo) => photo.id !== id);
      if (coverId === id) setCoverId(next[0]?.id ?? null);
      return next;
    });
  }

  function movePhoto(index: number, direction: -1 | 1) {
    setPhotos((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Studio KRiX / Private workspace</p>
          <h1>Photography admin</h1>
          <p className={styles.lead}>
            Build a shoot, load finished JPEGs, choose the cover and set the order.
            This preview works locally in your browser; persistence switches on when
            Supabase is connected.
          </p>
        </div>
        <div className={styles.status}>
          <span />
          Portal backend connected · uploads next
        </div>
      </header>

      <section className={styles.form} aria-labelledby="shoot-details">
        <div className={styles.sectionTitle}>
          <span>01</span>
          <div>
            <p className={styles.kicker}>Shoot details</p>
            <h2 id="shoot-details">Tell the gallery what it is.</h2>
          </div>
        </div>

        <div className={styles.fields}>
          <label>
            Gallery title
            <input defaultValue="Industry Event 3" name="title" />
          </label>
          <label>
            Category
            <select defaultValue="Fashion" name="category">
              <option>Fashion</option>
              <option>Portraits</option>
              <option>Events</option>
              <option>Creative</option>
            </select>
          </label>
          <label>
            Date
            <input defaultValue="2026-09-27" name="date" type="date" />
          </label>
          <label>
            Location
            <input defaultValue="Sydney, NSW" name="location" />
          </label>
          <label className={styles.wide}>
            Description
            <textarea
              defaultValue="Fashion photography industry event at Ted's World of Imaging in Sydney."
              name="description"
              rows={4}
            />
          </label>
          <label className={styles.wide}>
            Credits
            <input
              name="credits"
              placeholder="Models, makeup, styling, venue, event organiser..."
            />
          </label>
        </div>
      </section>

      <section className={styles.uploadSection} aria-labelledby="upload-photos">
        <div className={styles.sectionTitle}>
          <span>02</span>
          <div>
            <p className={styles.kicker}>Images</p>
            <h2 id="upload-photos">Drop the finished frames.</h2>
          </div>
        </div>

        <div
          className={`${styles.dropzone} ${dragActive ? styles.dropzoneActive : ""}`}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={onDrop}
        >
          <input
            accept=".jpg,.jpeg,image/jpeg"
            hidden
            multiple
            onChange={onInputChange}
            ref={inputRef}
            type="file"
          />
          <p>Drag JPEGs here</p>
          <span>or</span>
          <button onClick={() => inputRef.current?.click()} type="button">
            Choose photos
          </button>
          <small>RAW stays in Capture One. The site only gets finished JPGs.</small>
        </div>

        {photos.length > 0 && (
          <>
            <div className={styles.photoSummary}>
              <strong>{photos.length} photos</strong>
              <span>{totalMegabytes.toFixed(1)} MB in this browser session</span>
            </div>

            <div className={styles.photoGrid}>
              {photos.map((photo, index) => {
                const isCover = coverId === photo.id;

                return (
                  <article className={styles.photoCard} key={photo.id}>
                    <div className={styles.imageWrap}>
                      {/* Local object URLs are intentionally used in this non-persistent preview. */}
                      <img alt="" src={photo.url} />
                      {isCover && <span className={styles.coverBadge}>Cover</span>}
                    </div>
                    <div className={styles.photoMeta}>
                      <strong>{String(index + 1).padStart(2, "0")}</strong>
                      <span title={photo.file.name}>{photo.file.name}</span>
                    </div>
                    <div className={styles.actions}>
                      <button
                        disabled={index === 0}
                        onClick={() => movePhoto(index, -1)}
                        type="button"
                      >
                        ←
                      </button>
                      <button
                        disabled={index === photos.length - 1}
                        onClick={() => movePhoto(index, 1)}
                        type="button"
                      >
                        →
                      </button>
                      <button onClick={() => setCoverId(photo.id)} type="button">
                        {isCover ? "Cover ✓" : "Set cover"}
                      </button>
                      <button onClick={() => removePhoto(photo.id)} type="button">
                        Remove
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>

      <section className={styles.publish}>
        <div>
          <p className={styles.kicker}>03 / Publish</p>
          <h2>Publishing is the next connection.</h2>
          <p>
            Supabase will provide login, metadata storage and the actual photo bucket.
            Until then, this page deliberately cannot publish anything.
          </p>
        </div>
        <div className={styles.publishActions}>
          <button disabled type="button">Save draft</button>
          <button disabled type="button">Publish gallery</button>
        </div>
      </section>
    </div>
  );
}
