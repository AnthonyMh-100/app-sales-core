import { prisma } from "@/src/lib/prisma";

interface ValidateCustomerUniqueFieldsProps {
  companyId: string;
  customerId?: string;
  documentNumber: string;
  email?: string;
  phone?: string;
}

export const validateCustomerUniqueFields = async ({
  companyId,
  customerId,
  documentNumber,
  email,
  phone,
}: ValidateCustomerUniqueFieldsProps) => {
  const cleanEmail = email?.trim();
  const cleanPhone = phone?.trim();

  const duplicatedCustomer = await prisma.customer.findFirst({
    where: {
      companyId,
      ...(customerId ? { id: { not: customerId } } : {}),
      OR: [
        { documentNumber },
        ...(cleanEmail ? [{ email: cleanEmail }] : []),
        ...(cleanPhone ? [{ phone: cleanPhone }] : []),
      ],
    },
    select: {
      documentNumber: true,
      email: true,
      phone: true,
    },
  });

  if (!duplicatedCustomer) return null;
  if (duplicatedCustomer.documentNumber === documentNumber) {
    return "El numero de documento ya existe";
  }
  if (cleanEmail && duplicatedCustomer.email === cleanEmail) {
    return "El correo ya existe";
  }
  if (cleanPhone && duplicatedCustomer.phone === cleanPhone) {
    return "El telefono ya existe";
  }

  return "Ya existe un cliente con los datos ingresados";
};
