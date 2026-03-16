import { NextResponse, type NextRequest } from "next/server";
import { getApprovedEvents } from "@/lib/data/events";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const state = searchParams.get("state") ?? undefined;
  const startDate = searchParams.get("start") ?? undefined;
  const endDate = searchParams.get("end") ?? undefined;

  try {
    const events = await getApprovedEvents({ state, startDate, endDate });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Error al obtener eventos" },
      { status: 500 }
    );
  }
}
