import { getOrdersByCustomer } from "@/src/actions";
import { PaginationTable, TableData } from "@/src/components";
import { getSession } from "@/src/lib/session";
import { formatCurrency } from "@/src/utils/utils";
import { redirect } from "next/navigation";
import React from "react";

interface OrderRow {
  id: string;
  code: string;
  customerName: string;
  createdAt: Date;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  subtotal: number;
  total: number;
  productsCount: number;
}

interface OrderResponse {
  orders: OrderRow[];
  totalPage: number;
  page: number;
  total?: number;
}

interface Props {
  customerId?: string;
  page: number;
}

const statusStyles: Record<OrderRow["status"], string> = {
  COMPLETED: "bg-green-50 text-green-700",
  PENDING: "bg-amber-50 text-amber-700",
  CANCELLED: "bg-red-50 text-red-500",
};

const statusLabel: Record<OrderRow["status"], string> = {
  COMPLETED: "Completado",
  PENDING: "Pendiente",
  CANCELLED: "Cancelado",
};

export const OrdersTable = async ({ customerId, page }: Props) => {
  const { companyId } = await getSession();

  if (!companyId) redirect("auth/login");

  const ordersData = (await getOrdersByCustomer({
    companyId,
    customerId,
    skip: page,
    take: 8,
  })) as OrderResponse;

  const { orders, totalPage, total } = ordersData;

  if (!orders?.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
        <p className="text-sm text-gray-500">
          {customerId
            ? "El cliente seleccionado no tiene ordenes registradas."
            : "No hay ordenes registradas todavia."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-gray-100 gap-3">
        <p className="text-xs text-gray-400 font-bold">{`Mostrando total ordenes ${total}`}</p>
        <PaginationTable totalPage={totalPage} page={page} />
      </div>
      <TableData
        data={orders}
        columns={[
          {
            key: "code",
            accessor: "code",
            label: "Codigo de orden",
            render: ({ code }) => (
              <span className="font-medium text-gray-800">{code}</span>
            ),
          },
          {
            key: "customerName",
            accessor: "customerName",
            label: "Cliente",
            render: ({ customerName }) => (
              <span className="text-sm text-gray-700">{customerName}</span>
            ),
          },
          {
            key: "createdAt",
            accessor: "createdAt",
            label: "Fecha",
            render: ({ createdAt }) => (
              <span className="text-sm text-gray-600">
                {new Date(createdAt).toLocaleDateString("es-PE")}
              </span>
            ),
          },
          {
            key: "status",
            accessor: "status",
            label: "Estado",
            render: ({ status }) => (
              <span
                className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[status]}`}
              >
                {statusLabel[status]}
              </span>
            ),
          },
          {
            key: "subtotal",
            accessor: "subtotal",
            label: "Subtotal",
            render: ({ subtotal }) => (
              <span className="text-sm font-medium text-gray-700">
                {formatCurrency(subtotal)}
              </span>
            ),
          },
          {
            key: "total",
            accessor: "total",
            label: "Total",
            render: ({ total: totalOrder }) => (
              <span className="text-sm font-semibold text-gray-800">
                {formatCurrency(totalOrder)}
              </span>
            ),
          },
          {
            key: "productsCount",
            accessor: "productsCount",
            label: "Cantidad productos",
            render: ({ productsCount }) => (
              <span className="text-sm text-gray-700">{productsCount}</span>
            ),
          },
          {
            key: "actions",
            label: "Acciones",
            render: ({ code }) => (
              <button
                type="button"
                className="text-sm text-green-700 hover:text-green-800 font-medium transition-colors cursor-pointer"
                title={`Ver detalle de ${code}`}
              >
                Ver detalle
              </button>
            ),
          },
        ]}
      />
    </div>
  );
};
