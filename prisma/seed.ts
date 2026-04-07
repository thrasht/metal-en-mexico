import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";

config({ path: ".env.local" });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const BANDS = [
  { name: "Zombiefication", slug: "zombiefication", genre: "Death Metal", origin: "CDMX, México" },
  { name: "Disorder", slug: "disorder", genre: "Thrash Metal", origin: "San Luis Potosí, México" },
  { name: "Cenotaph", slug: "cenotaph", genre: "Death Metal", origin: "CDMX, México" },
  { name: "Transmetal", slug: "transmetal", genre: "Thrash/Death Metal", origin: "CDMX, México" },
  { name: "Brujería", slug: "brujeria", genre: "Grindcore/Death Metal", origin: "Tijuana, México" },
  { name: "The Chasm", slug: "the-chasm", genre: "Death Metal", origin: "CDMX, México" },
  { name: "Shub Niggurath", slug: "shub-niggurath", genre: "Death Metal", origin: "CDMX, México" },
  { name: "Toxodeth", slug: "toxodeth", genre: "Death/Thrash Metal", origin: "CDMX, México" },
  { name: "Next", slug: "next", genre: "Thrash Metal", origin: "CDMX, México" },
  { name: "Cabgat", slug: "cabgat", genre: "Thrash Metal", origin: "San Luis Potosí, México" },
  { name: "Demonized", slug: "demonized", genre: "Black Metal", origin: "Guadalajara, México" },
  { name: "Ravager", slug: "ravager", genre: "Thrash Metal", origin: "Monterrey, México" },
  { name: "Mortuary", slug: "mortuary", genre: "Death Metal", origin: "Tijuana, México" },
  { name: "Nafak", slug: "nafak", genre: "Death Metal", origin: "Querétaro, México" },
  { name: "Decapitated Christ", slug: "decapitated-christ", genre: "Black/Death Metal", origin: "León, México" },
  { name: "Argentum", slug: "argentum", genre: "Symphonic Black Metal", origin: "CDMX, México" },
];

const VENUES_SLP = [
  { venueName: "Foro Metal SLP", venueAddress: "Av. Carranza 1250", city: "San Luis Potosí" },
  { venueName: "Bar El Sótano", venueAddress: "Calle Aldama 320", city: "San Luis Potosí" },
  { venueName: "Foro Albergue", venueAddress: "Av. Universidad 1500", city: "San Luis Potosí" },
  { venueName: "La Cueva Rock Bar", venueAddress: "Calle 5 de Mayo 180", city: "San Luis Potosí" },
];

const VENUES_OTHER = [
  { venueName: "Foro Indie Rocks!", venueAddress: "Calle Zacatecas 39, Roma Norte", city: "Ciudad de México", state: "CDMX" },
  { venueName: "Circo Volador", venueAddress: "Calz. de la Viga 146", city: "Ciudad de México", state: "CDMX" },
  { venueName: "Café Iguana", venueAddress: "Padre Mier 1102 Pte", city: "Monterrey", state: "NL" },
  { venueName: "C3 Stage", venueAddress: "Av. Faro 2519", city: "Guadalajara", state: "JAL" },
  { venueName: "Foro San Isidro", venueAddress: "Calz. San Isidro 630", city: "Ciudad de México", state: "CDMX" },
  { venueName: "Bajo Circuito", venueAddress: "Calz. de Tlalpan 1899", city: "Ciudad de México", state: "CDMX" },
];

