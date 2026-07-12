"use server";

import { CartItem } from "@/src/app/(sales)/sales/page";
import { prisma } from "@/src/lib/prisma";
import { getSession } from "@/src/lib/session";
import { MethodType } from "@/src/app/(sales)/sales/page";

interface CartSale {
  cart: CartItem[];
  payment: MethodType;
  customerId: string;
  total: number;
  subtotal: number;
}

export const searchCustomer = async (searchValue: string) => {
  try {
    const customers = await prisma.customer.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: searchValue,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: searchValue,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: searchValue,
              mode: "insensitive",
            },
          },
          {
            documentNumber: {
              contains: searchValue,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    const customerFormatted = customers.map(
      ({ id, firstName, lastName, email, documentNumber }) => ({
        id,
        firstName,
        lastName,
        email,
        documentNumber,
      }),
    );

    return customerFormatted;
  } catch (error) {
    return error;
  }
};

export const searchProducts = async (searchValue: string) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        OR: [
          {
            name: {
              contains: searchValue,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchValue,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    const productFormatted = products.map(
      ({
        id,
        name,
        price,
        stock,
        category: { id: categoryId, name: categoryName },
      }) => ({
        id,
        name,
        price,
        stock,
        category: categoryName,
        categoryId,
      }),
    );

    return productFormatted;
  } catch (error) {
    return error;
  }
};

export const generateSale = async (cartSale: CartSale) => {
  try {
    const { companyId } = await getSession();
    const { cart, customerId, subtotal, total, payment } = cartSale;

    const productByQuantity = cart.map(({ id, categoryId, quantity }) => ({
      id,
      categoryId,
      quantity,
    }));
    const productIds = productByQuantity.map(({ id }) => id);
    const categoryIds = productByQuantity.map(({ categoryId }) => categoryId);

    const sale = await prisma.sale.create({
      data: {
        code: "",
        subtotal,
        total,
        companyId: companyId as string,
        customerId,

        saleDetails: {
          create: cart.map(({ id: productId, quantity, price: unitPrice }) => ({
            productId,
            quantity,
            unitPrice,
            subtotal: quantity * unitPrice,
          })),
        },

        payments: {
          create: {
            method: payment,
            amount: total,
          },
        },
      },
      include: {
        saleDetails: true,
      },
    });
    const code = `VTA-${sale.id.padStart(6, "0")}`;

    await prisma.$transaction([
      prisma.sale.update({
        where: {
          id: sale.id,
          companyId,
        },
        data: {
          code,
        },
      }),

      ...cart.map((item) =>
        prisma.product.update({
          where: {
            id: item.id,
            companyId,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        }),
      ),
    ]);

    return {
      ok: true,
      message: "Venta creada con exito!",
    };
  } catch (error) {
    return {
      ok: false,
      message: `Error al generar venta ${error}`,
    };
  }
};
