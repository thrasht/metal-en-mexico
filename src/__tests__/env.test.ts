import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const envPath = path.resolve(__dirname, "../../.env.local");

describe("Variables de entorno (.env.local)", () => {
  it("el archivo .env.local existe", () => {
    expect(fs.existsSync(envPath)).toBe(true);
  });

  it("contiene NEXT_PUBLIC_SUPABASE_URL", () => {
    const content = fs.readFileSync(envPath, "utf-8");
    expect(content).toContain("NEXT_PUBLIC_SUPABASE_URL=");
  });

  it("contiene NEXT_PUBLIC_SUPABASE_ANON_KEY", () => {
    const content = fs.readFileSync(envPath, "utf-8");
    expect(content).toContain("NEXT_PUBLIC_SUPABASE_ANON_KEY=");
  });

  it("contiene DATABASE_URL", () => {
    const content = fs.readFileSync(envPath, "utf-8");
    expect(content).toContain("DATABASE_URL=");
  });

  it("contiene DIRECT_URL", () => {
    const content = fs.readFileSync(envPath, "utf-8");
    expect(content).toContain("DIRECT_URL=");
  });
});
