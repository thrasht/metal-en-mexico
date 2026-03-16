"use client";

import { useState } from "react";
import styles from "../page.module.css";

export interface ShowEntry {
  bandName: string;
  isHeadliner: boolean;
  stage: string;
  showDate: string;
  startTime: string;
  endTime: string;
  setlistFmUrl: string;
}

const emptyShow: ShowEntry = {
  bandName: "",
  isHeadliner: false,
  stage: "",
  showDate: "",
  startTime: "",
  endTime: "",
  setlistFmUrl: "",
};

interface ShowFieldsProps {
  isMultiDay: boolean;
  fieldErrors?: Record<string, string[]>;
}

export function ShowFields({ isMultiDay, fieldErrors }: ShowFieldsProps) {
  const [shows, setShows] = useState<ShowEntry[]>([{ ...emptyShow }]);

  const addShow = () => setShows([...shows, { ...emptyShow }]);

  const removeShow = (index: number) => {
    if (shows.length > 1) {
      setShows(shows.filter((_, i) => i !== index));
    }
  };

  const updateShow = (index: number, field: keyof ShowEntry, value: string | boolean) => {
    setShows(
      shows.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  const showsError = fieldErrors?.shows;

  return (
    <div className={styles.showsSection}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Bandas / Artistas</h3>
        {showsError && <span className={styles.fieldError}>{showsError[0]}</span>}
      </div>

      {shows.map((show, index) => (
        <div key={index} className={styles.showCard}>
          <div className={styles.showCardHeader}>
            <span className={styles.showNumber}>#{index + 1}</span>
            {shows.length > 1 && (
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => removeShow(index)}
              >
                Quitar
              </button>
            )}
          </div>

          <div className={styles.showGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Nombre de la banda *</label>
              <input
                name={`shows.${index}.bandName`}
                type="text"
                value={show.bandName}
                onChange={(e) => updateShow(index, "bandName", e.target.value)}
                placeholder="Ej: Metallica"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.checkboxField}>
              <input
                name={`shows.${index}.isHeadliner`}
                type="hidden"
                value={show.isHeadliner ? "true" : "false"}
              />
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={show.isHeadliner}
                  onChange={(e) => updateShow(index, "isHeadliner", e.target.checked)}
                  className={styles.checkbox}
                />
                Headliner
              </label>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Escenario</label>
              <input
                name={`shows.${index}.stage`}
                type="text"
                value={show.stage}
                onChange={(e) => updateShow(index, "stage", e.target.value)}
                placeholder="Ej: Escenario Principal"
                className={styles.input}
              />
            </div>

            {isMultiDay && (
              <div className={styles.field}>
                <label className={styles.label}>Fecha del show</label>
                <input
                  name={`shows.${index}.showDate`}
                  type="date"
                  value={show.showDate}
                  onChange={(e) => updateShow(index, "showDate", e.target.value)}
                  className={styles.input}
                />
              </div>
            )}

            <div className={styles.field}>
              <label className={styles.label}>Hora inicio</label>
              <input
                name={`shows.${index}.startTime`}
                type="time"
                value={show.startTime}
                onChange={(e) => updateShow(index, "startTime", e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Hora fin</label>
              <input
                name={`shows.${index}.endTime`}
                type="time"
                value={show.endTime}
                onChange={(e) => updateShow(index, "endTime", e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
        </div>
      ))}

      <button type="button" className={styles.addShowButton} onClick={addShow}>
        + Agregar otra banda
      </button>
    </div>
  );
}
