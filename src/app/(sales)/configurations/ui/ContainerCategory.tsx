"use client";
import React, { useState } from "react";
import { FormCategory } from "./FormCategory";
import { TableCategory } from "./TableCategory";
import { TableCategories } from "@/src/interfaces";

export const ContainerCategory = ({ categories }: TableCategories) => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<null | string>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
          Nueva categoría
        </p>

        <FormCategory name={name} setName={setName} categoryId={categoryId} />
      </div>

      {!!categories.length && (
        <TableCategory
          categories={categories}
          setName={setName}
          setCategoryId={setCategoryId}
        />
      )}
    </div>
  );
};
