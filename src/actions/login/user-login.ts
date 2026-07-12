"use server";

import { signIn } from "@/src/auth.config";
import { ActionResponse } from "@/src/interfaces";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const userLogin = async (
  _: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> => {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirectTo: "/",
    });
    return { ok: true, message: "Login exitoso" };
  } catch (error) {
    console.error("Error en el login:", error);
    if (isRedirectError(error)) throw error;
    return { ok: false, message: "Error servidor" };
  }
};
