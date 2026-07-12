import React from "react";
import { CustomerSelector } from "./CustomerSelector";
import { OrdersTable } from "./OrdersTable";
import { getCustomerById } from "@/src/actions";
import { getSession } from "@/src/lib/session";

interface Props {
  params: {
    page?: string;
    customerId?: string;
  };
}

export const ContainerOrders = async ({ params }: Props) => {
  const currentPage = Number(params?.page) || 1;
  const selectedCustomerId = params?.customerId;
  const { companyId } = await getSession();

  const customerSelected =
    selectedCustomerId && companyId
      ? await getCustomerById(selectedCustomerId, companyId)
      : null;

  const customerName = customerSelected
    ? `${customerSelected.firstName} ${customerSelected.lastName}`
    : undefined;

  return (
    <div className="flex flex-col gap-4">
      <CustomerSelector
        selectedCustomerId={selectedCustomerId}
        selectedCustomerName={customerName}
      />
      <OrdersTable customerId={selectedCustomerId} page={currentPage} />
    </div>
  );
};