function randomDate(monthsAhead: number): Date {
  const now = new Date();
  const future = new Date(now);
  future.setMonth(future.getMonth() + monthsAhead);
  const diff = future.getTime() - now.getTime();
  return new Date(now.getTime() + Math.random() * diff);
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

const TIPTAP_REVIEWS = [
  {
    title: "Noche brutal de death metal",
    rating: 9,
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Increíble show. El sonido estuvo perfecto desde la primera nota. Las guitarras se sentían como una pared de distorsión y la batería no paró ni un segundo." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "El setlist" }] },
        { type: "paragraph", content: [{ type: "text", text: "Tocaron todos los clásicos y un par de temas nuevos que sonaron brutales. El pit no paró en toda la noche." }] },
        { type: "blockquote", content: [{ type: "paragraph", content: [{ type: "text", text: "\"La mejor tocada que he visto en SLP en años\" — literalmente todos los que estábamos ahí" }] }] },
      ],
    },
  },
  {
    title: "Thrash hasta morir",
    rating: 8,
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Llegué esperando un buen show y me fui con la playera empapada de sudor. El thrash estuvo implacable de principio a fin." }] },
        { type: "paragraph", content: [{ type: "text", text: "El venue estaba lleno, lo cual hizo que la energía se multiplicara. Cada riff se sentía en el pecho." }] },
        { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "Lo único malo" }] },
        { type: "paragraph", content: [{ type: "text", text: "Las cervezas estaban caras, pero bueno, eso es normal. La música compensó todo." }] },
      ],
    },
  },
  {
    title: "Buena tocada pero pudo ser mejor",
    rating: 6,
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "El evento estuvo decente. Las bandas tocaron bien pero el sonido del venue dejó mucho que desear. Los bajos se perdían y la voz apenas se escuchaba." }] },
        { type: "paragraph", content: [{ type: "text", text: "La organización también pudo mejorar. Empezó como una hora tarde y no había suficiente espacio para la cantidad de gente." }] },
        { type: "paragraph", content: [{ type: "text", text: "Dicho esto, las bandas dieron todo y el público respondió. Eso siempre se agradece." }] },
      ],
    },
  },
  {
    title: "Una experiencia inolvidable",
    rating: 10,
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Sin duda el mejor concierto al que he ido en mi vida. Todo estuvo perfecto: el sonido, la iluminación, la energía del público." }] },
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Momentos épicos" }] },
        { type: "bulletList", content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "El blast beat de 3 minutos sin parar en la canción final" }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Cuando el vocalista se aventó al público" }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "El encore sorpresa con un cover de Slayer" }] }] },
        ]},
        { type: "paragraph", content: [{ type: "text", text: "Necesitamos más eventos así. ¡Larga vida al metal mexicano!" }] },
      ],
    },
  },
  {
    title: "Buen ambiente, sonido regular",
    rating: 7,
    content: {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "La comunidad metalera de la ciudad se rifó. El ambiente estuvo increíble, todos apoyando a las bandas locales." }] },
        { type: "paragraph", content: [{ type: "text", text: "El sonido podría mejorar, sobre todo en los graves. Pero las bandas lo compensaron con su energía y entrega en el escenario." }] },
        { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Recomendación:" }, { type: "text", text: " Llegar temprano porque se llena rápido y después ya no hay buen lugar." }] },
      ],
    },
  },
];

