"use server";

import { prisma } from "@/src/lib/prisma";
import { getSession } from "@/src/lib/session";

interface CustomerSearchResult {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  documentNumber: string;
}

interface OrderPaginate {
  customerId?: string;
  companyId: string;
  take?: number;
  skip?: number;
  status?: "PENDING" | "COMPLETED" | "CANCELLED";
}

export const getOrderStats = async () => {
  try {
    const { companyId } = await getSession();

    if (!companyId) return null;

    const [total, completed, pending] = await Promise.all([
      prisma.sale.count({ where: { companyId } }),
      prisma.sale.count({ where: { companyId, status: "COMPLETED" } }),
      prisma.sale.count({ where: { companyId, status: "PENDING" } }),
    ]);

    return {
      total,
      completed,
      pending,
    };
  } catch {
    return null;
  }
};

export const searchOrderCustomers = async (
  searchValue: string,
): Promise<CustomerSearchResult[]> => {
  try {
    const { companyId } = await getSession();

    if (!companyId) return [];

    const cleanSearch = searchValue.trim();

    if (!cleanSearch) return [];

    const customers = await prisma.customer.findMany({
      where: {
        companyId,
        OR: [
          { firstName: { contains: cleanSearch, mode: "insensitive" } },
          { lastName: { contains: cleanSearch, mode: "insensitive" } },
          { email: { contains: cleanSearch, mode: "insensitive" } },
          { documentNumber: { contains: cleanSearch, mode: "insensitive" } },
        ],
      },
      orderBy: { firstName: "asc" },
      take: 8,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        documentNumber: true,
      },
    });

    return customers;
  } catch {
    return [];
  }
};

export const getOrdersByCustomer = async ({
  customerId,
  companyId,
  skip = 1,
  take = 8,
  status,
}: OrderPaginate) => {
  try {
    const where = {
      companyId,
      ...(customerId ? { customerId } : {}),
      ...(status ? { status } : {}),
    };

    const totalOrders = await prisma.sale.count({ where });
    const totalPage = Math.max(1, Math.ceil(totalOrders / take));

    const orders = await prisma.sale.findMany({
      where,
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        saleDetails: {
          select: {
            quantity: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take,
      skip: (skip - 1) * take,
    });

    const formattedOrders = orders.map(
      ({ saleDetails, customer, ...orderWithoutRelations }) => ({
        ...orderWithoutRelations,
        customerName: `${customer.firstName} ${customer.lastName}`,
        productsCount: saleDetails.reduce((sum, item) => sum + item.quantity, 0),
      }),
    );

    return {
      total: totalOrders,
      totalPage,
      page: skip,
      orders: formattedOrders,
    };
  } catch (error) {
    return error;
  }
};
