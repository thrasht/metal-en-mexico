"use client";

import { pauseReview, publishReview, deleteReview } from "../../actions";
import styles from "../page.module.css";

interface ReviewActionsProps {
  reviewId: string;
  currentStatus: string;
}

export function ReviewActions({ reviewId, currentStatus }: ReviewActionsProps) {
  return (
    <div className={styles.actions}>
      {currentStatus === "published" && (
        <form action={() => pauseReview(reviewId)}>
          <button type="submit" className={styles.pauseBtn}>
            Pausar
          </button>
        </form>
      )}
      {currentStatus === "paused" && (
        <form action={() => publishReview(reviewId)}>
          <button type="submit" className={styles.publishBtn}>
            Publicar
          </button>
        </form>
      )}
      <form
        action={() => deleteReview(reviewId)}
        onSubmit={(e) => {
          if (!confirm("¿Estás seguro de eliminar esta reseña?")) {
            e.preventDefault();
          }
        }}
      >
        <button type="submit" className={styles.deleteBtn}>
          Eliminar
        </button>
      </form>
    </div>
  );
}