async function main() {
  console.log("Limpiando datos existentes...");
  await prisma.reviewPhoto.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.ticketType.deleteMany();
  await prisma.show.deleteMany();
  await prisma.event.deleteMany();
  await prisma.band.deleteMany();

  console.log("Creando bandas...");
  const bands = [];
  for (const b of BANDS) {
    const band = await prisma.band.create({ data: b });
    bands.push(band);
    console.log(`  ✓ ${band.name}`);
  }

  // Obtener un perfil existente para asociar como submitter y reviewer
  const profile = await prisma.profile.findFirst();
  if (!profile) {
    console.log("\n⚠ No hay perfiles en la BD. Registra un usuario primero para asociar eventos y reseñas.");
    console.log("  Las bandas se crearon correctamente.\n");
    return;
  }
  console.log(`\nUsando perfil: ${profile.name ?? profile.email} (${profile.id})`);

  console.log("\nCreando eventos en San Luis Potosí...");
  const events = [];

  // Eventos pasados en marzo (para reseñas)
  const pastEvents = [
    {
      title: "Noche de Death Metal Vol. III",
      slug: "noche-death-metal-vol-iii-2026",
      description: "La tercera edición de la noche más brutal de SLP. Tres bandas de death metal nacional en un solo escenario.",
      eventType: "concert",
      ...VENUES_SLP[0],
      state: "SLP",
      startDate: new Date("2026-03-07"),
      ticketPriceInfo: "$150 MXN",
      status: "approved",
      submittedBy: profile.id,
      bandIndices: [0, 2, 6],
    },
    {
      title: "Thrash Attack SLP",
      slug: "thrash-attack-slp-2026",
      description: "Noche de thrash sin cuartel. Tres bandas, cero descanso, puro mosh.",
      eventType: "concert",
      ...VENUES_SLP[1],
      state: "SLP",
      startDate: new Date("2026-03-14"),
      ticketPriceInfo: "$120 MXN",
      status: "approved",
      submittedBy: profile.id,
      bandIndices: [1, 9, 11],
    },
  ];

  // Eventos en abril y mayo
  const futureEvents = [
    {
      title: "Zombiefication + Disorder en SLP",
      slug: "zombiefication-disorder-slp-2026",
      description: "Zombiefication regresa a SLP junto con Disorder para una noche de death y thrash metal.",
      eventType: "concert",
      ...VENUES_SLP[0],
      state: "SLP",
      startDate: new Date("2026-04-11"),
      ticketUrl: "https://boletia.com/ejemplo",
      ticketPriceInfo: "$200 MXN",
      status: "approved",
      submittedBy: profile.id,
      bandIndices: [0, 1],
    },
    {
      title: "Metal Potosino Fest 2026",
      slug: "metal-potosino-fest-2026",
      description: "El festival de metal más grande de San Luis Potosí. Dos escenarios, ocho bandas, un día completo de metal.",
      eventType: "festival",
      ...VENUES_SLP[2],
      state: "SLP",
      startDate: new Date("2026-04-25"),
      endDate: new Date("2026-04-26"),
      ticketUrl: "https://boletia.com/metal-potosino-fest",
      ticketPriceInfo: "$350 MXN día / $500 MXN abono",
      status: "approved",
      submittedBy: profile.id,
      bandIndices: [0, 1, 2, 9, 13, 14],
    },
    {
      title: "Black Metal Underground",
      slug: "black-metal-underground-slp-2026",
      description: "Noche de black metal en el bar más oscuro de la ciudad.",
      eventType: "concert",
      ...VENUES_SLP[3],
      state: "SLP",
      startDate: new Date("2026-05-02"),
      ticketPriceInfo: "$100 MXN",
      status: "approved",
      submittedBy: profile.id,
      bandIndices: [10, 14, 15],
    },
    {
      title: "Cabgat + Nafak en La Cueva",
      slug: "cabgat-nafak-la-cueva-2026",
      description: "Dos de las bandas más pesadas de la región en un show íntimo.",
      eventType: "concert",
      ...VENUES_SLP[3],
      state: "SLP",
      startDate: new Date("2026-05-09"),
      ticketPriceInfo: "$80 MXN",
      status: "approved",
      submittedBy: profile.id,
      bandIndices: [9, 13],
    },
    {
      title: "Transmetal en Concierto — SLP",
      slug: "transmetal-slp-2026",
      description: "La leyenda del metal mexicano llega a San Luis Potosí con su gira 2026.",
      eventType: "concert",
      ...VENUES_SLP[0],
      state: "SLP",
      startDate: new Date("2026-05-23"),
      ticketUrl: "https://boletia.com/transmetal-slp",
      ticketPriceInfo: "$250 MXN",
      status: "approved",
      submittedBy: profile.id,
      bandIndices: [3, 1],
    },
  ];

  // Eventos en otras ciudades (marzo-mayo)
  const otherCityEvents = [
    {
      title: "Brujería — Gira Matando Güeros 2026",
      slug: "brujeria-cdmx-2026",
      description: "Brujería de vuelta en el Circo Volador. Grindcore extremo.",
      eventType: "concert",
      ...VENUES_OTHER[1],
      state: "CDMX",
      startDate: new Date("2026-03-21"),
      ticketUrl: "https://ticketmaster.com.mx/brujeria",
      ticketPriceInfo: "$450 MXN",
      status: "approved",
      submittedBy: profile.id,
      bandIndices: [4, 7],
    },
    {
      title: "The Chasm — Ritual Nocturno",
      slug: "the-chasm-cdmx-2026",
      description: "The Chasm presenta su nuevo material en una noche exclusiva.",
      eventType: "concert",
      ...VENUES_OTHER[0],
      state: "CDMX",
      startDate: new Date("2026-04-04"),
      ticketPriceInfo: "$300 MXN",
      status: "approved",
      submittedBy: profile.id,
      bandIndices: [5, 6],
    },
    {
      title: "Ravager + Next en Monterrey",
      slug: "ravager-next-monterrey-2026",
      description: "Doble dosis de thrash metal en Café Iguana.",
      eventType: "concert",
      ...VENUES_OTHER[2],
      state: "NL",
      startDate: new Date("2026-04-18"),
      ticketPriceInfo: "$180 MXN",
      status: "approved",
      submittedBy: profile.id,
      bandIndices: [11, 8],
    },
    {
      title: "Metal Méxicano Fest GDL",
      slug: "metal-mexicano-fest-gdl-2026",
      description: "Festival celebrando lo mejor del metal hecho en México. Cuatro bandas en el C3 Stage.",
      eventType: "festival",
      ...VENUES_OTHER[3],
      state: "JAL",
      startDate: new Date("2026-05-16"),
      ticketUrl: "https://boletia.com/metal-mex-gdl",
      ticketPriceInfo: "$400 MXN",
      status: "approved",
      submittedBy: profile.id,
      bandIndices: [3, 12, 8, 10],
    },
  ];

  // Eventos pendientes (para probar admin)
  const pendingEvents = [
    {
      title: "Tocada Underground en Soledad",
      slug: "tocada-underground-soledad-2026",
      description: "Evento pendiente de aprobación.",
      eventType: "concert",
      venueName: "Salón Ejidal",
      venueAddress: "Col. Centro",
      city: "Soledad de Graciano Sánchez",
      state: "SLP",
      startDate: new Date("2026-05-30"),
      ticketPriceInfo: "$50 MXN",
      status: "pending",
      submittedBy: profile.id,
      bandIndices: [9],
    },
    {
      title: "Metal en el Desierto",
      slug: "metal-desierto-2026",
      description: "Evento rechazado de ejemplo.",
      eventType: "concert",
      venueName: "Plaza Abierta",
      city: "Matehuala",
      state: "SLP",
      startDate: new Date("2026-04-15"),
      ticketPriceInfo: "Gratis",
      status: "rejected",
      submittedBy: profile.id,
      bandIndices: [14],
    },
  ];

  const allEventData = [...pastEvents, ...futureEvents, ...otherCityEvents, ...pendingEvents];

  for (const e of allEventData) {
    const { bandIndices, ...eventData } = e as typeof e & {
      ticketUrl?: string;
      endDate?: Date;
      venueAddress?: string;
    };
    const event = await prisma.event.create({
      data: {
        title: eventData.title,
        slug: eventData.slug,
        description: eventData.description,
        eventType: eventData.eventType,
        venueName: eventData.venueName,
        venueAddress: eventData.venueAddress ?? null,
        city: eventData.city,
        state: eventData.state,
        startDate: eventData.startDate,
        endDate: eventData.endDate ?? null,
        ticketUrl: eventData.ticketUrl ?? null,
        ticketPriceInfo: eventData.ticketPriceInfo ?? null,
        status: eventData.status,
        submittedBy: eventData.submittedBy,
      },
    });
    events.push({ ...event, bandIndices });

    for (let idx = 0; idx < bandIndices.length; idx++) {
      await prisma.show.create({
        data: {
          eventId: event.id,
          bandId: bands[bandIndices[idx]].id,
          isHeadliner: idx === 0,
          sortOrder: idx,
          showDate: event.startDate,
          startTime: `${20 + idx}:00`,
        },
      });
    }

    console.log(`  ✓ ${event.title} [${event.status}] — ${bandIndices.length} bandas`);
  }

  // Crear reseñas para los eventos pasados
  console.log("\nCreando reseñas para eventos pasados...");
  const pastEventRecords = events.filter(e => e.status === "approved" && e.startDate < new Date());

  for (const event of pastEventRecords) {
    const numReviews = Math.min(2, TIPTAP_REVIEWS.length);
    const reviewsToUse = pickN(TIPTAP_REVIEWS, numReviews);

    for (const reviewData of reviewsToUse) {
      // Solo podemos crear una reseña por perfil por evento
      const existing = await prisma.review.findUnique({
        where: { eventId_authorId: { eventId: event.id, authorId: profile.id } },
      });
      if (existing) continue;

      await prisma.review.create({
        data: {
          eventId: event.id,
          authorId: profile.id,
          title: reviewData.title,
          rating: reviewData.rating,
          content: reviewData.content,
          status: "published",
        },
      });
      console.log(`  ✓ Reseña "${reviewData.title}" → ${event.title}`);
      break; // Una reseña por evento (constraint unique)
    }
  }

  // Crear ticket types para algunos eventos futuros
  console.log("\nCreando tipos de boletos...");
  const approvedFuture = events.filter(e => e.status === "approved" && e.startDate > new Date());

  for (const event of approvedFuture.slice(0, 4)) {
    const isFestival = event.eventType === "festival";

    await prisma.ticketType.create({
      data: {
        eventId: event.id,
        name: isFestival ? "Abono General" : "General",
        description: isFestival ? "Acceso a todos los días del festival" : "Acceso al evento",
        price: isFestival ? 50000 : 20000,
        quantity: isFestival ? 500 : 200,
        sold: Math.floor(Math.random() * 50),
        sortOrder: 0,
      },
    });

    if (isFestival) {
      await prisma.ticketType.create({
        data: {
          eventId: event.id,
          name: "Día suelto",
          description: "Acceso a un solo día",
          price: 35000,
          quantity: 300,
          sold: Math.floor(Math.random() * 30),
          sortOrder: 1,
        },
      });
    }

    console.log(`  ✓ Boletos para ${event.title}`);
  }

  console.log("\n✅ Seed completado exitosamente");
  console.log(`   ${bands.length} bandas`);
  console.log(`   ${events.length} eventos`);
  console.log(`   Reseñas y boletos creados\n`);
}

main()
  .catch((e) => {
    console.error("Error en seed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
