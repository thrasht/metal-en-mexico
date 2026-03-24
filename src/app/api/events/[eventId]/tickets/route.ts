import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;

    const ticketTypes = await prisma.ticketType.findMany({
      where: {
        eventId,
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    return NextResponse.json(
      ticketTypes.map((tt) => ({
        ...tt,
        available: Math.max(0, tt.quantity - tt.sold),
      }))
    );
  } catch (error) {
    console.error("[TICKETS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
