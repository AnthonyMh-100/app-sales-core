"use server";

import { prisma } from "@/src/lib/prisma";
import { getSession } from "@/src/lib/session";
import { ActionResponse, Customer, DocumentType } from "@/src/interfaces";
import { revalidatePath } from "next/cache";
import { validateCustomerUniqueFields } from "@/src/utils/customer-validation";

interface CustomerPaginate {
  total?: number;
  companyId: string;
  take?: number;
  skip?: number;
  search?: string;
}

export const getCustomerStats = async () => {
  try {
    const { companyId } = await getSession();

    if (!companyId) return null;

    const [total, active] = await Promise.all([
      prisma.customer.count({ where: { companyId } }),
      prisma.customer.count({ where: { companyId, active: true } }),
    ]);

    const inactive = total - active;
    const activePercent = total ? Math.round((active / total) * 100) : 0;
    const inactivePercent = total ? Math.round((inactive / total) * 100) : 0;

    return {
      total,
      active,
      inactive,
      activePercent,
      inactivePercent,
    };
  } catch (error) {
    return null;
  }
};

export const getCustomers = async ({
  companyId,
  take = 5,
  skip = 1,
  search,
}: CustomerPaginate) => {
  try {
    const cleanSearch = search?.trim();
    const where = {
      companyId,
      ...(cleanSearch
        ? {
            OR: [
              { firstName: { contains: cleanSearch } },
              { lastName: { contains: cleanSearch } },
              { email: { contains: cleanSearch } },
            ],
          }
        : {}),
    };

    const totalCustomers = await prisma.customer.count({ where });
    const totalPage = Math.ceil(totalCustomers / take);

    const customers = await prisma.customer.findMany({
      where,
      orderBy: {
        firstName: "asc",
      },
      take,
      skip: (skip - 1) * take,
    });

    const customerFormatted = customers.map(
      ({ createdAt, updatedAt, companyId, ...customers }) => ({
        ...customers,
      }),
    );

    const totalCustomer = await prisma.customer.count({ where });

    return {
      total: totalCustomer,
      totalPage,
      page: skip,
      customers: customerFormatted,
    };
  } catch (error) {
    return error;
  }
};

export const getCustomerById = async (
  customerId: string,
  companyId: string,
) => {
  try {
    const customer = await prisma.customer.findFirst({
      where: { companyId, id: customerId },
    });

    if (!customer) return null;

    const {
      createdAt,
      updatedAt,
      companyId: companyIdCurrent,
      ...customerFormatted
    } = customer;

    return customerFormatted;
  } catch (error) {
    return error;
  }
};

export const createOrUpdateCustomer = async (
  state: ActionResponse | null,
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

    const customer = Object.fromEntries(formData.entries());
    const duplicatedMessage = await validateCustomerUniqueFields({
      companyId,
      customerId: (customer.customerId as string) || undefined,
      documentNumber: customer.documentNumber as string,
      email: customer.email as string,
      phone: customer.phone as string,
    });

    if (duplicatedMessage) {
      return {
        ok: false,
        message: duplicatedMessage,
      };
    }

    const customerInfo = {
      firstName: customer.firstName as string,
      lastName: customer.lastName as string,
      active: (customer.active as string) === "true",
      documentType: customer.documentType as DocumentType,
      documentNumber: customer.documentNumber as string,
      email: customer.email as string,
      phone: customer.phone as string,
      address: customer.address as string,
    };
    const customerData = await prisma.customer.upsert({
      where: {
        companyId,
        id: customer.customerId as string,
      },
      update: {
        ...customerInfo,
      },
      create: {
        ...customerInfo,
        companyId,
      },
    });

    revalidatePath("/customers");

    return {
      ok: true,
      message: "Cliente creado con éxito",
      data: customerData,
    };
  } catch (error) {
    return {
      ok: false,
      message: `Error en la creación ${error}`,
    };
  }
};

export const deleteCustomer = async (customerId: string) => {
  try {
    const { companyId } = await getSession();

    await prisma.customer.delete({
      where: {
        companyId,
        id: customerId,
      },
    });

    revalidatePath("/customers");
  } catch (error) {
    return error;
  }
};
