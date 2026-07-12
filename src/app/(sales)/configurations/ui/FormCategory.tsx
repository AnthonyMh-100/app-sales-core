"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { IoAddOutline } from "react-icons/io5";
import { createOrUpdateCategory } from "@/src/actions";
import clsx from "clsx";

interface FormCategory {
  categoryId: null | string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export const FormCategory = ({ name, categoryId, setName }: FormCategory) => {
  const { data: session } = useSession();

  const onSubmitCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim().length) return;

    const companyId = session?.user?.id || "";

    await createOrUpdateCategory({ categoryId, companyId, name });
    setName("");
  };

  console.log({ session });

  return (
    <>
      <form onSubmit={onSubmitCategory} className="flex gap-3">
        <input
          type="text"
          placeholder="Nombre de la categoría..."
          name="name"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors placeholder:text-gray-300"
        />
        <button
          type="submit"
          className={clsx(
            "flex items-center gap-2 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors",
            !name.trim().length
              ? "bg-gray-300"
              : "bg-green-500 hover:bg-green-600",
          )}
        >
          <IoAddOutline className="w-4 h-4" />
          Agregar
        </button>
      </form>
    </>
  );
};
