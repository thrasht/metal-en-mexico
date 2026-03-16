import Link from "next/link";
import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";

export default async function AdminDashboard() {
  const [pendingCount, approvedCount, rejectedCount, totalBands] =
    await Promise.all([
      prisma.event.count({ where: { status: "pending" } }),
      prisma.event.count({ where: { status: "approved" } }),
      prisma.event.count({ where: { status: "rejected" } }),
      prisma.band.count(),
    ]);

  const recentPending = await prisma.event.findMany({
    where: { status: "pending" },
    include: {
      shows: { include: { band: true }, orderBy: { sortOrder: "asc" } },
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.statPending}`}>
          <span className={styles.statNumber}>{pendingCount}</span>
          <span className={styles.statLabel}>Pendientes</span>
        </div>
        <div className={`${styles.statCard} ${styles.statApproved}`}>
          <span className={styles.statNumber}>{approvedCount}</span>
          <span className={styles.statLabel}>Aprobados</span>
        </div>
        <div className={`${styles.statCard} ${styles.statRejected}`}>
          <span className={styles.statNumber}>{rejectedCount}</span>
          <span className={styles.statLabel}>Rechazados</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{totalBands}</span>
          <span className={styles.statLabel}>Bandas</span>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Eventos pendientes</h2>
          <Link href="/admin/eventos?status=pending" className={styles.viewAll}>
            Ver todos →
          </Link>
        </div>

        {recentPending.length === 0 ? (
          <p className={styles.emptyText}>No hay eventos pendientes</p>
        ) : (
          <div className={styles.eventList}>
            {recentPending.map((event) => (
              <Link
                key={event.id}
                href={`/admin/eventos?status=pending`}
                className={styles.eventRow}
              >
                <div>
                  <span className={styles.eventTitle}>{event.title}</span>
                  <span className={styles.eventMeta}>
                    {event.city}, {event.state} ·{" "}
                    {event.startDate.toLocaleDateString("es-MX")} ·{" "}
                    {event.shows.map((s) => s.band.name).join(", ")}
                  </span>
                </div>
                <span className={styles.pendingBadge}>Pendiente</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
