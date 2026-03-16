"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RegisterSchema } from "@/lib/validations/auth";

export interface RegisterState {
  error?: string;
  success?: boolean;
  needsConfirmation?: boolean;
  fieldErrors?: Record<string, string[]>;
}

export async function register(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const result = RegisterSchema.safeParse(raw);
  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: { name: result.data.name },
    },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return { error: "Este email ya está registrado" };
    }
    return { error: "Error al crear la cuenta. Intenta de nuevo." };
  }

  if (data.user && !data.session) {
    redirect("/auth/login?registered=true");
  }

  return { success: true };
}
