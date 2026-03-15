import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandSection}>
            <span className={styles.brandName}>🤘 Metal MX</span>
            <p className={styles.brandDescription}>
              Tu guía de conciertos y eventos de metal en México.
              Encuentra los mejores shows cerca de ti.
            </p>
          </div>

          <div className={styles.linksSection}>
            <span className={styles.linksTitle}>Navegación</span>
            <Link href="/" className={styles.link}>Calendario</Link>
            <Link href="/enviar-evento" className={styles.link}>Enviar Evento</Link>
          </div>

          <div className={styles.linksSection}>
            <span className={styles.linksTitle}>Cuenta</span>
            <Link href="/auth/login" className={styles.link}>Iniciar Sesión</Link>
            <Link href="/auth/registro" className={styles.link}>Registrarse</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>
            &copy; {currentYear} Metal MX. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
