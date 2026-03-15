import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { MOCK_EVENTS, getEventBySlug } from "@/lib/data/mock-events";

const src = path.resolve(__dirname, "..");

function readFile(relativePath: string): string {
  return fs.readFileSync(path.resolve(src, relativePath), "utf-8");
}

describe("Página de detalle del evento", () => {
  it("existe la página /eventos/[slug]/page.tsx", () => {
    const filePath = path.resolve(src, "app/eventos/[slug]/page.tsx");
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("tiene CSS Module propio", () => {
    const filePath = path.resolve(src, "app/eventos/[slug]/page.module.css");
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("genera metadata dinámica con generateMetadata", () => {
    const content = readFile("app/eventos/[slug]/page.tsx");
    expect(content).toContain("generateMetadata");
    expect(content).toContain("openGraph");
    expect(content).toContain("keywords");
    expect(content).toContain("es_MX");
  });

  it("genera rutas estáticas con generateStaticParams", () => {
    const content = readFile("app/eventos/[slug]/page.tsx");
    expect(content).toContain("generateStaticParams");
    expect(content).toContain("MOCK_EVENTS");
  });

  it("muestra 404 si el slug no existe", () => {
    const content = readFile("app/eventos/[slug]/page.tsx");
    expect(content).toContain("notFound()");
  });

  it("muestra título, fecha, venue y ubicación", () => {
    const content = readFile("app/eventos/[slug]/page.tsx");
    expect(content).toContain("event.title");
    expect(content).toContain("event.venueName");
    expect(content).toContain("event.city");
    expect(content).toContain("getStateName");
  });

  it("muestra botón de comprar boletos cuando hay ticketUrl", () => {
    const content = readFile("app/eventos/[slug]/page.tsx");
    expect(content).toContain("ticketUrl");
    expect(content).toContain("Comprar Boletos");
  });

  it("muestra descripción del evento", () => {
    const content = readFile("app/eventos/[slug]/page.tsx");
    expect(content).toContain("event.description");
    expect(content).toContain("Acerca del evento");
  });

  it("tiene enlace para volver al calendario", () => {
    const content = readFile("app/eventos/[slug]/page.tsx");
    expect(content).toContain('href="/"');
    expect(content).toContain("Volver al calendario");
  });

  it("es responsive", () => {
    const css = readFile("app/eventos/[slug]/page.module.css");
    expect(css).toContain("@media (max-width: 768px)");
  });
});

describe("Componente Lineup", () => {
  it("existe el componente", () => {
    const filePath = path.resolve(
      src,
      "app/eventos/[slug]/components/Lineup.tsx"
    );
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("organiza shows por día y escenario para festivales", () => {
    const content = readFile("app/eventos/[slug]/components/Lineup.tsx");
    expect(content).toContain("isFestival");
    expect(content).toContain("dayGroup");
    expect(content).toContain("stageGroup");
    expect(content).toContain("showDate");
    expect(content).toContain("stage");
  });

  it("muestra nombre de banda, horario y género", () => {
    const content = readFile("app/eventos/[slug]/components/Lineup.tsx");
    expect(content).toContain("band.name");
    expect(content).toContain("startTime");
    expect(content).toContain("band.genre");
  });

  it("destaca headliners con estilo diferente", () => {
    const content = readFile("app/eventos/[slug]/components/Lineup.tsx");
    expect(content).toContain("isHeadliner");
    expect(content).toContain("styles.headliner");

    const css = readFile("app/eventos/[slug]/components/Lineup.module.css");
    expect(css).toContain(".headliner");
  });
});

describe("Componente EventInfo", () => {
  it("existe el componente", () => {
    const filePath = path.resolve(
      src,
      "app/eventos/[slug]/components/EventInfo.tsx"
    );
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("muestra detalles: fecha, venue, ubicación, precio", () => {
    const content = readFile("app/eventos/[slug]/components/EventInfo.tsx");
    expect(content).toContain("event.venueName");
    expect(content).toContain("event.city");
    expect(content).toContain("ticketPriceInfo");
    expect(content).toContain("ticketUrl");
  });

  it("tiene botones de compartir (X, Facebook, WhatsApp, copiar)", () => {
    const content = readFile("app/eventos/[slug]/components/EventInfo.tsx");
    expect(content).toContain("twitter.com/intent/tweet");
    expect(content).toContain("facebook.com/sharer");
    expect(content).toContain("wa.me");
    expect(content).toContain("clipboard");
  });
});

describe("Datos mock para detalle", () => {
  it("cada evento tiene datos suficientes para la página de detalle", () => {
    for (const event of MOCK_EVENTS) {
      expect(event.title).toBeTruthy();
      expect(event.slug).toBeTruthy();
      expect(event.venueName).toBeTruthy();
      expect(event.city).toBeTruthy();
      expect(event.state).toBeTruthy();
      expect(event.startDate).toBeTruthy();
      expect(event.eventType).toBeTruthy();
    }
  });

  it("todos los slugs son accesibles via getEventBySlug", () => {
    for (const event of MOCK_EVENTS) {
      const found = getEventBySlug(event.slug);
      expect(found).toBeDefined();
      expect(found?.id).toBe(event.id);
    }
  });
});
