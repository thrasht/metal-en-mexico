import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import styles from "./layout.module.css";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/eventos", label: "Eventos" },
  { href: "/admin/resenas", label: "Reseñas" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/admin");
  }

  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  if (profile?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span className={styles.sidebarTitle}>Admin</span>
        </div>
        <nav className={styles.sidebarNav}>
          {adminNav.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navItem}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.backLink}>
            ← Volver al sitio
          </Link>
        </div>
      </aside>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
