import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import {
  MOCK_EVENTS,
  getEventsByState,
  getEventsByDateRange,
  getEventBySlug,
} from "@/lib/data/mock-events";
import { MEXICO_STATES, DEFAULT_STATE, getStateName } from "@/lib/data/mexico-states";

const src = path.resolve(__dirname, "..");

function readFile(relativePath: string): string {
  return fs.readFileSync(path.resolve(src, relativePath), "utf-8");
}

describe("Datos de estados de México", () => {
  it("tiene los 32 estados", () => {
    expect(MEXICO_STATES).toHaveLength(32);
  });

  it("SLP es el estado por defecto", () => {
    expect(DEFAULT_STATE).toBe("SLP");
  });

  it("getStateName retorna el nombre correcto", () => {
    expect(getStateName("SLP")).toBe("San Luis Potosí");
    expect(getStateName("CDMX")).toBe("Ciudad de México");
    expect(getStateName("JAL")).toBe("Jalisco");
  });

  it("cada estado tiene code y name", () => {
    for (const state of MEXICO_STATES) {
      expect(state.code).toBeTruthy();
      expect(state.name).toBeTruthy();
    }
  });
});

describe("Mock Events", () => {
  it("tiene al menos 10 eventos", () => {
    expect(MOCK_EVENTS.length).toBeGreaterThanOrEqual(10);
  });

  it("tiene eventos de diferentes tipos", () => {
    const types = new Set(MOCK_EVENTS.map((e) => e.eventType));
    expect(types.has("concert")).toBe(true);
    expect(types.has("festival")).toBe(true);
    expect(types.has("expo")).toBe(true);
  });

  it("tiene eventos en SLP", () => {
    const slpEvents = MOCK_EVENTS.filter((e) => e.state === "SLP");
    expect(slpEvents.length).toBeGreaterThanOrEqual(3);
  });

  it("tiene eventos en otros estados", () => {
    const nonSlpStates = new Set(
      MOCK_EVENTS.filter((e) => e.state !== "SLP").map((e) => e.state)
    );
    expect(nonSlpStates.size).toBeGreaterThanOrEqual(2);
  });

  it("festivales tienen endDate", () => {
    const festivals = MOCK_EVENTS.filter((e) => e.eventType === "festival");
    for (const fest of festivals) {
      expect(fest.endDate).toBeTruthy();
    }
  });

  it("eventos sin shows (expo, screening) tienen array vacío", () => {
    const noShows = MOCK_EVENTS.filter((e) => e.shows.length === 0);
    expect(noShows.length).toBeGreaterThanOrEqual(1);
    for (const event of noShows) {
      expect(["expo", "screening", "meetup"]).toContain(event.eventType);
    }
  });

  it("conciertos y festivales tienen al menos un show", () => {
    const withShows = MOCK_EVENTS.filter(
      (e) => e.eventType === "concert" || e.eventType === "festival"
    );
    for (const event of withShows) {
      expect(event.shows.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("cada evento tiene slug único", () => {
    const slugs = MOCK_EVENTS.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("festivales tienen shows con stage y showDate", () => {
    const festivals = MOCK_EVENTS.filter((e) => e.eventType === "festival");
    for (const fest of festivals) {
      for (const show of fest.shows) {
        expect(show.stage).toBeTruthy();
        expect(show.showDate).toBeTruthy();
      }
    }
  });
});

describe("Funciones de filtrado", () => {
  it("getEventsByState filtra por estado", () => {
    const slp = getEventsByState("SLP");
    for (const e of slp) {
      expect(e.state).toBe("SLP");
    }
  });

  it("getEventsByState('ALL') retorna todos", () => {
    const all = getEventsByState("ALL");
    expect(all.length).toBe(MOCK_EVENTS.length);
  });

  it("getEventBySlug encuentra un evento existente", () => {
    const event = getEventBySlug("kreator-nervosa-slp-2026");
    expect(event).toBeDefined();
    expect(event?.title).toContain("Kreator");
  });

  it("getEventBySlug retorna undefined para slug inexistente", () => {
    const event = getEventBySlug("slug-que-no-existe");
    expect(event).toBeUndefined();
  });

  it("getEventsByDateRange filtra por rango de fechas", () => {
    const start = MOCK_EVENTS[0].startDate;
    const end = MOCK_EVENTS[0].startDate;
    const results = getEventsByDateRange(MOCK_EVENTS, start, end);
    expect(results.length).toBeGreaterThanOrEqual(1);
    for (const e of results) {
      const eEnd = e.endDate ?? e.startDate;
      expect(e.startDate <= end && eEnd >= start).toBe(true);
    }
  });
});

describe("Componentes del calendario", () => {
  it("CalendarView existe y usa FullCalendar", () => {
    const content = readFile("app/components/calendar/CalendarView.tsx");
    expect(content).toContain("FullCalendar");
    expect(content).toContain("dayGridPlugin");
    expect(content).toContain("interactionPlugin");
    expect(content).toContain('locale="es"');
  });

  it("CalendarView tiene CSS Module con tema oscuro", () => {
    const css = readFile("app/components/calendar/CalendarView.module.css");
    expect(css).toContain("--fc-border-color");
    expect(css).toContain("--fc-today-bg-color");
    expect(css).toContain("fc-toolbar-title");
  });

  it("DayEventList muestra eventos del día seleccionado", () => {
    const content = readFile("app/components/calendar/DayEventList.tsx");
    expect(content).toContain("selectedDate");
    expect(content).toContain("EventCard");
    expect(content).toContain("getEventsForDate");
  });

  it("LocationFilter tiene todos los estados de México", () => {
    const content = readFile("app/components/calendar/LocationFilter.tsx");
    expect(content).toContain("MEXICO_STATES");
    expect(content).toContain("Todo México");
    expect(content).toContain("onStateChange");
  });

  it("EventCard muestra info relevante del evento", () => {
    const content = readFile("components/shared/EventCard/EventCard.tsx");
    expect(content).toContain("venueName");
    expect(content).toContain("ticketPriceInfo");
    expect(content).toContain("isHeadliner");
    expect(content).toContain("/eventos/");
  });

  it("Página principal integra calendario, filtros y lista", () => {
    const content = readFile("app/page.tsx");
    expect(content).toContain("CalendarView");
    expect(content).toContain("DayEventList");
    expect(content).toContain("LocationFilter");
    expect(content).toContain("DEFAULT_STATE");
    expect(content).toContain("selectedState");
    expect(content).toContain("selectedDate");
  });

  it("Página principal tiene CSS Module", () => {
    const css = readFile("app/page.module.css");
    expect(css).toContain(".hero");
    expect(css).toContain(".content");
    expect(css).toContain("@media (max-width: 1024px)");
  });
});
