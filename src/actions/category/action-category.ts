"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

interface CategoryData {
  name: string;
  companyId: string;
  categoryId?: null | string;
}

export const createOrUpdateCategory = async ({
  categoryId,
  companyId,
  name,
}: CategoryData) => {
  try {
    const category = await prisma.category.upsert({
      where: {
        id: categoryId || "",
        companyId,
      },
      update: {
        name,
      },
      create: {
        name,
        companyId,
      },
    });

    revalidatePath("/configurations");
    return {
      ok: true,
      category,
      message: "Categoría creada correctamente",
    };
  } catch (error) {
    return {
      ok: false,
      message: `Error al crear la categoría ${error}`,
    };
  }
};

export const getCategries = async (companyId: string) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        companyId,
      },
      orderBy: {
        name: "asc",
      },
    });

    return {
      ok: true,
      categories: categories.map(({ id, name, active }) => ({
        id,
        active: active ?? true,
        name,
      })),
    };
  } catch (error) {
    return {
      ok: false,
      message: `Error al obtener las categorías ${error}`,
    };
  }
};

export const deleteCategory = async (categoryId: string, companyId: string) => {
  try {
    await prisma.category.delete({
      where: {
        id: categoryId,
        companyId,
      },
    });

    revalidatePath("/configurations");
    return {
      ok: true,
      message: "Categoría eliminada correctamente",
    };
  } catch (error) {
    return {
      ok: false,
      message: `Error al eliminar la categoría ${error}`,
    };
  }
};
