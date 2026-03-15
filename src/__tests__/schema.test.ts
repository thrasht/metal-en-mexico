import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const schemaPath = path.resolve(__dirname, "../../prisma/schema.prisma");
const schema = fs.readFileSync(schemaPath, "utf-8");

describe("Prisma Schema", () => {
  it("tiene el modelo Profile con los campos requeridos", () => {
    expect(schema).toContain("model Profile");
    expect(schema).toContain("email");
    expect(schema).toContain("role");
    expect(schema).toContain('@@map("profiles")');
  });

  it("tiene el modelo Event con los campos requeridos", () => {
    expect(schema).toContain("model Event");
    expect(schema).toContain("title");
    expect(schema).toContain("slug");
    expect(schema).toContain("venue_name");
    expect(schema).toContain("city");
    expect(schema).toContain("state");
    expect(schema).toContain("event_date");
    expect(schema).toContain("status");
    expect(schema).toContain("submitted_by");
    expect(schema).toContain("ticket_url");
    expect(schema).toContain("setlist_fm_url");
    expect(schema).toContain('@@map("events")');
  });

  it("tiene el modelo EventBand con los campos requeridos", () => {
    expect(schema).toContain("model EventBand");
    expect(schema).toContain("band_name");
    expect(schema).toContain("is_headliner");
    expect(schema).toContain("event_id");
    expect(schema).toContain('@@map("event_bands")');
  });

  it("tiene índices para optimizar queries comunes", () => {
    expect(schema).toContain("@@index([eventDate])");
    expect(schema).toContain("@@index([state, city])");
    expect(schema).toContain("@@index([status])");
  });

  it("Event tiene relación con Profile (submitter)", () => {
    expect(schema).toContain(
      "@relation(fields: [submittedBy], references: [id])"
    );
  });

  it("EventBand tiene cascade delete con Event", () => {
    expect(schema).toContain("onDelete: Cascade");
  });

  it("datasource usa PostgreSQL", () => {
    expect(schema).toContain('provider = "postgresql"');
  });

  it("prisma.config.ts configura la URL de conexión", () => {
    const configPath = path.resolve(__dirname, "../../prisma.config.ts");
    const config = fs.readFileSync(configPath, "utf-8");
    expect(config).toContain('process.env["DATABASE_URL"]');
  });
});
