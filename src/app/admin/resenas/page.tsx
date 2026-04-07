import { getAllReviews } from "@/lib/data/reviews";
import { ReviewActions } from "./components/ReviewActions";
import styles from "./page.module.css";

const STATUS_LABELS: Record<string, string> = {
  published: "Publicada",
  paused: "Pausada",
};

const STATUS_STYLES: Record<string, string> = {
  published: styles.statusPublished,
  paused: styles.statusPaused,
};

function getRatingStyle(rating: number): string {
  if (rating >= 8) return styles.ratingHigh;
  if (rating >= 5) return styles.ratingMid;
  return styles.ratingLow;
}

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminReviewsPage({ searchParams }: PageProps) {
  const { status } = await searchParams;

  const reviews = await getAllReviews(status ? { status } : undefined);

  const filterLinks = [
    { label: "Todas", status: "" },
    { label: "Publicadas", status: "published" },
    { label: "Pausadas", status: "paused" },
  ];

  return (
    <div>
      <h1 className={styles.title}>Gestión de Reseñas</h1>

      <div className={styles.filters}>
        {filterLinks.map((f) => (
          <a
            key={f.status}
            href={f.status ? `/admin/resenas?status=${f.status}` : "/admin/resenas"}
            className={`${styles.filterBtn} ${(status ?? "") === f.status ? styles.filterActive : ""}`}
          >
            {f.label}
          </a>
        ))}
      </div>

      {reviews.length === 0 ? (
        <p className={styles.emptyText}>No hay reseñas con este filtro</p>
      ) : (
        <div className={styles.reviewList}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div>
                  <span className={styles.reviewTitle}>{review.title}</span>
                  <span className={styles.reviewMeta}>
                    Por {review.author.name ?? "Anónimo"} ·{" "}
                    {new Date(review.createdAt).toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <span
                  className={`${styles.statusBadge} ${STATUS_STYLES[review.status] ?? ""}`}
                >
                  {STATUS_LABELS[review.status] ?? review.status}
                </span>
              </div>

              <div className={styles.reviewBody}>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Evento:</span>
                  <span>{review.eventTitle}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Calificación:</span>
                  <span className={`${styles.ratingBadge} ${getRatingStyle(review.rating)}`}>
                    {review.rating}/10
                  </span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Fotos:</span>
                  <span>{review.photos.length}</span>
                </div>
              </div>

              <ReviewActions reviewId={review.id} currentStatus={review.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
