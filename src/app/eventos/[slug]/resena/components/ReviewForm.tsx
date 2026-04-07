"use client";

import { useActionState, useState, useRef, useCallback } from "react";
import Link from "next/link";
import type { JSONContent } from "@tiptap/react";
import RichTextEditor from "@/components/shared/RichTextEditor/RichTextEditor";
import { submitReview, type SubmitReviewState } from "../actions";
import styles from "../page.module.css";

const initialState: SubmitReviewState = {};

interface ReviewFormProps {
  eventId: string;
  eventSlug: string;
  eventTitle: string;
}

export default function ReviewForm({ eventId, eventSlug, eventTitle }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [editorContent, setEditorContent] = useState<JSONContent | null>(null);
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const submitAction = useCallback(
    async (_prevState: SubmitReviewState, formData: FormData) => {
      if (editorContent) {
        formData.set("content", JSON.stringify(editorContent));
      }
      formData.set("rating", String(rating));
      formData.set("eventId", eventId);

      photos.forEach((p, i) => {
        formData.set(`photos.${i}`, p.file);
      });

      return submitReview(_prevState, formData);
    },
    [editorContent, rating, photos, eventId]
  );

  const [state, formAction, pending] = useActionState(submitAction, initialState);

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...newPhotos].slice(0, 10));
    e.target.value = "";
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  if (state.success) {
    return (
      <div className={styles.success}>
        <h2 className={styles.successTitle}>Reseña publicada</h2>
        <p className={styles.successText}>
          Tu reseña ya está visible en la página del evento.
        </p>
        <Link href={`/eventos/${eventSlug}`} className={styles.successLink}>
          Ver evento
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className={styles.form}>
      {state.error && <div className={styles.error}>{state.error}</div>}

      <div className={styles.field}>
        <label htmlFor="title" className={styles.label}>
          Título de la reseña
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Ej: Una noche inolvidable de thrash"
          className={`${styles.input} ${state.fieldErrors?.title ? styles.inputError : ""}`}
          required
        />
        {state.fieldErrors?.title && (
          <span className={styles.fieldError}>{state.fieldErrors.title[0]}</span>
        )}
      </div>

      <div className={styles.ratingSection}>
        <label className={styles.label}>Calificación (1-10)</label>
        <div className={styles.ratingRow}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={`${styles.ratingButton} ${n <= rating ? styles.ratingActive : ""}`}
              onClick={() => setRating(n)}
            >
              {n}
            </button>
          ))}
          {rating > 0 && (
            <span className={styles.ratingValue}>{rating}/10</span>
          )}
        </div>
        {state.fieldErrors?.rating && (
          <span className={styles.fieldError}>{state.fieldErrors.rating[0]}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Tu reseña</label>
        <RichTextEditor
          onChange={setEditorContent}
          placeholder="Cuenta cómo fue el evento, el sonido, la atmósfera, el setlist..."
        />
        {state.fieldErrors?.content && (
          <span className={styles.fieldError}>{state.fieldErrors.content[0]}</span>
        )}
      </div>

      <div className={styles.photosSection}>
        <h3 className={styles.photosTitle}>Fotos del evento (opcional)</h3>
        <div className={styles.photosGrid}>
          {photos.map((photo, index) => (
            <div key={index} className={styles.photoPreview}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.preview} alt={`Foto ${index + 1}`} className={styles.photoImg} />
              <button
                type="button"
                className={styles.photoRemove}
                onClick={() => removePhoto(index)}
              >
                ✕
              </button>
            </div>
          ))}
          {photos.length < 10 && (
            <div
              className={styles.addPhotoButton}
              onClick={() => photoInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") photoInputRef.current?.click();
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>+</span>
              Agregar
            </div>
          )}
        </div>
        <input
          ref={photoInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          multiple
          onChange={handleAddPhoto}
          className={styles.photoInput}
        />
        <p className={styles.photosHint}>
          Máximo 10 fotos. JPG, PNG o WebP. Máximo 5 MB cada una.
        </p>
      </div>

      <button type="submit" className={styles.submitButton} disabled={pending || rating === 0}>
        {pending ? "Publicando..." : "Publicar Reseña"}
      </button>
    </form>
  );
}
