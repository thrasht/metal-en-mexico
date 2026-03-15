"use client";

import { useState, useMemo } from "react";
import { CalendarView } from "./components/calendar/CalendarView";
import { DayEventList } from "./components/calendar/DayEventList";
import { LocationFilter } from "./components/calendar/LocationFilter";
import { MOCK_EVENTS, getEventsByState } from "@/lib/data/mock-events";
import { DEFAULT_STATE } from "@/lib/data/mexico-states";
import styles from "./page.module.css";

export default function Home() {
  const [selectedState, setSelectedState] = useState<string>(DEFAULT_STATE);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredEvents = useMemo(
    () => getEventsByState(selectedState),
    [selectedState]
  );

  function handleStateChange(state: string) {
    setSelectedState(state);
    setSelectedDate(null);
  }

  function handleDateClick(dateStr: string) {
    setSelectedDate(dateStr);
  }

  function handleMonthChange() {
    // When connected to API, fetch events for the new date range here
  }

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Conciertos de <span className={styles.heroAccent}>Metal</span> en
          México
        </h1>
        <p className={styles.heroSubtitle}>
          Encuentra los mejores eventos de metal cerca de ti
        </p>
      </section>

      <div className={styles.container}>
        <div className={styles.toolbar}>
          <LocationFilter
            selectedState={selectedState}
            onStateChange={handleStateChange}
            eventCount={filteredEvents.length}
          />
        </div>

        <div className={styles.content}>
          <CalendarView
            events={filteredEvents}
            selectedDate={selectedDate}
            onDateClick={handleDateClick}
            onMonthChange={handleMonthChange}
          />
          <DayEventList events={filteredEvents} selectedDate={selectedDate} />
        </div>
      </div>
    </>
  );
}
