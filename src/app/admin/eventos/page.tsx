import { prisma } from "@/lib/prisma";
import { EventActions } from "./components/EventActions";
import styles from "./page.module.css";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  approved: "Aprobado",
  rejected: "Rechazado",
};

const STATUS_STYLES: Record<string, string> = {
  pending: styles.statusPending,
  approved: styles.statusApproved,
  rejected: styles.statusRejected,
};

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminEventsPage({ searchParams }: PageProps) {
  const { status } = await searchParams;

  const where = status ? { status } : {};
  const events = await prisma.event.findMany({
    where,
    include: {
      shows: { include: { band: true }, orderBy: { sortOrder: "asc" } },
      submitter: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const filterLinks = [
    { label: "Todos", status: "" },
    { label: "Pendientes", status: "pending" },
    { label: "Aprobados", status: "approved" },
    { label: "Rechazados", status: "rejected" },
  ];

  return (
    <div>
      <h1 className={styles.title}>Gestión de Eventos</h1>

      <div className={styles.filters}>
        {filterLinks.map((f) => (
          <a
            key={f.status}
            href={f.status ? `/admin/eventos?status=${f.status}` : "/admin/eventos"}
            className={`${styles.filterBtn} ${(status ?? "") === f.status ? styles.filterActive : ""}`}
          >
            {f.label}
          </a>
        ))}
      </div>

      {events.length === 0 ? (
        <p className={styles.emptyText}>No hay eventos con este filtro</p>
      ) : (
        <div className={styles.eventList}>
          {events.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.eventHeader}>
                <div>
                  <span className={styles.eventTitle}>{event.title}</span>
                  <span className={styles.eventMeta}>
                    {event.city}, {event.state} ·{" "}
                    {event.startDate.toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    {event.endDate &&
                      ` — ${event.endDate.toLocaleDateString("es-MX", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}`}
                  </span>
                </div>
                <span
                  className={`${styles.statusBadge} ${STATUS_STYLES[event.status] ?? ""}`}
                >
                  {STATUS_LABELS[event.status] ?? event.status}
                </span>
              </div>

              <div className={styles.eventBody}>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Tipo:</span>
                  <span>{event.eventType}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Venue:</span>
                  <span>{event.venueName}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Bandas:</span>
                  <span>
                    {event.shows.map((s) => s.band.name).join(", ") || "—"}
                  </span>
                </div>
                {event.submitter && (
                  <div className={styles.detail}>
                    <span className={styles.detailLabel}>Enviado por:</span>
                    <span>
                      {event.submitter.name ?? event.submitter.email}
                    </span>
                  </div>
                )}
                {event.ticketPriceInfo && (
                  <div className={styles.detail}>
                    <span className={styles.detailLabel}>Precio:</span>
                    <span>{event.ticketPriceInfo}</span>
                  </div>
                )}
                {event.description && (
                  <div className={styles.description}>
                    {event.description}
                  </div>
                )}
              </div>

              <EventActions eventId={event.id} currentStatus={event.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
