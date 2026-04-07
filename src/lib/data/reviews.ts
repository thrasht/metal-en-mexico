import { prisma } from "@/lib/prisma";

export interface ReviewData {
  id: string;
  title: string;
  rating: number;
  content: unknown;
  status: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string | null;
  };
  photos: {
    id: string;
    url: string;
    caption: string | null;
    sortOrder: number;
  }[];
}

const REVIEW_INCLUDE = {
  author: { select: { id: true, name: true } },
  photos: { orderBy: { sortOrder: "asc" as const } },
};

function serializeReview(
  review: Awaited<ReturnType<typeof prisma.review.findFirst>> & {
    author: { id: string; name: string | null };
    photos: { id: string; url: string; caption: string | null; sortOrder: number }[];
  }
): ReviewData {
  return {
    id: review.id,
    title: review.title,
    rating: review.rating,
    content: review.content,
    status: review.status,
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
    author: review.author,
    photos: review.photos,
  };
}

export async function getReviewsByEvent(eventId: string): Promise<ReviewData[]> {
  const reviews = await prisma.review.findMany({
    where: { eventId, status: "published" },
    include: REVIEW_INCLUDE,
    orderBy: { createdAt: "desc" },
  });

  return reviews.map((r) => serializeReview(r as Parameters<typeof serializeReview>[0]));
}

export async function getReviewById(reviewId: string): Promise<ReviewData | null> {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    include: REVIEW_INCLUDE,
  });

  if (!review) return null;
  return serializeReview(review as Parameters<typeof serializeReview>[0]);
}

export async function getReviewByEventAndAuthor(
  eventId: string,
  authorId: string
): Promise<ReviewData | null> {
  const review = await prisma.review.findUnique({
    where: { eventId_authorId: { eventId, authorId } },
    include: REVIEW_INCLUDE,
  });

  if (!review) return null;
  return serializeReview(review as Parameters<typeof serializeReview>[0]);
}

export async function getAllReviews(filters?: {
  status?: string;
}): Promise<(ReviewData & { eventTitle: string; eventSlug: string })[]> {
  const where: Record<string, unknown> = {};
  if (filters?.status) {
    where.status = filters.status;
  }

  const reviews = await prisma.review.findMany({
    where,
    include: {
      ...REVIEW_INCLUDE,
      event: { select: { title: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return reviews.map((r) => ({
    ...serializeReview(r as Parameters<typeof serializeReview>[0]),
    eventTitle: r.event.title,
    eventSlug: r.event.slug,
  }));
}
