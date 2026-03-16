import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/data/events";
import { getStateName } from "@/lib/data/mexico-states";
import type { StateCode } from "@/lib/data/mexico-states";
import { Lineup } from "./components/Lineup";
import { EventInfo } from "./components/EventInfo";
import styles from "./page.module.css";

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

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return { title: "Evento no encontrado" };
  }

  const headliners = event.shows
    .filter((s) => s.isHeadliner)
    .map((s) => s.band.name)
    .join(", ");

  const description = event.description
    ?? `${event.title} en ${event.venueName}, ${event.city}. ${formatDate(event.startDate)}.`;

  return {
    title: event.title,
    description,
    openGraph: {
      title: event.title,
      description,
      type: "website",
      locale: "es_MX",
      siteName: "Metal MX",
      ...(event.flyerUrl ? { images: [{ url: event.flyerUrl }] } : {}),
    },
    keywords: [
      "metal",
      "concierto",
      event.city,
      getStateName(event.state as StateCode),
      ...event.shows.map((s) => s.band.name),
      ...(headliners ? [headliners] : []),
    ],
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const isFestival = event.eventType === "festival";

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Volver al calendario
      </Link>

      <div className={styles.header}>
        <div className={styles.flyerSection}>
          {event.flyerUrl ? (
            <Image
              src={event.flyerUrl}
              alt={`Flyer de ${event.title}`}
              width={400}
              height={560}
              className={styles.flyerImage}
              style={{ objectFit: "contain" }}
              priority
            />
          ) : (
            <div className={styles.flyerPlaceholder}>🤘</div>
          )}
        </div>

        <div className={styles.headerInfo}>
          <span
            className={`${styles.badge} ${BADGE_STYLES[event.eventType] ?? styles.badgeConcert}`}
          >
            {EVENT_TYPE_LABELS[event.eventType] ?? event.eventType}
          </span>

          <h1 className={styles.title}>{event.title}</h1>

          <div className={styles.dateLine}>
            📅{" "}
            <span className={styles.dateHighlight}>
              {formatDate(event.startDate)}
              {event.endDate && ` — ${formatDate(event.endDate)}`}
            </span>
          </div>

          <div className={styles.venueLine}>
            📍 {event.venueName}
            {event.venueAddress && ` · ${event.venueAddress}`}
          </div>

          <div className={styles.locationLine}>
            {event.city},{" "}
            {getStateName(event.state as StateCode)}
          </div>

          <div className={styles.actions}>
            {event.ticketUrl && (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ticketButton}
              >
                🎟️ Comprar Boletos
              </a>
            )}
            {event.ticketPriceInfo && !event.ticketUrl && (
              <span className={styles.shareButton}>
                {event.ticketPriceInfo}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.mainContent}>
          {event.description && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Acerca del evento</h2>
              <p className={styles.description}>{event.description}</p>
            </div>
          )}

          {event.shows.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                {isFestival ? "Lineup" : "Bandas"}
              </h2>
              <Lineup shows={event.shows} isFestival={isFestival} />
            </div>
          )}
        </div>

        <aside className={styles.sidebar}>
          <EventInfo event={event} />
        </aside>
      </div>
    </div>
  );
}
