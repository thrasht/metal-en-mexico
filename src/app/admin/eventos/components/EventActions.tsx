"use client";

import { approveEvent, rejectEvent, deleteEvent } from "../../actions";
import styles from "../page.module.css";

interface EventActionsProps {
  eventId: string;
  currentStatus: string;
}

export function EventActions({ eventId, currentStatus }: EventActionsProps) {
  return (
    <div className={styles.actions}>
      {currentStatus !== "approved" && (
        <form action={() => approveEvent(eventId)}>
          <button type="submit" className={styles.approveBtn}>
            Aprobar
          </button>
        </form>
      )}
      {currentStatus !== "rejected" && (
        <form action={() => rejectEvent(eventId)}>
          <button type="submit" className={styles.rejectBtn}>
            Rechazar
          </button>
        </form>
      )}
      <form
        action={() => deleteEvent(eventId)}
        onSubmit={(e) => {
          if (!confirm("¿Estás seguro de eliminar este evento?")) {
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
