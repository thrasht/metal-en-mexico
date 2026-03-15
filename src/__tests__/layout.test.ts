import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const src = path.resolve(__dirname, "..");

function readFile(relativePath: string): string {
  return fs.readFileSync(path.resolve(src, relativePath), "utf-8");
}

describe("Root Layout", () => {
  const layout = readFile("app/layout.tsx");

  it("usa idioma español", () => {
    expect(layout).toContain('lang="es"');
  });

  it("aplica clase dark para tema oscuro por defecto", () => {
    expect(layout).toContain('className="dark"');
  });

  it("importa las fuentes Inter y Oswald", () => {
    expect(layout).toContain("Inter");
    expect(layout).toContain("Oswald");
  });

  it("incluye Navbar y Footer", () => {
    expect(layout).toContain("<Navbar");
    expect(layout).toContain("<Footer");
  });

  it("tiene metadata con título y descripción en español", () => {
    expect(layout).toContain("Metal MX");
    expect(layout).toContain("Conciertos");
    expect(layout).toContain("México");
  });

  it("tiene keywords de SEO relevantes", () => {
    expect(layout).toContain("metal");
    expect(layout).toContain("San Luis Potosí");
  });

  it("tiene configuración OpenGraph", () => {
    expect(layout).toContain("openGraph");
    expect(layout).toContain("es_MX");
  });
});

describe("Navbar", () => {
  const navbar = readFile("components/shared/Navbar/Navbar.tsx");
  const styles = readFile("components/shared/Navbar/Navbar.module.css");

  it("tiene enlace al calendario (home)", () => {
    expect(navbar).toContain('href: "/"');
    expect(navbar).toContain("Calendario");
  });

  it("tiene enlace para enviar evento", () => {
    expect(navbar).toContain("Enviar Evento");
    expect(navbar).toContain("/enviar-evento");
  });

  it("tiene enlaces de autenticación", () => {
    expect(navbar).toContain("/auth/login");
    expect(navbar).toContain("/auth/registro");
  });

  it("tiene logo Metal MX", () => {
    expect(navbar).toContain("Metal MX");
  });

  it("usa CSS Module", () => {
    expect(navbar).toContain("styles.");
    expect(navbar).toContain("Navbar.module.css");
  });

  it("es responsive con menú móvil", () => {
    expect(navbar).toContain("mobileOpen");
    expect(styles).toContain("@media (max-width: 768px)");
    expect(styles).toContain(".mobileMenu");
  });

  it("tiene backdrop-filter para efecto glass", () => {
    expect(styles).toContain("backdrop-filter");
  });
});

describe("Footer", () => {
  const footer = readFile("components/shared/Footer/Footer.tsx");
  const styles = readFile("components/shared/Footer/Footer.module.css");

  it("muestra la marca Metal MX", () => {
    expect(footer).toContain("Metal MX");
  });

  it("tiene enlaces de navegación", () => {
    expect(footer).toContain("Calendario");
    expect(footer).toContain("Enviar Evento");
  });

  it("muestra copyright con año dinámico", () => {
    expect(footer).toContain("currentYear");
    expect(footer).toContain("new Date().getFullYear()");
  });

  it("usa CSS Module", () => {
    expect(footer).toContain("styles.");
    expect(footer).toContain("Footer.module.css");
  });

  it("es responsive", () => {
    expect(styles).toContain("@media (max-width: 768px)");
  });
});

describe("Tema oscuro/metal (globals.css)", () => {
  const css = readFile("app/globals.css");

  it("tiene colores metal personalizados", () => {
    expect(css).toContain("--metal-red");
    expect(css).toContain("--metal-orange");
    expect(css).toContain("--metal-dark");
    expect(css).toContain("--metal-darker");
  });

  it("tiene variable de fuente para headings", () => {
    expect(css).toContain("--font-heading");
  });

  it("fondo oscuro por defecto (no claro)", () => {
    expect(css).toContain("--background: oklch(0.12");
  });
});
