import { z } from "zod";
import { MEXICO_STATES } from "@/lib/data/mexico-states";

const stateCodes = MEXICO_STATES.map((s) => s.code) as [string, ...string[]];

const EVENT_TYPES = ["concert", "festival", "expo", "screening", "meetup"] as const;

const ShowSchema = z.object({
  bandName: z.string().min(1, "Nombre de banda requerido"),
  isHeadliner: z.boolean().default(false),
  stage: z.string().optional(),
  showDate: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  setlistFmUrl: z.string().url("URL inválida").optional().or(z.literal("")),
});

export const EventSchema = z
  .object({
    title: z.string().min(3, "Mínimo 3 caracteres").max(200, "Máximo 200 caracteres"),
    description: z.string().max(2000, "Máximo 2000 caracteres").optional().or(z.literal("")),
    eventType: z.enum(EVENT_TYPES, { message: "Tipo de evento inválido" }),
    venueName: z.string().min(2, "Nombre del venue requerido"),
    venueAddress: z.string().optional().or(z.literal("")),
    city: z.string().min(2, "Ciudad requerida"),
    state: z.enum(stateCodes, { message: "Estado inválido" }),
    startDate: z.string().min(1, "Fecha de inicio requerida"),
    endDate: z.string().optional().or(z.literal("")),
    ticketUrl: z.string().url("URL inválida").optional().or(z.literal("")),
    ticketPriceInfo: z.string().max(200).optional().or(z.literal("")),
    shows: z.array(ShowSchema).min(1, "Agrega al menos una banda"),
  })
  .refine(
    (data) => {
      if (data.endDate && data.startDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
      }
      return true;
    },
    { message: "La fecha de fin debe ser posterior a la de inicio", path: ["endDate"] }
  );

export type EventInput = z.infer<typeof EventSchema>;
export type ShowInput = z.infer<typeof ShowSchema>;
export { EVENT_TYPES };
