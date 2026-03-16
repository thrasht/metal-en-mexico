"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { EventSchema } from "@/lib/validations/event";
import slugify from "slugify";

export interface SubmitEventState {
  error?: string;
  success?: boolean;
  fieldErrors?: Record<string, string[]>;
  eventSlug?: string;
}

function generateSlug(title: string, date: string): string {
  const base = slugify(title, { lower: true, strict: true });
  const year = new Date(date).getFullYear();
  return `${base}-${year}`;
}

async function ensureUniqueSlug(base: string): Promise<string> {
  let slug = base;
  let counter = 1;
  while (await prisma.event.findUnique({ where: { slug } })) {
    slug = `${base}-${counter}`;
    counter++;
  }
  return slug;
}

export async function submitEvent(
  _prevState: SubmitEventState,
  formData: FormData
): Promise<SubmitEventState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Debes iniciar sesión para enviar un evento" };
  }

  const showsRaw: Array<Record<string, unknown>> = [];
  let i = 0;
  while (formData.get(`shows.${i}.bandName`) !== null) {
    showsRaw.push({
      bandName: formData.get(`shows.${i}.bandName`) as string,
      isHeadliner: formData.get(`shows.${i}.isHeadliner`) === "true",
      stage: (formData.get(`shows.${i}.stage`) as string) || undefined,
      showDate: (formData.get(`shows.${i}.showDate`) as string) || undefined,
      startTime: (formData.get(`shows.${i}.startTime`) as string) || undefined,
      endTime: (formData.get(`shows.${i}.endTime`) as string) || undefined,
      setlistFmUrl: (formData.get(`shows.${i}.setlistFmUrl`) as string) || undefined,
    });
    i++;
  }

  const raw = {
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || undefined,
    eventType: formData.get("eventType") as string,
    venueName: formData.get("venueName") as string,
    venueAddress: (formData.get("venueAddress") as string) || undefined,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    startDate: formData.get("startDate") as string,
    endDate: (formData.get("endDate") as string) || undefined,
    ticketUrl: (formData.get("ticketUrl") as string) || undefined,
    ticketPriceInfo: (formData.get("ticketPriceInfo") as string) || undefined,
    shows: showsRaw,
  };

  const result = EventSchema.safeParse(raw);
  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors };
  }

  const data = result.data;

  try {
    const slug = await ensureUniqueSlug(
      generateSlug(data.title, data.startDate)
    );

    const flyerFile = formData.get("flyer") as File | null;
    let flyerUrl: string | null = null;

    if (flyerFile && flyerFile.size > 0) {
      const ext = flyerFile.name.split(".").pop();
      const path = `flyers/${slug}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("event-flyers")
        .upload(path, flyerFile, { upsert: true });

      if (!uploadError) {
        const { data: publicUrl } = supabase.storage
          .from("event-flyers")
          .getPublicUrl(path);
        flyerUrl = publicUrl.publicUrl;
      }
    }

    await prisma.$transaction(async (tx) => {
      const event = await tx.event.create({
        data: {
          title: data.title,
          slug,
          description: data.description || null,
          eventType: data.eventType,
          venueName: data.venueName,
          venueAddress: data.venueAddress || null,
          city: data.city,
          state: data.state,
          startDate: new Date(data.startDate),
          endDate: data.endDate ? new Date(data.endDate) : null,
          flyerUrl,
          ticketUrl: data.ticketUrl || null,
          ticketPriceInfo: data.ticketPriceInfo || null,
          status: "pending",
          submittedBy: user.id,
        },
      });

      for (let idx = 0; idx < data.shows.length; idx++) {
        const show = data.shows[idx];
        const bandSlug = slugify(show.bandName, { lower: true, strict: true });

        const band = await tx.band.upsert({
          where: { slug: bandSlug },
          update: {},
          create: {
            name: show.bandName,
            slug: bandSlug,
          },
        });

        await tx.show.create({
          data: {
            eventId: event.id,
            bandId: band.id,
            isHeadliner: show.isHeadliner,
            stage: show.stage || null,
            showDate: show.showDate ? new Date(show.showDate) : null,
            startTime: show.startTime || null,
            endTime: show.endTime || null,
            setlistFmUrl: show.setlistFmUrl || null,
            sortOrder: idx,
          },
        });
      }

      return event;
    });

    return { success: true, eventSlug: slug };
  } catch (err) {
    console.error("Error al crear evento:", err);
    return { error: "Error al guardar el evento. Intenta de nuevo." };
  }
}
