import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getReviewById } from "@/lib/data/reviews";
import { getEventBySlug } from "@/lib/data/events";
import RichTextRenderer from "@/components/shared/RichTextRenderer/RichTextRenderer";
import type { JSONContent } from "@tiptap/react";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ slug: string; id: string }>;
}

function getRatingStyle(rating: number): string {
  if (rating >= 8) return styles.ratingHigh;
  if (rating >= 5) return styles.ratingMid;
  return styles.ratingLow;
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const review = await getReviewById(id);

  if (!review) {
    return { title: "Reseña no encontrada" };
  }

  return {
    title: `${review.title} — Reseña`,
    description: `Reseña de ${review.author.name ?? "Anónimo"} — ${review.rating}/10`,
  };
}

export default async function ReviewDetailPage({ params }: PageProps) {
  const { slug, id } = await params;
  const [review, event] = await Promise.all([
    getReviewById(id),
    getEventBySlug(slug),
  ]);

  if (!review || !event) {
    notFound();
  }

  if (review.status !== "published") {
    notFound();
  }

  return (
    <div className={styles.container}>
      <Link href={`/eventos/${slug}`} className={styles.backLink}>
        ← Volver al evento
      </Link>

      <div className={styles.header}>
        <Link href={`/eventos/${slug}`} className={styles.eventLink}>
          {event.title}
        </Link>
        <h1 className={styles.title}>{review.title}</h1>
        <div className={styles.meta}>
          <span className={styles.author}>
            {review.author.name ?? "Anónimo"}
          </span>
          <span className={`${styles.ratingBadge} ${getRatingStyle(review.rating)}`}>
            {review.rating}/10
          </span>
          <span>{formatDate(review.createdAt)}</span>
        </div>
      </div>

      <div className={styles.body}>
        <RichTextRenderer content={review.content as JSONContent} />
      </div>

      {review.photos.length > 0 && (
        <div className={styles.photosSection}>
          <h2 className={styles.photosTitle}>Fotos</h2>
          <div className={styles.photosGrid}>
            {review.photos.map((photo) => (
              <div key={photo.id} className={styles.photoItem}>
                <Image
                  src={photo.url}
                  alt={photo.caption ?? "Foto del evento"}
                  width={400}
                  height={300}
                  className={styles.photoImage}
                  style={{ objectFit: "cover" }}
                />
                {photo.caption && (
                  <p className={styles.photoCaption}>{photo.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
