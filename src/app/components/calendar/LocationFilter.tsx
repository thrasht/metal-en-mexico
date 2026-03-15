"use client";

import { MEXICO_STATES } from "@/lib/data/mexico-states";
import styles from "./LocationFilter.module.css";

interface LocationFilterProps {
  selectedState: string;
  onStateChange: (state: string) => void;
  eventCount: number;
}

export function LocationFilter({
  selectedState,
  onStateChange,
  eventCount,
}: LocationFilterProps) {
  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <label htmlFor="state-filter" className={styles.label}>
          Estado
        </label>
        <select
          id="state-filter"
          className={styles.select}
          value={selectedState}
          onChange={(e) => onStateChange(e.target.value)}
        >
          <option value="ALL">Todo México</option>
          {MEXICO_STATES.map((state) => (
            <option key={state.code} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <span className={styles.eventCount}>
        {eventCount} {eventCount === 1 ? "evento" : "eventos"}
      </span>
    </div>
  );
}
