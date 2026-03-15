"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/", label: "Calendario" },
  { href: "/enviar-evento", label: "Enviar Evento" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🤘</span>
          <span className={styles.logoText}>Metal MX</span>
        </Link>

        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.authSection}>
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/auth/registro">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Registrarse
            </Button>
          </Link>
        </div>

        <button
          className={styles.mobileMenuButton}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir menú"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.navLink}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div className="flex flex-col gap-2 pt-2">
          <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" size="sm" className="w-full">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/auth/registro" onClick={() => setMobileOpen(false)}>
            <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
              Registrarse
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
