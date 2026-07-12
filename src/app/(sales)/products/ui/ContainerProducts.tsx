import React from "react";
import { IoDownloadOutline, IoSearchOutline } from "react-icons/io5";
import { ProductsTable } from "./ProductsTable";

interface Props {
  params: {
    page: string;
    search?: string;
  };
}

export const ContainerProducts = async ({ params }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col md:flex-row gap-4">
        <form className="flex-1 flex gap-2" method="GET">
          <div className="relative flex-1">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="hidden" name="page" value="1" />
            <input
              type="text"
              name="search"
              defaultValue={params?.search ?? ""}
              placeholder="Buscar por nombre o categoria..."
              className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <IoSearchOutline className="w-4 h-4" />
            Buscar
          </button>
        </form>

        <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
          <IoDownloadOutline className="w-4 h-4" />
          Exportar
        </button>
      </div>
      <ProductsTable params={params} />
    </div>
  );
};
