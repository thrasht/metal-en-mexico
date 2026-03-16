"use server";

import { createClient } from "@/lib/supabase/server";
import { LoginSchema } from "@/lib/validations/auth";

export interface LoginState {
  error?: string;
  success?: boolean;
  fieldErrors?: Record<string, string[]>;
}

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = LoginSchema.safeParse(raw);
  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    if (error.message.includes("Email not confirmed")) {
      return { error: "Tu email aún no está confirmado. Revisa tu bandeja de entrada o spam." };
    }
    return { error: "Email o contraseña incorrectos" };
  }

  return { success: true };
}
