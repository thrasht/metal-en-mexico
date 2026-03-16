"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import styles from "../page.module.css";

const MAX_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function FlyerUpload() {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) {
      setPreview(null);
      return;
    }

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Solo se aceptan imágenes JPG, PNG o WebP");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`El archivo no puede superar ${MAX_SIZE_MB}MB`);
      e.target.value = "";
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const clearFile = () => {
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={styles.flyerSection}>
      <label className={styles.label}>Flyer del evento</label>

      {preview ? (
        <div className={styles.flyerPreview}>
          <Image
            src={preview}
            alt="Preview del flyer"
            width={280}
            height={400}
            className={styles.flyerImage}
            style={{ objectFit: "contain" }}
          />
          <button type="button" className={styles.removeButton} onClick={clearFile}>
            Quitar imagen
          </button>
        </div>
      ) : (
        <label className={styles.flyerDropzone}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span>Click para subir o arrastra una imagen</span>
          <span className={styles.flyerHint}>JPG, PNG o WebP — máx {MAX_SIZE_MB}MB</span>
          <input
            ref={inputRef}
            name="flyer"
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleChange}
            className={styles.flyerInput}
          />
        </label>
      )}

      {error && <span className={styles.fieldError}>{error}</span>}
    </div>
  );
}
