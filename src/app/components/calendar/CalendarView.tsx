"use client";

import { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventInput, DatesSetArg } from "@fullcalendar/core";
import type { DateClickArg } from "@fullcalendar/interaction";
import type { EventWithShows } from "@/lib/types/event";
import styles from "./CalendarView.module.css";

const EVENT_TYPE_COLORS: Record<string, string> = {
  concert: "oklch(0.55 0.15 25)",
  festival: "oklch(0.65 0.18 45)",
  expo: "oklch(0.5 0.12 280)",
  screening: "oklch(0.5 0.1 200)",
  meetup: "oklch(0.5 0.1 150)",
};

function toCalendarEvents(events: EventWithShows[]): EventInput[] {
  return events.map((e) => ({
    id: e.id,
    title: e.title,
    start: e.startDate,
    end: e.endDate
      ? new Date(new Date(e.endDate).getTime() + 86400000)
          .toISOString()
          .split("T")[0]
      : undefined,
    color: EVENT_TYPE_COLORS[e.eventType] ?? EVENT_TYPE_COLORS.concert,
    extendedProps: {
      slug: e.slug,
      eventType: e.eventType,
      venueName: e.venueName,
      city: e.city,
    },
  }));
}

interface CalendarViewProps {
  events: EventWithShows[];
  selectedDate: string | null;
  onDateClick: (dateStr: string) => void;
  onMonthChange: (start: string, end: string) => void;
}

export function CalendarView({
  events,
  selectedDate,
  onDateClick,
  onMonthChange,
}: CalendarViewProps) {
  const calendarRef = useRef<FullCalendar>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedDate || !containerRef.current) return;
    containerRef.current.querySelectorAll(`.${styles.selectedDay}`).forEach((el) => {
      el.classList.remove(styles.selectedDay);
    });
    const dayEl = containerRef.current.querySelector(
      `[data-date="${selectedDate}"]`
    );
    if (dayEl) {
      dayEl.classList.add(styles.selectedDay);
    }
  }, [selectedDate]);

  function handleDateClick(info: DateClickArg) {
    onDateClick(info.dateStr);
  }

  function handleDatesSet(info: DatesSetArg) {
    const start = info.startStr.split("T")[0];
    const end = info.endStr.split("T")[0];
    onMonthChange(start, end);
  }

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="es"
        firstDay={1}
        height="auto"
        events={toCalendarEvents(events)}
        dateClick={handleDateClick}
        datesSet={handleDatesSet}
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next",
        }}
        dayMaxEvents={3}
        fixedWeekCount={false}
      />
    </div>
  );
}
