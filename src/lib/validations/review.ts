import { z } from "zod";

export const ReviewSchema = z.object({
  title: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(200, "Máximo 200 caracteres"),
  rating: z
    .number()
    .int("La calificación debe ser un número entero")
    .min(1, "Mínimo 1")
    .max(10, "Máximo 10"),
  content: z
    .string()
    .min(1, "El contenido de la reseña es requerido"),
});

export type ReviewInput = z.infer<typeof ReviewSchema>;
