"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { register, type RegisterState } from "./actions";
import styles from "../auth.module.css";

const initialState: RegisterState = {};

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(register, initialState);

  useEffect(() => {
    if (state.success) {
      window.location.href = "/";
    }
  }, [state.success]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Crear Cuenta</h1>
          <p className={styles.subtitle}>
            Únete a la comunidad metalera de México
          </p>
        </div>

        {state.error && <div className={styles.error}>{state.error}</div>}

        <form action={formAction} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Tu nombre"
              required
              className={`${styles.input} ${state.fieldErrors?.name ? styles.inputError : ""}`}
            />
            {state.fieldErrors?.name && (
              <span className={styles.fieldError}>
                {state.fieldErrors.name[0]}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              required
              className={`${styles.input} ${state.fieldErrors?.email ? styles.inputError : ""}`}
            />
            {state.fieldErrors?.email && (
              <span className={styles.fieldError}>
                {state.fieldErrors.email[0]}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              required
              className={`${styles.input} ${state.fieldErrors?.password ? styles.inputError : ""}`}
            />
            {state.fieldErrors?.password && (
              <span className={styles.fieldError}>
                {state.fieldErrors.password[0]}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Repite tu contraseña"
              required
              className={`${styles.input} ${state.fieldErrors?.confirmPassword ? styles.inputError : ""}`}
            />
            {state.fieldErrors?.confirmPassword && (
              <span className={styles.fieldError}>
                {state.fieldErrors.confirmPassword[0]}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className={styles.submitButton}
          >
            {pending ? "Creando cuenta..." : "Crear Cuenta"}
          </button>
        </form>

        <div className={styles.footer}>
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className={styles.footerLink}>
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
