"use server";

import { getApprovedEvents } from "@/lib/data/events";
import { getLatestReviews } from "@/lib/data/reviews";
import { prisma } from "@/lib/prisma";

export async function fetchApprovedEvents(filters?: {
  state?: string;
  startDate?: string;
  endDate?: string;
}) {
  return getApprovedEvents(filters);
}

export async function fetchLatestReviews(limit = 5) {
  return getLatestReviews(limit);
}

export async function fetchTicketTypes(eventId: string) {
  const ticketTypes = await prisma.ticketType.findMany({
    where: {
      eventId,
      isActive: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  return ticketTypes.map((tt) => ({
    ...tt,
    available: Math.max(0, tt.quantity - tt.sold),
  }));
}
