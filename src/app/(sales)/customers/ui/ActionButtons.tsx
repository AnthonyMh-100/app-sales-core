"use client";
import Link from "next/link";
import React from "react";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { deleteCustomer } from "@/src/actions";

const mostrarAlerta = () => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("¡Eliminado!", "Tu archivo ha sido eliminado.", "success");
    }
  });
};

interface ActionButton {
  path: string;
  paramId: string;
}

export const ActionButtons = ({ path, paramId }: ActionButton) => {
  const handleDeleteCustomer = (paramId: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¡No podrás revertir esto el id ! ${paramId}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",

      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-red-500 text-white px-4 py-2 rounded mr-2 cursor-pointer",
        cancelButton:
          "bg-gray-500 text-white px-4 py-2 rounded mr-2 cursor-pointer",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCustomer(paramId);
        Swal.fire("¡Eliminado!", "Tu archivo ha sido eliminado.", "success");
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
        onClick={() => handleDeleteCustomer(paramId)}
        className="w-7 h-7 cursor-pointer flex items-center justify-center rounded-md border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors"
      >
        <IoTrashOutline className="w-3.5 h-3.5 text-red-400" />
      </button>
    </div>
  );
};
