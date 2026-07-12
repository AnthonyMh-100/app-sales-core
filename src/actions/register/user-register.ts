"use server";

import { generatePassword } from "@/src/utils/utils";
import { prisma } from "@/src/lib/prisma";
import { ActionResponse } from "@/src/interfaces";

export const userRegister = async (
  _: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> => {
  const name = formData.get("name") as string;
  const code = formData.get("code") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const email = formData.get("email") as string;

  try {
    const exists = await prisma.company.findFirst({
      where: {
        OR: [{ code }, { username }],
      },
    });

    if (exists) return { ok: false, message: "El código o usuario ya existe" };

    const hashedPassword = await generatePassword(password);

    const {
      id,
      name: nameCompany,
      email: emailCompany,
      username: usernameCompany,
    } = await prisma.company.create({
      data: {
        name,
        code,
        username,
        password: hashedPassword,
        phone,
        address,
        email,
      },
    });

    return {
      ok: true,
      message: "Empresa registrada correctamente",
      data: {
        id,
        name: nameCompany,
        email: emailCompany,
        username: usernameCompany,
      },
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return { ok: false, message: "Error interno del servidor" };
  }
};
