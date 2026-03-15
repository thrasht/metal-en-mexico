import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Navbar } from "@/components/shared/Navbar/Navbar";
import { Footer } from "@/components/shared/Footer/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Metal MX — Conciertos y Eventos de Metal en México",
    template: "%s | Metal MX",
  },
  description:
    "Encuentra conciertos y eventos de metal en México. Calendario actualizado con los mejores shows de metal en San Luis Potosí y todo el país.",
  keywords: [
    "metal",
    "conciertos",
    "México",
    "San Luis Potosí",
    "eventos",
    "heavy metal",
    "thrash",
    "death metal",
    "black metal",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Metal MX",
    title: "Metal MX — Conciertos y Eventos de Metal en México",
    description:
      "Encuentra conciertos y eventos de metal en México. Calendario actualizado con los mejores shows.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${inter.variable} ${oswald.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
