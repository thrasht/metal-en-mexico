"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No autenticado");

  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  if (profile?.role !== "admin") throw new Error("No autorizado");
  return user;
}

export async function approveEvent(eventId: string) {
  await requireAdmin();
  await prisma.event.update({
    where: { id: eventId },
    data: { status: "approved" },
  });
  revalidatePath("/admin");
  revalidatePath("/admin/eventos");
  revalidatePath("/");
}

export async function rejectEvent(eventId: string) {
  await requireAdmin();
  await prisma.event.update({
    where: { id: eventId },
    data: { status: "rejected" },
  });
  revalidatePath("/admin");
  revalidatePath("/admin/eventos");
}

export async function deleteEvent(eventId: string) {
  await requireAdmin();
  await prisma.event.delete({
    where: { id: eventId },
  });
  revalidatePath("/admin");
  revalidatePath("/admin/eventos");
  revalidatePath("/");
}
