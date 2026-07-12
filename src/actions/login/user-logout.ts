"use server";

import { signOut } from "@/src/auth.config";

export const userLogout = async () => {
  await signOut({ redirectTo: "/" });
};
