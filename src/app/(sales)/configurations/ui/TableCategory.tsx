"use client";

import React from "react";
import { Category } from "@/src/interfaces";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import { deleteCategory } from "@/src/actions";
import { useSession } from "next-auth/react";
import { TableCategories } from "@/src/interfaces";
import clsx from "clsx";

interface TableCategory {
  categories: Category[];
  setName: React.Dispatch<React.SetStateAction<string>>;
  setCategoryId: React.Dispatch<React.SetStateAction<null | string>>;
}

export const TableCategory = ({
  categories,
  setName,
  setCategoryId,
}: TableCategory) => {
  const { data: session } = useSession();
  const companyId = session?.user?.id || "";

  return (
    <div className="bg-white max-h-78 overflow-y-auto rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-50">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Categorías registradas
        </p>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">
              Nombre
            </th>
            <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">
              Status
            </th>
            <th className="px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide text-right">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map(({ id: categoryId, name, active }: Category) => (
            <tr key={categoryId} className="border-b border-gray-50">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <span className="text-green-700 text-xs font-medium">
                      {name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {name}
                  </span>
                </div>
              </td>
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <span
                    className={clsx(
                      "text-sm font-medium  px-4 py-2 rounded-2xl",
                      {
                        "text-gray-700 bg-green-100": active,
                        "text-white bg-red-400": !active,
                      },
                    )}
                  >
                    {active ? "Activo" : "No activo"}
                  </span>
                </div>
              </td>
              <td className="px-5 py-3">
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => {
                      setName(name);
                      setCategoryId(categoryId);
                    }}
                    className="w-7 h-7 cursor-pointer flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <IoCreateOutline className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                  <button
                    onClick={async () => deleteCategory(categoryId, companyId)}
                    className="w-7 h-7 cursor-pointer flex items-center justify-center rounded-md border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors"
                  >
                    <IoTrashOutline className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
