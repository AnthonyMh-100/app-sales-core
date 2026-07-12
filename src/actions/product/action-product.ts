"use server";

import { prisma } from "@/src/lib/prisma";
import { getSession } from "@/src/lib/session";
import { ActionResponse } from "@/src/interfaces";
import { revalidatePath } from "next/cache";
import { ProductStatus } from "@/src/interfaces/product/product-interface";
import {
  deleteProductImage,
  uploadProductImage,
} from "@/src/utils/upload-product-image";

interface ProductPaginate {
  companyId: string;
  take?: number;
  skip?: number;
  search?: string;
}

export const getProductStats = async () => {
  try {
    const { companyId } = await getSession();

    if (!companyId) return null;

    const [total, active, inactive] = await Promise.all([
      prisma.product.count({ where: { companyId } }),
      prisma.product.count({ where: { companyId, active: true } }),
      prisma.product.count({ where: { companyId, active: false } }),
    ]);

    const activePercent = total ? Math.round((active / total) * 100) : 0;
    const inactivePercent = total ? Math.round((inactive / total) * 100) : 0;

    return {
      total,
      active,
      inactive,
      activePercent,
      inactivePercent,
    };
  } catch (_error) {
    return null;
  }
};

export const getProducts = async ({
  companyId,
  take = 8,
  skip = 1,
  search,
}: ProductPaginate) => {
  try {
    const cleanSearch = search?.trim();
    const where = {
      companyId,
      ...(cleanSearch
        ? {
            OR: [
              { name: { contains: cleanSearch, mode: "insensitive" as const } },
              {
                description: {
                  contains: cleanSearch,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),
    };

    const totalProducts = await prisma.product.count({ where });
    const totalPage = Math.ceil(totalProducts / take);

    const products = await prisma.product.findMany({
      where,
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
      take,
      skip: (skip - 1) * take,
    });

    const productFormatted = products.map(
      ({ createdAt, updatedAt, companyId, category, ...product }) => ({
        ...product,
        categoryName: category.name,
      }),
    );

    return {
      total: totalProducts,
      totalPage,
      page: skip,
      products: productFormatted,
    };
  } catch (error) {
    return error;
  }
};

export const getProductById = async (productId: string, companyId: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: { id: productId, companyId },
    });

    if (!product) return null;

    const {
      createdAt,
      updatedAt,
      companyId: _companyId,
      ...productFormatted
    } = product;

    return productFormatted;
  } catch (error) {
    return error;
  }
};

export const getCategoriesByCompany = async (companyId: string) => {
  return prisma.category.findMany({
    where: { companyId },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
};

export const createOrUpdateProduct = async (
  _state: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> => {
  try {
    const { companyId } = await getSession();

    if (!companyId) {
      return {
        ok: false,
        message: "No autorizado",
      };
    }

    const product = Object.fromEntries(formData.entries());
    const productId = product.productId as string;
    const imageFile = formData.get("imageFile") as File;
    const uploadedImage = await uploadProductImage(
      imageFile ? imageFile : null,
    );
    const existingProduct = productId
      ? await prisma.product.findFirst({
          where: {
            id: productId,
            companyId,
          },
          select: {
            imagePublicId: true,
          },
        })
      : null;

    const productInfo = {
      name: product.name as string,
      description: (product.description as string) || null,
      price: Number(product.price),
      stock: Number(product.stock),
      status: product.status as ProductStatus,
      active: (product.status as ProductStatus) === "ACTIVE",
      categoryId: product.categoryId as string,
      ...(uploadedImage && {
        imgUrl: uploadedImage.secureUrl,
        imagePublicId: uploadedImage.publicId,
        imageSecureUrl: uploadedImage.secureUrl,
        imageFormat: uploadedImage.format,
      }),
    };

    const productData = await prisma.product.upsert({
      where: {
        companyId,
        id: productId,
      },
      update: {
        ...productInfo,
      },
      create: {
        ...productInfo,
        companyId,
      },
    });

    if (
      uploadedImage &&
      existingProduct?.imagePublicId &&
      existingProduct.imagePublicId !== uploadedImage.publicId
    ) {
      await deleteProductImage(existingProduct.imagePublicId);
    }

    revalidatePath("/products");

    return {
      ok: true,
      message: "Producto guardado con exito",
      data: productData,
    };
  } catch (error) {
    return {
      ok: false,
      message: `Error al guardar producto: ${error}`,
    };
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const { companyId } = await getSession();

    const productDelete = await prisma.product.findFirst({
      where: { companyId, id: productId },
    });

    await prisma.product.delete({
      where: {
        companyId,
        id: productId,
      },
    });

    await deleteProductImage(productDelete?.imagePublicId);

    revalidatePath("/products");
  } catch (error) {
    return error;
  }
};
