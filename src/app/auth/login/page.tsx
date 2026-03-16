"use client";

import { Suspense, useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { login, type LoginState } from "./actions";
import styles from "../auth.module.css";

const initialState: LoginState = {};

function RegisteredBanner() {
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("registered") === "true";
  if (!justRegistered) return null;
  return (
    <div className={styles.success}>
      Cuenta creada. Revisa tu email para confirmar y luego inicia sesión.
    </div>
  );
}

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  useEffect(() => {
    if (state.success) {
      window.location.href = "/";
    }
  }, [state.success]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Iniciar Sesión</h1>
          <p className={styles.subtitle}>
            Ingresa a tu cuenta de Metal MX
          </p>
        </div>

        <Suspense>
          <RegisteredBanner />
        </Suspense>

        {state.error && <div className={styles.error}>{state.error}</div>}

        <form action={formAction} className={styles.form}>
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
              placeholder="••••••••"
              required
              className={`${styles.input} ${state.fieldErrors?.password ? styles.inputError : ""}`}
            />
            {state.fieldErrors?.password && (
              <span className={styles.fieldError}>
                {state.fieldErrors.password[0]}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className={styles.submitButton}
          >
            {pending ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className={styles.footer}>
          ¿No tienes cuenta?{" "}
          <Link href="/auth/registro" className={styles.footerLink}>
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}
