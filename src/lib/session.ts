import { auth } from "@/src/auth.config";

export async function getUserSession() {
  const session = await auth();
  if (!session) throw new Error("No autenticado");

  return session;
}

export async function getSession() {
  const session = await getUserSession();
  return {
    user: session?.user,
    companyId: session?.user?.id,
  };
}
