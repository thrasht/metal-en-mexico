"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchLatestReviews } from "@/app/actions";
import styles from "./LatestReviews.module.css";

interface ReviewItem {
  id: string;
  title: string;
  rating: number;
  createdAt: string;
  author: { name: string | null };
  eventTitle: string;
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
  });
}

export default function LatestReviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  useEffect(() => {
    fetchLatestReviews(6).then(setReviews);
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Últimas Reseñas</h2>
      </div>
      <div className={styles.list}>
        {reviews.map((review) => (
          <Link
            key={review.id}
            href={`/eventos/${review.eventSlug}/resenas/${review.id}`}
            className={styles.card}
          >
            <div className={styles.cardTop}>
              <span className={styles.eventName}>{review.eventTitle}</span>
              <span className={`${styles.rating} ${getRatingStyle(review.rating)}`}>
                {review.rating}/10
              </span>
            </div>
            <span className={styles.reviewTitle}>{review.title}</span>
            <div className={styles.cardBottom}>
              <span className={styles.author}>
                {review.author.name ?? "Anónimo"}
              </span>
              <span className={styles.date}>{formatDate(review.createdAt)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
