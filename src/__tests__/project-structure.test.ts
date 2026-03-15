import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const root = path.resolve(__dirname, "../..");
const src = path.resolve(root, "src");

function exists(relativePath: string): boolean {
  return fs.existsSync(path.resolve(root, relativePath));
}

describe("Estructura del proyecto", () => {
  describe("Archivos raíz", () => {
    it("tiene package.json", () => {
      expect(exists("package.json")).toBe(true);
    });

    it("tiene tsconfig.json", () => {
      expect(exists("tsconfig.json")).toBe(true);
    });

    it("tiene prisma/schema.prisma", () => {
      expect(exists("prisma/schema.prisma")).toBe(true);
    });

    it("tiene vitest.config.ts", () => {
      expect(exists("vitest.config.ts")).toBe(true);
    });
  });

  describe("Clientes de Supabase", () => {
    it("tiene cliente de servidor (src/lib/supabase/server.ts)", () => {
      expect(exists("src/lib/supabase/server.ts")).toBe(true);
    });

    it("tiene cliente de navegador (src/lib/supabase/client.ts)", () => {
      expect(exists("src/lib/supabase/client.ts")).toBe(true);
    });

    it("tiene middleware de Supabase (src/lib/supabase/middleware.ts)", () => {
      expect(exists("src/lib/supabase/middleware.ts")).toBe(true);
    });

    it("cliente servidor exporta createClient como async function", () => {
      const content = fs.readFileSync(
        path.resolve(src, "lib/supabase/server.ts"),
        "utf-8"
      );
      expect(content).toContain("export async function createClient()");
      expect(content).toContain("createServerClient");
      expect(content).toContain("cookies");
    });

    it("cliente navegador exporta createClient", () => {
      const content = fs.readFileSync(
        path.resolve(src, "lib/supabase/client.ts"),
        "utf-8"
      );
      expect(content).toContain("export function createClient()");
      expect(content).toContain("createBrowserClient");
    });
  });

  describe("Prisma client", () => {
    it("tiene src/lib/prisma.ts", () => {
      expect(exists("src/lib/prisma.ts")).toBe(true);
    });

    it("prisma.ts usa singleton pattern y adapter PG", () => {
      const content = fs.readFileSync(
        path.resolve(src, "lib/prisma.ts"),
        "utf-8"
      );
      expect(content).toContain("globalForPrisma");
      expect(content).toContain('process.env.NODE_ENV !== "production"');
      expect(content).toContain("PrismaPg");
    });
  });

  describe("Middleware de Next.js", () => {
    it("tiene src/middleware.ts", () => {
      expect(exists("src/middleware.ts")).toBe(true);
    });

    it("middleware usa updateSession de Supabase", () => {
      const content = fs.readFileSync(
        path.resolve(src, "middleware.ts"),
        "utf-8"
      );
      expect(content).toContain("updateSession");
      expect(content).toContain("matcher");
    });
  });

  describe("App Router", () => {
    it("tiene src/app/layout.tsx (root layout)", () => {
      expect(exists("src/app/layout.tsx")).toBe(true);
    });

    it("tiene src/app/page.tsx", () => {
      expect(exists("src/app/page.tsx")).toBe(true);
    });

    it("tiene src/app/globals.css", () => {
      expect(exists("src/app/globals.css")).toBe(true);
    });
  });

  describe("shadcn/ui", () => {
    it("tiene componentes UI base (src/components/ui/)", () => {
      expect(exists("src/components/ui")).toBe(true);
    });

    it("tiene la función utilitaria cn (src/lib/utils.ts)", () => {
      expect(exists("src/lib/utils.ts")).toBe(true);
      const content = fs.readFileSync(
        path.resolve(src, "lib/utils.ts"),
        "utf-8"
      );
      expect(content).toContain("export function cn");
      expect(content).toContain("twMerge");
    });
  });
});

describe("Dependencias en package.json", () => {
  const pkg = JSON.parse(
    fs.readFileSync(path.resolve(root, "package.json"), "utf-8")
  );
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

  const requiredDeps = [
    "next",
    "react",
    "react-dom",
    "@supabase/supabase-js",
    "@supabase/ssr",
    "@prisma/client",
    "@prisma/adapter-pg",
    "prisma",
    "@fullcalendar/react",
    "@fullcalendar/daygrid",
    "@fullcalendar/interaction",
    "zod",
    "tailwindcss",
    "vitest",
  ];

  for (const dep of requiredDeps) {
    it(`tiene ${dep} instalado`, () => {
      expect(allDeps).toHaveProperty(dep);
    });
  }
});
