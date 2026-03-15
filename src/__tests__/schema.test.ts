import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const schemaPath = path.resolve(__dirname, "../../prisma/schema.prisma");
const schema = fs.readFileSync(schemaPath, "utf-8");

describe("Prisma Schema", () => {
  describe("Profile", () => {
    it("tiene los campos requeridos", () => {
      expect(schema).toContain("model Profile");
      expect(schema).toContain("email");
      expect(schema).toContain("role");
      expect(schema).toContain('@@map("profiles")');
    });
  });

  describe("Band", () => {
    it("tiene los campos requeridos", () => {
      expect(schema).toContain("model Band");
      expect(schema).toContain("name");
      expect(schema).toContain("slug");
      expect(schema).toContain("genre");
      expect(schema).toContain("origin");
      expect(schema).toContain("image_url");
      expect(schema).toContain('@@map("bands")');
    });

    it("name y slug son únicos", () => {
      const bandBlock = schema.split("model Band")[1].split("model ")[0];
      expect(bandBlock).toContain("@unique");
    });

    it("tiene relación con Show", () => {
      const bandBlock = schema.split("model Band")[1].split("model ")[0];
      expect(bandBlock).toContain("shows");
      expect(bandBlock).toContain("Show[]");
    });
  });

  describe("Event", () => {
    it("tiene los campos requeridos", () => {
      expect(schema).toContain("model Event");
      expect(schema).toContain("title");
      expect(schema).toContain("slug");
      expect(schema).toContain("venue_name");
      expect(schema).toContain("city");
      expect(schema).toContain("state");
      expect(schema).toContain("status");
      expect(schema).toContain("submitted_by");
      expect(schema).toContain("ticket_url");
      expect(schema).toContain('@@map("events")');
    });

    it("tiene eventType para soportar conciertos, festivales, expos", () => {
      expect(schema).toContain("event_type");
      expect(schema).toContain('@default("concert")');
    });

    it("soporta multi-día con startDate y endDate", () => {
      expect(schema).toContain("start_date");
      expect(schema).toContain("end_date");
      const eventBlock = schema.split("model Event")[1].split("model ")[0];
      expect(eventBlock).toContain("DateTime?");
    });

    it("tiene relación con Show (no con EventBand)", () => {
      const eventBlock = schema.split("model Event")[1].split("model ")[0];
      expect(eventBlock).toContain("Show[]");
      expect(eventBlock).not.toContain("EventBand");
    });

    it("no tiene setlistFmUrl (se movió a Show)", () => {
      const eventBlock = schema.split("model Event")[1].split("model ")[0];
      expect(eventBlock).not.toContain("setlist_fm_url");
    });

    it("tiene índices para queries comunes", () => {
      expect(schema).toContain("@@index([startDate])");
      expect(schema).toContain("@@index([state, city])");
      expect(schema).toContain("@@index([status])");
    });
  });

  describe("Show", () => {
    it("tiene los campos requeridos", () => {
      expect(schema).toContain("model Show");
      expect(schema).toContain("event_id");
      expect(schema).toContain("band_id");
      expect(schema).toContain("is_headliner");
      expect(schema).toContain("sort_order");
      expect(schema).toContain('@@map("shows")');
    });

    it("tiene campos de programación (stage, horario, fecha)", () => {
      const showBlock = schema.split("model Show")[1];
      expect(showBlock).toContain("stage");
      expect(showBlock).toContain("show_date");
      expect(showBlock).toContain("start_time");
      expect(showBlock).toContain("end_time");
    });

    it("tiene setlistFmUrl por show individual", () => {
      const showBlock = schema.split("model Show")[1];
      expect(showBlock).toContain("setlist_fm_url");
    });

    it("tiene cascade delete con Event", () => {
      expect(schema).toContain("onDelete: Cascade");
    });

    it("referencia a Band como entidad", () => {
      const showBlock = schema.split("model Show")[1];
      expect(showBlock).toContain("band  Band");
      expect(showBlock).toContain("bandId");
    });

    it("tiene índices en eventId y bandId", () => {
      const showBlock = schema.split("model Show")[1];
      expect(showBlock).toContain("@@index([eventId])");
      expect(showBlock).toContain("@@index([bandId])");
    });
  });

  describe("Relaciones", () => {
    it("Event → Profile (submitter)", () => {
      expect(schema).toContain(
        "@relation(fields: [submittedBy], references: [id])"
      );
    });

    it("Show → Event (cascade delete)", () => {
      expect(schema).toContain(
        "@relation(fields: [eventId], references: [id], onDelete: Cascade)"
      );
    });

    it("Show → Band", () => {
      expect(schema).toContain(
        "@relation(fields: [bandId], references: [id])"
      );
    });
  });

  describe("Configuración", () => {
    it("datasource usa PostgreSQL", () => {
      expect(schema).toContain('provider = "postgresql"');
    });

    it("prisma.config.ts configura la URL de conexión", () => {
      const configPath = path.resolve(__dirname, "../../prisma.config.ts");
      const config = fs.readFileSync(configPath, "utf-8");
      expect(config).toContain('process.env["DATABASE_URL"]');
    });
  });
});
