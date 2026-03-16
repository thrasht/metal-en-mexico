import Link from "next/link";
import type { EventWithShows } from "@/lib/types/event";
import styles from "./EventCard.module.css";

const EVENT_TYPE_LABELS: Record<string, string> = {
  concert: "Concierto",
  festival: "Festival",
  expo: "Expo",
  screening: "Screening",
  meetup: "Meetup",
};

const BADGE_STYLES: Record<string, string> = {
  concert: styles.badgeConcert,
  festival: styles.badgeFestival,
  expo: styles.badgeExpo,
  screening: styles.badgeScreening,
  meetup: styles.badgeMeetup,
};

interface EventCardProps {
  event: EventWithShows;
}

export function EventCard({ event }: EventCardProps) {
  const headliners = event.shows
    .filter((s) => s.isHeadliner)
    .map((s) => s.band.name);
  const otherBands = event.shows
    .filter((s) => !s.isHeadliner)
    .map((s) => s.band.name);

  const bandsText =
    headliners.length > 0
      ? headliners.join(", ") +
        (otherBands.length > 0 ? ` + ${otherBands.length} más` : "")
      : "";

  const firstShowTime = event.shows
    .map((s) => s.startTime)
    .filter((t): t is string => Boolean(t))
    .sort()[0];

  return (
    <Link href={`/eventos/${event.slug}`} className={styles.card}>
      <div className={styles.flyerPlaceholder}>🤘</div>

      <div className={styles.info}>
        <span className={styles.title}>{event.title}</span>

        {bandsText && <span className={styles.bands}>{bandsText}</span>}

        <div className={styles.meta}>
          <span className={`${styles.badge} ${BADGE_STYLES[event.eventType] ?? styles.badgeConcert}`}>
            {EVENT_TYPE_LABELS[event.eventType] ?? event.eventType}
          </span>

          <span className={styles.metaItem}>
            📍 {event.venueName}
          </span>

          {firstShowTime && (
            <span className={styles.metaItem}>
              🕐 {firstShowTime}
            </span>
          )}
        </div>

        {event.ticketPriceInfo && (
          <span className={styles.price}>{event.ticketPriceInfo}</span>
        )}
      </div>
    </Link>
  );
}
