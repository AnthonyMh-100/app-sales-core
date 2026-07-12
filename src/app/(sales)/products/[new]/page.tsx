import React from "react";
import { getCategoriesByCompany, getProductById } from "@/src/actions";
import { getSession } from "@/src/lib/session";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { Product } from "@/src/interfaces/product/product-interface";

type PageProps = {
  params: Promise<{
    new: string;
  }>;
};

export const NewProductPage = async ({ params }: PageProps) => {
  const { companyId } = await getSession();

  if (!companyId) {
    redirect("/auth/login");
  }

  const { new: productId } = await params;

  const [product, categories] = await Promise.all([
    productId !== "new"
      ? (getProductById(productId, companyId) as Promise<Product | null>)
      : Promise.resolve(null),
    getCategoriesByCompany(companyId),
  ]);

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 md:px-16">
      <div className="mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-gray-500 text-sm">Gestion</p>
            <h1 className="text-2xl font-semibold text-gray-800">
              {productId === "new" ? "Nuevo producto" : "Editar producto"}
            </h1>
          </div>
        </div>

        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  );
};

export default NewProductPage;
