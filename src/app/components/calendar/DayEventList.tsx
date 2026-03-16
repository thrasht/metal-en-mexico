import type { EventWithShows } from "@/lib/types/event";
import { EventCard } from "@/components/shared/EventCard/EventCard";
import styles from "./DayEventList.module.css";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function getEventsForDate(events: EventWithShows[], dateStr: string): EventWithShows[] {
  return events.filter((e) => {
    const start = e.startDate;
    const end = e.endDate ?? e.startDate;
    return dateStr >= start && dateStr <= end;
  });
}

interface DayEventListProps {
  events: EventWithShows[];
  selectedDate: string | null;
}

export function DayEventList({ events, selectedDate }: DayEventListProps) {
  if (!selectedDate) {
    return (
      <div className={styles.panel}>
        <div className={styles.prompt}>
          <div className={styles.promptIcon}>📅</div>
          <p>Selecciona un día en el calendario para ver los eventos</p>
        </div>
      </div>
    );
  }

  const dayEvents = getEventsForDate(events, selectedDate);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.dateLabel}>{formatDate(selectedDate)}</span>
        <span className={styles.eventCount}>
          {dayEvents.length} {dayEvents.length === 1 ? "evento" : "eventos"}
        </span>
      </div>

      {dayEvents.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🎸</div>
          <p>No hay eventos este día</p>
        </div>
      ) : (
        <div className={styles.list}>
          {dayEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
