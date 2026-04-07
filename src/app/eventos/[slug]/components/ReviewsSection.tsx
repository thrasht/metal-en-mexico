import Link from "next/link";
import { getReviewsByEvent } from "@/lib/data/reviews";
import { prisma } from "@/lib/prisma";
import styles from "./ReviewsSection.module.css";

interface ReviewsSectionProps {
  eventSlug: string;
}

function getRatingStyle(rating: number): string {
  if (rating >= 8) return styles.ratingHigh;
  if (rating >= 5) return styles.ratingMid;
  return styles.ratingLow;
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function ReviewsSection({ eventSlug }: ReviewsSectionProps) {
  const event = await prisma.event.findUnique({
    where: { slug: eventSlug },
    select: { id: true },
  });

  if (!event) return null;

  const reviews = await getReviewsByEvent(event.id);

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Reseñas</h2>
        {avgRating && (
          <span className={styles.avgRating}>
            Promedio: <strong>{avgRating}</strong>/10
            <span className={styles.reviewCount}>
              ({reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"})
            </span>
          </span>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>
            Aún no hay reseñas para este evento.
          </p>
          <Link href={`/eventos/${eventSlug}/resena`} className={styles.writeButton}>
            Escribir la primera reseña
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.reviewsList}>
            {reviews.slice(0, 5).map((review) => (
              <Link
                key={review.id}
                href={`/eventos/${eventSlug}/resenas/${review.id}`}
                className={styles.reviewCard}
              >
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewAuthor}>
                    {review.author.name ?? "Anónimo"}
                  </span>
                  <span className={`${styles.reviewRating} ${getRatingStyle(review.rating)}`}>
                    {review.rating}/10
                  </span>
                </div>
                <h3 className={styles.reviewTitle}>{review.title}</h3>
                <span className={styles.reviewDate}>
                  {formatDate(review.createdAt)}
                </span>
              </Link>
            ))}
          </div>

          <div className={styles.actions}>
            <Link href={`/eventos/${eventSlug}/resena`} className={styles.writeButton}>
              Escribir reseña
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
