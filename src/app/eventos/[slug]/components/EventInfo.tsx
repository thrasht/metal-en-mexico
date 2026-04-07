"use client";

import { useState, useEffect } from "react";
import type { EventWithShows } from "@/lib/types/event";
import { getStateName } from "@/lib/data/mexico-states";
import type { StateCode } from "@/lib/data/mexico-states";
import styles from "./EventInfo.module.css";

function formatFullDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface EventInfoProps {
  event: EventWithShows;
}

export function EventInfo({ event }: EventInfoProps) {
  const fallbackUrl = `https://metalmx.com/eventos/${event.slug}`;
  const [shareUrl, setShareUrl] = useState(fallbackUrl);
  const shareText = `${event.title} - ${formatFullDate(event.startDate)}`;

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  function handleCopyLink() {
    navigator.clipboard.writeText(shareUrl);
  }

  return (
    <div className={styles.card}>
      <span className={styles.cardTitle}>Detalles</span>

      <div className={styles.row}>
        <span className={styles.label}>Fecha</span>
        <span className={styles.value}>
          {formatFullDate(event.startDate)}
          {event.endDate && ` — ${formatFullDate(event.endDate)}`}
        </span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Venue</span>
        <span className={styles.value}>{event.venueName}</span>
        {event.venueAddress && (
          <span className={styles.label} style={{ marginTop: "0.15rem" }}>
            {event.venueAddress}
          </span>
        )}
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Ubicación</span>
        <span className={styles.value}>
          {event.city}, {getStateName(event.state as StateCode)}
        </span>
      </div>

      {event.ticketPriceInfo && (
        <div className={styles.row}>
          <span className={styles.label}>Precio</span>
          <span className={styles.priceValue}>{event.ticketPriceInfo}</span>
        </div>
      )}

      {event.ticketUrl && (
        <div className={styles.row}>
          <span className={styles.label}>Boletos</span>
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Comprar boletos →
          </a>
        </div>
      )}

      <div className={styles.divider} />

      <div className={styles.shareSection}>
        <span className={styles.label}>Compartir</span>
        <div className={styles.shareButtons}>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shareBtn}
            title="Compartir en X"
          >
            𝕏
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shareBtn}
            title="Compartir en Facebook"
          >
            f
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shareBtn}
            title="Compartir en WhatsApp"
          >
            💬
          </a>
          <button
            onClick={handleCopyLink}
            className={styles.shareBtn}
            title="Copiar enlace"
          >
            🔗
          </button>
        </div>
      </div>
    </div>
  );
}
