import { prisma } from "@/lib/prisma";
import type { EventWithShows } from "@/lib/types/event";

const EVENT_INCLUDE = {
  shows: {
    include: { band: true },
    orderBy: { sortOrder: "asc" as const },
  },
};

function serializeEvent(event: Awaited<ReturnType<typeof prisma.event.findFirst>> & {
  shows: Array<{
    band: { name: string; slug: string; genre: string | null; origin: string | null };
    isHeadliner: boolean;
    stage: string | null;
    showDate: Date | null;
    startTime: string | null;
    endTime: string | null;
    setlistFmUrl: string | null;
    sortOrder: number;
  }>;
}): EventWithShows {
  return {
    id: event.id,
    title: event.title,
    slug: event.slug,
    description: event.description,
    eventType: event.eventType,
    venueName: event.venueName,
    venueAddress: event.venueAddress,
    city: event.city,
    state: event.state,
    startDate: event.startDate.toISOString().split("T")[0],
    endDate: event.endDate ? event.endDate.toISOString().split("T")[0] : null,
    flyerUrl: event.flyerUrl,
    ticketUrl: event.ticketUrl,
    ticketPriceInfo: event.ticketPriceInfo,
    status: event.status,
    shows: event.shows.map((s) => ({
      band: {
        name: s.band.name,
        slug: s.band.slug,
        genre: s.band.genre,
        origin: s.band.origin,
      },
      isHeadliner: s.isHeadliner,
      stage: s.stage,
      showDate: s.showDate ? s.showDate.toISOString().split("T")[0] : null,
      startTime: s.startTime,
      endTime: s.endTime,
      setlistFmUrl: s.setlistFmUrl,
      sortOrder: s.sortOrder,
    })),
  };
}

export async function getApprovedEvents(filters?: {
  state?: string;
  startDate?: string;
  endDate?: string;
}): Promise<EventWithShows[]> {
  const where: Record<string, unknown> = { status: "approved" };

  if (filters?.state && filters.state !== "ALL") {
    where.state = filters.state;
  }

  if (filters?.startDate || filters?.endDate) {
    where.startDate = {};
    if (filters.startDate) {
      (where.startDate as Record<string, unknown>).gte = new Date(filters.startDate);
    }
    if (filters.endDate) {
      (where.startDate as Record<string, unknown>).lte = new Date(filters.endDate);
    }
  }

  const events = await prisma.event.findMany({
    where,
    include: EVENT_INCLUDE,
    orderBy: { startDate: "asc" },
  });

  return events.map((e) => serializeEvent(e as Parameters<typeof serializeEvent>[0]));
}

export async function getEventBySlug(slug: string): Promise<EventWithShows | null> {
  const event = await prisma.event.findUnique({
    where: { slug },
    include: EVENT_INCLUDE,
  });

  if (!event) return null;
  return serializeEvent(event as Parameters<typeof serializeEvent>[0]);
}

export async function getAllEvents(filters?: {
  status?: string;
}): Promise<EventWithShows[]> {
  const where: Record<string, unknown> = {};
  if (filters?.status) {
    where.status = filters.status;
  }

  const events = await prisma.event.findMany({
    where,
    include: EVENT_INCLUDE,
    orderBy: { createdAt: "desc" },
  });

  return events.map((e) => serializeEvent(e as Parameters<typeof serializeEvent>[0]));
}

export async function updateEventStatus(
  eventId: string,
  status: "approved" | "rejected"
): Promise<void> {
  await prisma.event.update({
    where: { id: eventId },
    data: { status },
  });
}
