import { getProducts } from "@/src/actions";
import { PaginationTable, TableData } from "@/src/components";
import { getSession } from "@/src/lib/session";
import { redirect } from "next/navigation";
import React from "react";
import { ActionButtons } from "./ActionButtons";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/src/utils/utils";

type ProductRow = {
  id: string;
  name: string;
  description?: string | null;
  imgUrl: string | null;
  price: number;
  stock: number;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  categoryName: string;
};

interface ProductResponse {
  products: ProductRow[];
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

const statusLabel: Record<ProductRow["status"], string> = {
  ACTIVE: "Activo",
  INACTIVE: "Inactivo",
  OUT_OF_STOCK: "Sin stock",
};

export const ProductsTable = async ({ params }: Props) => {
  const { companyId } = await getSession();
  const currentPage = Number(params?.page) || 1;
  const search = params?.search?.trim();

  if (!companyId) redirect("auth/login");

  const productsData = (await getProducts({
    companyId,
    skip: currentPage,
    take: 8,
    search,
  })) as ProductResponse;

  const { products, totalPage, page, total } = productsData;

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-gray-100 gap-3">
        <p className="text-xs text-gray-400 font-bold">{`Mostrando total productos ${total}`}</p>
        <PaginationTable totalPage={totalPage} page={page} />
      </div>
      <TableData
        data={products}
        columns={[
          {
            key: "name",
            accessor: "name",
            label: "Producto",
            render: ({ name, description, imgUrl }) => (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  {imgUrl ? (
                    <Image src={imgUrl} width={20} height={20} alt={name} />
                  ) : (
                    <span className="text-green-700 text-xs font-semibold">
                      {name?.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{name}</p>
                  <p className="text-xs text-gray-400">
                    {description || "Sin descripcion"}
                  </p>
                </div>
              </div>
            ),
          },
          {
            key: "categoryName",
            accessor: "categoryName",
            label: "Categoria",
            render: ({ categoryName }) => (
              <span className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                {categoryName}
              </span>
            ),
          },
          {
            key: "price",
            accessor: "price",
            label: "Precio",
            render: ({ price }) => (
              <span className="font-medium text-gray-700">
                {formatCurrency(price)}
              </span>
            ),
          },
          {
            key: "stock",
            accessor: "stock",
            label: "Stock",
            render: ({ stock }) => (
              <span className="font-medium text-gray-700">{stock}</span>
            ),
          },
          {
            key: "status",
            accessor: "status",
            label: "Estado",
            render: ({ status }) => (
              <span
                className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${
                  status === "ACTIVE"
                    ? "bg-green-50 text-green-700"
                    : status === "OUT_OF_STOCK"
                      ? "bg-red-50 text-red-500"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {statusLabel[status]}
              </span>
            ),
          },
          {
            key: "actions",
            label: "Acciones",
            render: ({ id: productId, name }) => (
              <ActionButtons
                path={`/products/${productId}`}
                paramId={productId}
                name={name}
              />
            ),
          },
        ]}
      />
    </div>
  );
};
