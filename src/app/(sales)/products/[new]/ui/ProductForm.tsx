"use client";

import React, {
  useActionState,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IoSaveOutline } from "react-icons/io5";
import { createOrUpdateProduct } from "@/src/actions";
import type {
  Product,
  ProductStatus,
} from "@/src/interfaces/product/product-interface";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";

type CategoryOption = {
  id: string;
  name: string;
};

type ProductFormData = {
  id: string;
  name: string;
  imgUrl: string | null;
  description: string;
  price: string;
  stock: string;
  status: ProductStatus | "";
  categoryId: string;
};

type FormProductProps = {
  product?: Partial<Product> | null;
  categories: CategoryOption[];
};

export const ProductForm = ({ product, categories }: FormProductProps) => {
  const [state, action, pending] = useActionState(createOrUpdateProduct, null);
  const [formData, setFormData] = useState<ProductFormData>({
    id: product?.id ?? "",
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price ? String(product.price) : "",
    stock: product?.stock !== undefined ? String(product.stock) : "",
    status: product?.status ?? "",
    categoryId: product?.categoryId ?? "",
    imgUrl: product?.imgUrl ?? "",
  });
  const [file, setFile] = useState<File | null>(null);

  const imgUrlTemporal = file ? URL.createObjectURL(file) : "";

  const route = useRouter();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValid = useMemo(() => {
    const { id, description, imgUrl, ...requiredFields } = formData;

    return Object.values(requiredFields).every((field) => Boolean(field));
  }, [formData]);

  useEffect(() => {
    if (state?.ok) {
      route.replace("/products");
    }

    if (state && !state.ok) {
      Swal.fire({
        title: "Algo salio mal",
        text: state.message ?? "Ocurrio un error inesperado.",
        icon: "error",
        confirmButtonText: "Entendido",
        buttonsStyling: false,
        customClass: {
          confirmButton:
            "bg-gray-700 text-white px-4 py-2 rounded mr-2 cursor-pointer",
        },
      });
    }

    return () => {
      if (imgUrlTemporal) {
        URL.revokeObjectURL(imgUrlTemporal);
      }
    };
  }, [state, route, imgUrlTemporal]);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 md:p-6">
      <form action={action} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <input
              id="productId"
              name="productId"
              type="hidden"
              defaultValue={formData.id}
            />
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresa el nombre del producto"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="categoryId"
              className="text-sm font-medium text-gray-700"
            >
              Categoria
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
            >
              <option value="" disabled>
                Selecciona una categoria
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="price"
              className="text-sm font-medium text-gray-700"
            >
              Precio
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="stock"
              className="text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="status"
              className="text-sm font-medium text-gray-700"
            >
              Estado de producto
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
            >
              <option value="" disabled>
                Selecciona un estado
              </option>
              <option value="ACTIVE">Activo</option>
              <option value="INACTIVE">Inactivo</option>
              <option value="OUT_OF_STOCK">Sin stock</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="imageFile"
                className="text-sm font-medium text-gray-700"
              >
                Imagen
              </label>

              {(product?.imgUrl || file) && (
                <Image
                  src={
                    imgUrlTemporal
                      ? imgUrlTemporal || ""
                      : formData?.imgUrl || ""
                  }
                  width={100}
                  height={100}
                  alt={formData?.name}
                />
              )}

              <div className="relative">
                <input
                  id="imageFile"
                  name="imageFile"
                  type="file"
                  accept="image/*"
                  className="absolute opacity-0 cursor-pointer z-10"
                  onChange={({ target }) => {
                    if (target.files && target.files[0]) {
                      setFile(target.files[0]);
                    }
                  }}
                />

                <div className="w-full bg-white border border-green-400 rounded-lg px-3 py-2 text-sm text-gray-700 flex items-center justify-between">
                  <span>{product?.name || "Seleccionar archivo"}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-500">
                    Cambiar
                  </span>
                </div>
              </div>

              {product?.imgUrl && (
                <p className="text-xs text-gray-400 italic">
                  * Selecciona un archivo solo si deseas reemplazar el actual.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Descripcion
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ingresa la descripcion"
            rows={4}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors resize-none"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={!isValid || pending}
            className={clsx(
              "flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors",
              {
                "bg-gray-500 cursor-not-allowed": !isValid || pending,
                "bg-green-500 hover:bg-green-600 cursor-pointer":
                  isValid && !pending,
              },
            )}
          >
            <IoSaveOutline className="w-4 h-4" />
            {pending ? "Guardando..." : "Guardar producto"}
          </button>
        </div>
      </form>
    </div>
  );
};
