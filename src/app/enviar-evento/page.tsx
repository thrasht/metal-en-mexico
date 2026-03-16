"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { submitEvent, type SubmitEventState } from "./actions";
import { ShowFields } from "./components/ShowFields";
import { FlyerUpload } from "./components/FlyerUpload";
import { MEXICO_STATES } from "@/lib/data/mexico-states";
import { EVENT_TYPES } from "@/lib/validations/event";
import styles from "./page.module.css";

const initialState: SubmitEventState = {};

const EVENT_TYPE_LABELS: Record<string, string> = {
  concert: "Concierto",
  festival: "Festival",
  expo: "Expo / Feria",
  screening: "Screening / Proyección",
  meetup: "Meetup / Reunión",
};

export default function SubmitEventPage() {
  const [state, formAction, pending] = useActionState(submitEvent, initialState);
  const [eventType, setEventType] = useState("concert");
  const [hasEndDate, setHasEndDate] = useState(false);

  if (state.success) {
    return (
      <div className={styles.container}>
        <div className={styles.success}>
          <h2 className={styles.successTitle}>Evento enviado</h2>
          <p className={styles.successText}>
            Tu evento fue recibido y está pendiente de aprobación por un administrador.
            Te notificaremos cuando sea publicado.
          </p>
          <Link href="/" className={styles.successLink}>
            Volver al calendario
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Enviar Evento</h1>
        <p className={styles.subtitle}>
          Comparte un concierto, festival o evento de metal con la comunidad
        </p>
      </div>

      {state.error && <div className={styles.error}>{state.error}</div>}

      <form action={formAction} className={styles.form}>
        {/* Info básica */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Información del evento</h3>
          </div>

          <div className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="title" className={styles.label}>Título del evento *</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Ej: Kreator + Nervosa en SLP"
                className={`${styles.input} ${state.fieldErrors?.title ? styles.inputError : ""}`}
                required
              />
              {state.fieldErrors?.title && (
                <span className={styles.fieldError}>{state.fieldErrors.title[0]}</span>
              )}
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="eventType" className={styles.label}>Tipo de evento *</label>
                <select
                  id="eventType"
                  name="eventType"
                  className={styles.select}
                  value={eventType}
                  onChange={(e) => {
                    setEventType(e.target.value);
                    if (e.target.value === "festival") setHasEndDate(true);
                  }}
                >
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {EVENT_TYPE_LABELS[type]}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="startDate" className={styles.label}>Fecha de inicio *</label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  className={`${styles.input} ${state.fieldErrors?.startDate ? styles.inputError : ""}`}
                  required
                />
                {state.fieldErrors?.startDate && (
                  <span className={styles.fieldError}>{state.fieldErrors.startDate[0]}</span>
                )}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.checkboxField}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={hasEndDate}
                    onChange={(e) => setHasEndDate(e.target.checked)}
                    className={styles.checkbox}
                  />
                  Evento de varios días
                </label>
              </div>

              {hasEndDate && (
                <div className={styles.field}>
                  <label htmlFor="endDate" className={styles.label}>Fecha de fin</label>
                  <input
                    id="endDate"
                    name="endDate"
                    type="date"
                    className={`${styles.input} ${state.fieldErrors?.endDate ? styles.inputError : ""}`}
                  />
                  {state.fieldErrors?.endDate && (
                    <span className={styles.fieldError}>{state.fieldErrors.endDate[0]}</span>
                  )}
                </div>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="description" className={styles.label}>Descripción</label>
              <textarea
                id="description"
                name="description"
                placeholder="Detalles adicionales del evento..."
                className={styles.textarea}
                maxLength={2000}
              />
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Ubicación</h3>
          </div>

          <div className={styles.form}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="venueName" className={styles.label}>Nombre del venue *</label>
                <input
                  id="venueName"
                  name="venueName"
                  type="text"
                  placeholder="Ej: Foro Indie Rocks"
                  className={`${styles.input} ${state.fieldErrors?.venueName ? styles.inputError : ""}`}
                  required
                />
                {state.fieldErrors?.venueName && (
                  <span className={styles.fieldError}>{state.fieldErrors.venueName[0]}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="venueAddress" className={styles.label}>Dirección</label>
                <input
                  id="venueAddress"
                  name="venueAddress"
                  type="text"
                  placeholder="Calle y número"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="state" className={styles.label}>Estado *</label>
                <select
                  id="state"
                  name="state"
                  className={`${styles.select} ${state.fieldErrors?.state ? styles.inputError : ""}`}
                  defaultValue="SLP"
                >
                  {MEXICO_STATES.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name}
                    </option>
                  ))}
                </select>
                {state.fieldErrors?.state && (
                  <span className={styles.fieldError}>{state.fieldErrors.state[0]}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="city" className={styles.label}>Ciudad *</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Ej: San Luis Potosí"
                  className={`${styles.input} ${state.fieldErrors?.city ? styles.inputError : ""}`}
                  required
                />
                {state.fieldErrors?.city && (
                  <span className={styles.fieldError}>{state.fieldErrors.city[0]}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bandas */}
        <div className={styles.section}>
          <ShowFields
            isMultiDay={hasEndDate}
            fieldErrors={state.fieldErrors}
          />
        </div>

        {/* Boletos */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Boletos</h3>
          </div>

          <div className={styles.form}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="ticketUrl" className={styles.label}>URL de compra de boletos</label>
                <input
                  id="ticketUrl"
                  name="ticketUrl"
                  type="url"
                  placeholder="https://..."
                  className={`${styles.input} ${state.fieldErrors?.ticketUrl ? styles.inputError : ""}`}
                />
                {state.fieldErrors?.ticketUrl && (
                  <span className={styles.fieldError}>{state.fieldErrors.ticketUrl[0]}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="ticketPriceInfo" className={styles.label}>Info de precios</label>
                <input
                  id="ticketPriceInfo"
                  name="ticketPriceInfo"
                  type="text"
                  placeholder="Ej: $350 preventa / $450 día del evento"
                  className={styles.input}
                  maxLength={200}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Flyer */}
        <div className={styles.section}>
          <FlyerUpload />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={pending}
          className={styles.submitButton}
        >
          {pending ? "Enviando evento..." : "Enviar Evento"}
        </button>
      </form>
    </div>
  );
}
