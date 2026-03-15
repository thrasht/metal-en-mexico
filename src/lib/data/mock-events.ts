export interface MockBand {
  name: string;
  genre?: string;
  origin?: string;
}

export interface MockShow {
  band: MockBand;
  isHeadliner: boolean;
  stage?: string;
  showDate?: string;
  startTime?: string;
  endTime?: string;
}

export interface MockEvent {
  id: string;
  title: string;
  slug: string;
  description?: string;
  eventType: "concert" | "festival" | "expo" | "screening" | "meetup";
  venueName: string;
  venueAddress?: string;
  city: string;
  state: string;
  startDate: string;
  endDate?: string;
  flyerUrl?: string;
  ticketUrl?: string;
  ticketPriceInfo?: string;
  shows: MockShow[];
}

function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export const MOCK_EVENTS: MockEvent[] = [
  {
    id: "1",
    title: "Kreator + Nervosa en SLP",
    slug: "kreator-nervosa-slp-2026",
    description:
      "La leyenda del thrash alemán llega a San Luis Potosí con Nervosa como banda soporte. Una noche de thrash metal sin piedad.",
    eventType: "concert",
    venueName: "Calle 2",
    venueAddress: "Av. Venustiano Carranza 2000, Centro",
    city: "San Luis Potosí",
    state: "SLP",
    startDate: daysFromNow(3),
    ticketUrl: "https://boletia.com/kreator-slp",
    ticketPriceInfo: "General $800 / VIP $1,500",
    shows: [
      {
        band: { name: "Kreator", genre: "Thrash Metal", origin: "Alemania" },
        isHeadliner: true,
        startTime: "21:00",
        endTime: "23:00",
      },
      {
        band: { name: "Nervosa", genre: "Thrash Metal", origin: "Brasil" },
        isHeadliner: false,
        startTime: "19:30",
        endTime: "20:30",
      },
    ],
  },
  {
    id: "2",
    title: "Noche de Metal Potosino",
    slug: "noche-metal-potosino-2026",
    description:
      "Las mejores bandas locales de la escena metalera potosina en una sola noche.",
    eventType: "concert",
    venueName: "Foro Indie Rocks SLP",
    city: "San Luis Potosí",
    state: "SLP",
    startDate: daysFromNow(7),
    ticketPriceInfo: "Cover $150",
    shows: [
      {
        band: { name: "Cerberus SLP", genre: "Death Metal", origin: "México" },
        isHeadliner: true,
        startTime: "22:00",
      },
      {
        band: {
          name: "Abismo Negro",
          genre: "Black Metal",
          origin: "México",
        },
        isHeadliner: false,
        startTime: "20:30",
      },
      {
        band: {
          name: "Sacrificio Ritual",
          genre: "Thrash Metal",
          origin: "México",
        },
        isHeadliner: false,
        startTime: "19:00",
      },
    ],
  },
  {
    id: "3",
    title: "Brujería - Gira Matando Güeros 2026",
    slug: "brujeria-slp-2026",
    description:
      "Brujería regresa a San Luis Potosí con su brutal show en vivo. Grindcore/death metal desde Los Ángeles.",
    eventType: "concert",
    venueName: "Calle 2",
    venueAddress: "Av. Venustiano Carranza 2000, Centro",
    city: "San Luis Potosí",
    state: "SLP",
    startDate: daysFromNow(14),
    ticketUrl: "https://boletia.com/brujeria-slp",
    ticketPriceInfo: "General $600",
    shows: [
      {
        band: {
          name: "Brujería",
          genre: "Death Metal/Grindcore",
          origin: "EUA/México",
        },
        isHeadliner: true,
        startTime: "21:30",
      },
    ],
  },
  {
    id: "4",
    title: "Hell and Heaven Metal Fest 2026",
    slug: "hell-and-heaven-2026",
    description:
      "El festival de metal más grande de Latinoamérica regresa con un lineup de ensueño. 3 días, 4 escenarios, más de 50 bandas.",
    eventType: "festival",
    venueName: "Foro Pegaso",
    venueAddress: "Autopista México-Toluca Km 20.5",
    city: "Toluca",
    state: "MEX",
    startDate: daysFromNow(30),
    endDate: daysFromNow(32),
    ticketUrl: "https://hellandheavenfest.com",
    ticketPriceInfo: "Abono 3 días $3,500 / Día $1,800",
    shows: [
      {
        band: { name: "Slayer", genre: "Thrash Metal", origin: "EUA" },
        isHeadliner: true,
        stage: "Escenario Infierno",
        showDate: daysFromNow(30),
        startTime: "22:30",
      },
      {
        band: { name: "Megadeth", genre: "Thrash Metal", origin: "EUA" },
        isHeadliner: true,
        stage: "Escenario Infierno",
        showDate: daysFromNow(31),
        startTime: "22:30",
      },
      {
        band: { name: "Behemoth", genre: "Black/Death Metal", origin: "Polonia" },
        isHeadliner: false,
        stage: "Escenario Infierno",
        showDate: daysFromNow(30),
        startTime: "20:00",
      },
      {
        band: { name: "Cannibal Corpse", genre: "Death Metal", origin: "EUA" },
        isHeadliner: false,
        stage: "Escenario Cielo",
        showDate: daysFromNow(31),
        startTime: "20:00",
      },
      {
        band: { name: "Sepultura", genre: "Thrash/Groove Metal", origin: "Brasil" },
        isHeadliner: true,
        stage: "Escenario Infierno",
        showDate: daysFromNow(32),
        startTime: "22:30",
      },
      {
        band: { name: "Testament", genre: "Thrash Metal", origin: "EUA" },
        isHeadliner: false,
        stage: "Escenario Cielo",
        showDate: daysFromNow(32),
        startTime: "19:00",
      },
    ],
  },
  {
    id: "5",
    title: "Knotfest México 2026",
    slug: "knotfest-mexico-2026",
    description:
      "Slipknot trae su festival insignia a la Ciudad de México. Metal, mosh y caos controlado.",
    eventType: "festival",
    venueName: "Parque Bicentenario",
    city: "Ciudad de México",
    state: "CDMX",
    startDate: daysFromNow(45),
    endDate: daysFromNow(46),
    ticketUrl: "https://kfrmexico.com",
    ticketPriceInfo: "General $2,200 / VIP $4,500",
    shows: [
      {
        band: { name: "Slipknot", genre: "Nu Metal", origin: "EUA" },
        isHeadliner: true,
        stage: "Main Stage",
        showDate: daysFromNow(46),
        startTime: "22:00",
      },
      {
        band: { name: "Gojira", genre: "Progressive Death Metal", origin: "Francia" },
        isHeadliner: false,
        stage: "Main Stage",
        showDate: daysFromNow(45),
        startTime: "21:00",
      },
      {
        band: { name: "Jinjer", genre: "Progressive Metalcore", origin: "Ucrania" },
        isHeadliner: false,
        stage: "Second Stage",
        showDate: daysFromNow(45),
        startTime: "18:00",
      },
    ],
  },
  {
    id: "6",
    title: "Tianguis del Metal SLP",
    slug: "tianguis-metal-slp-2026",
    description:
      "Venta de discos, parches, playeras, y merch de metal. Apoya la escena local comprando directo a los distribuidores.",
    eventType: "expo",
    venueName: "Plaza de los Fundadores",
    city: "San Luis Potosí",
    state: "SLP",
    startDate: daysFromNow(10),
    ticketPriceInfo: "Entrada libre",
    shows: [],
  },
  {
    id: "7",
    title: "Lamb of God en Monterrey",
    slug: "lamb-of-god-mty-2026",
    description:
      "Lamb of God llega al norte de México con su poderoso groove metal.",
    eventType: "concert",
    venueName: "Café Iguana",
    city: "Monterrey",
    state: "NL",
    startDate: daysFromNow(20),
    ticketUrl: "https://boletia.com/log-mty",
    ticketPriceInfo: "General $900",
    shows: [
      {
        band: { name: "Lamb of God", genre: "Groove Metal", origin: "EUA" },
        isHeadliner: true,
        startTime: "21:00",
      },
    ],
  },
  {
    id: "8",
    title: "At the Gates + Dark Funeral",
    slug: "at-the-gates-dark-funeral-gdl-2026",
    description:
      "Melodic death y black metal sueco invaden Guadalajara. Doble headliner imperdible.",
    eventType: "concert",
    venueName: "C3 Stage",
    city: "Guadalajara",
    state: "JAL",
    startDate: daysFromNow(5),
    ticketUrl: "https://boletia.com/atg-df-gdl",
    ticketPriceInfo: "Preventa $700 / Día del evento $900",
    shows: [
      {
        band: {
          name: "At the Gates",
          genre: "Melodic Death Metal",
          origin: "Suecia",
        },
        isHeadliner: true,
        startTime: "22:00",
      },
      {
        band: {
          name: "Dark Funeral",
          genre: "Black Metal",
          origin: "Suecia",
        },
        isHeadliner: true,
        startTime: "20:30",
      },
    ],
  },
  {
    id: "9",
    title: "Rotting Christ en SLP",
    slug: "rotting-christ-slp-2026",
    description:
      "Los griegos del black metal atmosférico por primera vez en San Luis Potosí.",
    eventType: "concert",
    venueName: "Calle 2",
    venueAddress: "Av. Venustiano Carranza 2000, Centro",
    city: "San Luis Potosí",
    state: "SLP",
    startDate: daysFromNow(21),
    ticketPriceInfo: "General $650",
    shows: [
      {
        band: {
          name: "Rotting Christ",
          genre: "Black Metal",
          origin: "Grecia",
        },
        isHeadliner: true,
        startTime: "21:00",
      },
    ],
  },
  {
    id: "10",
    title: "Screening: Murder in the Front Row",
    slug: "screening-murder-front-row-slp-2026",
    description:
      "Proyección del documental sobre la escena thrash de la Bay Area. Discusión después de la proyección.",
    eventType: "screening",
    venueName: "Cineteca Alameda",
    city: "San Luis Potosí",
    state: "SLP",
    startDate: daysFromNow(12),
    ticketPriceInfo: "Entrada $80",
    shows: [],
  },
];

export function getEventsByState(state: string): MockEvent[] {
  if (state === "ALL") return MOCK_EVENTS;
  return MOCK_EVENTS.filter((e) => e.state === state);
}

export function getEventsByDateRange(
  events: MockEvent[],
  start: string,
  end: string
): MockEvent[] {
  return events.filter((e) => {
    const eventStart = e.startDate;
    const eventEnd = e.endDate ?? e.startDate;
    return eventStart <= end && eventEnd >= start;
  });
}

export function getEventBySlug(slug: string): MockEvent | undefined {
  return MOCK_EVENTS.find((e) => e.slug === slug);
}
