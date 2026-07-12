import { getCustomers } from "@/src/actions";
import { PaginationTable, TableData } from "@/src/components";
import { Customer } from "@/src/interfaces";
import { getSession } from "@/src/lib/session";
import { redirect } from "next/navigation";
import React from "react";
import { ActionButtons } from "./ActionButtons";

interface CustomerProp {
  customers: Customer[];
  totalPage: number;
  page: number;
  total?: number;
}

interface Props {
  params: {
    page: string;
    search?: string;
  };
}

export const TableContainer = async ({ params }: Props) => {
  const { companyId } = await getSession();
  const currentPage = Number(params?.page) || 1;
  const search = params?.search?.trim();

  if (!companyId) redirect("auth/login");

  const customersData = (await getCustomers({
    companyId,
    skip: currentPage,
    take: 8,
    search,
  })) as CustomerProp;

  const { customers, totalPage, page, total } = customersData;

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-gray-100 gap-3">
        <p className="text-xs text-gray-400 font-bold">{`Mostrando total usuarios  ${total}`}</p>
        <PaginationTable totalPage={totalPage} page={page} />
      </div>
      <TableData
        data={customers}
        columns={[
          {
            accessor: "firstName",
            key: "firstName",
            label: "Nombre",
            render: ({ firstName, lastName, email }) => (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <span className="text-green-700 text-xs font-semibold">
                    {firstName?.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{`${firstName} ${lastName}`}</p>
                  <p className="text-xs text-gray-400">{email || "Sin correo"}</p>
                </div>
              </div>
            ),
          },
          {
            accessor: "documentNumber",
            key: "documentNumber",
            label: "Numero Documento",
            render: ({ documentNumber }) => (
              <span className="font-medium text-gray-700">{documentNumber}</span>
            ),
          },
          {
            accessor: "documentType",
            key: "documentType",
            label: "Tipo Documento",
            render: ({ documentType }) => (
              <span className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                {documentType}
              </span>
            ),
          },
          {
            accessor: "email",
            key: "email",
            label: "Correo",
            render: ({ email }) => (
              <span className="text-sm text-gray-600">{email || "-"}</span>
            ),
          },
          {
            accessor: "phone",
            key: "phone",
            label: "Celular",
            render: ({ phone }) => (
              <span className="font-medium text-gray-700">{phone || "-"}</span>
            ),
          },
          {
            accessor: "active",
            key: "active",
            label: "Estado",
            render: ({ active }) => (
              <span
                className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${
                  active
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {active ? "Activo" : "Inactivo"}
              </span>
            ),
          },
          {
            accessor: "address",
            key: "address",
            label: "Direccion",
            render: ({ address }) => (
              <span className="text-sm text-gray-600">{address || "-"}</span>
            ),
          },
          {
            key: "actions",
            label: "Acciones",
            render: ({ id: customerId }) => (
              <ActionButtons
                path={`/customers/${customerId}`}
                paramId={customerId}
              />
            ),
          },
        ]}
      />
    </div>
  );
};
