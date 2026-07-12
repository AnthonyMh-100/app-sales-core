"use client";

import Link from "next/link";
import React from "react";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { deleteProduct } from "@/src/actions";

interface ActionButtonProps {
  path: string;
  paramId: string;
  name: string;
}

export const ActionButtons = ({ path, paramId, name }: ActionButtonProps) => {
  const handleDeleteProduct = (productId: string) => {
    Swal.fire({
      title: "Estas seguro?",
      text: `Eliminar Producto:  ${name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-red-500 text-white px-4 py-2 rounded mr-2 cursor-pointer",
        cancelButton:
          "bg-gray-500 text-white px-4 py-2 rounded mr-2 cursor-pointer",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(productId);
        Swal.fire("Eliminado", "Producto eliminado correctamente.", "success");
      }
    });
  };

  return (
    <div className="flex gap-2">
      <Link
        href={path}
        className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <IoCreateOutline className="w-3.5 h-3.5 text-gray-500" />
      </Link>
      <button
        onClick={() => handleDeleteProduct(paramId)}
        className="w-7 h-7 cursor-pointer flex items-center justify-center rounded-md border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors"
      >
        <IoTrashOutline className="w-3.5 h-3.5 text-red-400" />
      </button>
    </div>
  );
};
