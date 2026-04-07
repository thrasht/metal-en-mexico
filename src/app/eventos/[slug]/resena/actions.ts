"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { ReviewSchema } from "@/lib/validations/review";
import { revalidatePath } from "next/cache";

export interface SubmitReviewState {
  error?: string;
  success?: boolean;
  fieldErrors?: Record<string, string[]>;
  reviewId?: string;
}

export async function submitReview(
  _prevState: SubmitReviewState,
  formData: FormData
): Promise<SubmitReviewState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Debes iniciar sesión para escribir una reseña" };
  }

  const eventId = formData.get("eventId") as string;
  if (!eventId) {
    return { error: "Evento no encontrado" };
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { id: true, slug: true, status: true },
  });

  if (!event || event.status !== "approved") {
    return { error: "Solo puedes reseñar eventos aprobados" };
  }

  const existing = await prisma.review.findUnique({
    where: { eventId_authorId: { eventId, authorId: user.id } },
  });

  if (existing) {
    return { error: "Ya escribiste una reseña para este evento" };
  }

  const contentRaw = formData.get("content") as string;
  let contentJson: unknown;
  try {
    contentJson = JSON.parse(contentRaw);
  } catch {
    return { error: "El contenido de la reseña es inválido" };
  }

  const raw = {
    title: formData.get("title") as string,
    rating: Number(formData.get("rating")),
    content: contentRaw,
  };

  const result = ReviewSchema.safeParse(raw);
  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors };
  }

  try {
    const review = await prisma.review.create({
      data: {
        eventId,
        authorId: user.id,
        title: result.data.title,
        rating: result.data.rating,
        content: contentJson as object,
        status: "published",
      },
    });

    const photoFiles: File[] = [];
    let i = 0;
    while (true) {
      const file = formData.get(`photos.${i}`) as File | null;
      console.log(`[Fotos] Buscando photos.${i} en formData:`, file ? `${file.name} (${file.size} bytes, type=${file.type})` : "null/no encontrado");
      if (!file || file.size === 0) break;
      photoFiles.push(file);
      i++;
    }

    console.log(`[Fotos] Total de fotos encontradas en formData: ${photoFiles.length}`);

    // Log de todas las keys del formData para debug
    const allKeys = Array.from(formData.keys());
    const photoKeys = allKeys.filter(k => k.startsWith("photo"));
    console.log(`[Fotos] Keys de formData relacionadas con fotos:`, photoKeys);

    if (photoFiles.length > 0) {
      // Verificar que el bucket existe
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      console.log(`[Storage] Buckets disponibles:`, buckets?.map(b => b.name) ?? "error listando");
      if (bucketsError) {
        console.error(`[Storage] Error listando buckets:`, bucketsError.message);
      }

      for (let idx = 0; idx < photoFiles.length; idx++) {
        const file = photoFiles[idx];
        const ext = file.name.split(".").pop();
        const path = `reviews/${review.id}/${idx}.${ext}`;

        console.log(`[Storage] Subiendo foto ${idx}: path="${path}" size=${file.size} type=${file.type}`);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("review-photos")
          .upload(path, file, { upsert: true });

        if (uploadError) {
          console.error(`[Storage] Error al subir foto ${idx}:`, uploadError.message);
          continue;
        }

        console.log(`[Storage] Foto ${idx} subida OK:`, uploadData);

        const { data: publicUrl } = supabase.storage
          .from("review-photos")
          .getPublicUrl(path);

        console.log(`[Storage] URL pública foto ${idx}:`, publicUrl.publicUrl);

        await prisma.reviewPhoto.create({
          data: {
            reviewId: review.id,
            url: publicUrl.publicUrl,
            sortOrder: idx,
          },
        });

        console.log(`[DB] ReviewPhoto creada para foto ${idx}`);
      }
    }

    console.log(`[Reseña creada] id=${review.id} eventId=${eventId} rating=${review.rating} fotos=${photoFiles.length}`);
    revalidatePath(`/eventos/${event.slug}`);

    return { success: true, reviewId: review.id };
  } catch (err) {
    console.error("Error al crear reseña:", err);
    return { error: "Error al guardar la reseña. Intenta de nuevo." };
  }
}
