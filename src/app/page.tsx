"use client";

import { useState, useEffect, useCallback } from "react";
import { CalendarView } from "./components/calendar/CalendarView";
import { DayEventList } from "./components/calendar/DayEventList";
import { LocationFilter } from "./components/calendar/LocationFilter";
import LatestReviews from "./components/home/LatestReviews";
import { DEFAULT_STATE } from "@/lib/data/mexico-states";
import { fetchApprovedEvents } from "@/app/actions";
import type { EventWithShows } from "@/lib/types/event";
import styles from "./page.module.css";

export default function Home() {
  const [selectedState, setSelectedState] = useState<string>(DEFAULT_STATE);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<EventWithShows[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(
    async (start?: string, end?: string) => {
      setLoading(true);
      try {
        const data = await fetchApprovedEvents({
          state: selectedState !== "ALL" ? selectedState : undefined,
          startDate: start,
          endDate: end,
        });
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    },
    [selectedState]
  );

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  function handleStateChange(state: string) {
    setSelectedState(state);
    setSelectedDate(null);
  }

  function handleDateClick(dateStr: string) {
    setSelectedDate(dateStr);
  }

  function handleMonthChange(start: string, end: string) {
    fetchEvents(start, end);
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
            eventCount={events.length}
          />
        </div>

        <div className={styles.content}>
          <CalendarView
            events={events}
            selectedDate={selectedDate}
            onDateClick={handleDateClick}
            onMonthChange={handleMonthChange}
          />
          <DayEventList events={events} selectedDate={selectedDate} />
        </div>

        {loading && events.length === 0 && (
          <p style={{ textAlign: "center", color: "oklch(0.5 0 0)", padding: "2rem" }}>
            Cargando eventos...
          </p>
        )}

        <LatestReviews />
      </div>
    </>
  );
}
