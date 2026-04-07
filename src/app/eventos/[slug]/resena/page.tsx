import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getEventBySlug } from "@/lib/data/events";
import { getReviewByEventAndAuthor } from "@/lib/data/reviews";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import ReviewForm from "./components/ReviewForm";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function WriteReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event || event.status !== "approved") {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth/login?redirect=/eventos/${slug}/resena`);
  }

  const dbEvent = await prisma.event.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!dbEvent) notFound();

  const existingReview = await getReviewByEventAndAuthor(dbEvent.id, user.id);
  if (existingReview) {
    return (
      <div className={styles.container}>
        <Link href={`/eventos/${slug}`} className={styles.backLink}>
          ← Volver al evento
        </Link>
        <div className={styles.error}>
          Ya escribiste una reseña para este evento.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link href={`/eventos/${slug}`} className={styles.backLink}>
        ← Volver al evento
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>Escribir Reseña</h1>
        <p className={styles.eventName}>
          Para{" "}
          <span className={styles.eventNameHighlight}>{event.title}</span>
        </p>
      </div>

      <ReviewForm eventId={dbEvent.id} eventSlug={slug} eventTitle={event.title} />
    </div>
  );
}
