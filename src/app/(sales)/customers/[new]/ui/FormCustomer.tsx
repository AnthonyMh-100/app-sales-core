"use client";

import React, { useActionState, useEffect, useMemo, useState } from "react";
import { IoSaveOutline } from "react-icons/io5";
import { createOrUpdateCustomer } from "@/src/actions";
import type { Customer, DocumentType } from "@/src/interfaces";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type CustomerFormData = {
  id: string;
  active: "true" | "false" | "";

  firstName: string;
  lastName: string;
  documentType: DocumentType | "";
  documentNumber: string;
  email: string;
  phone: string;
  address: string;
};

type FormCustomerProps = {
  customer?: Partial<Customer> | null;
};

export const FormCustomer = ({ customer }: FormCustomerProps) => {
  const [state, action, pending] = useActionState(createOrUpdateCustomer, null);
  const [formData, setFormData] = useState<CustomerFormData>({
    id: customer?.id ?? "",
    active:
      customer?.active !== undefined
        ? (String(customer.active) as "true" | "false")
        : "",
    firstName: customer?.firstName ?? "",
    lastName: customer?.lastName ?? "",
    documentType: customer?.documentType ?? "",
    documentNumber: customer?.documentNumber ?? "",
    email: customer?.email ?? "",
    phone: customer?.phone ?? "",
    address: customer?.address ?? "",
  });
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
    const { phone, address, email, id, ...requiredFields } = formData;
    return Object.values(requiredFields).every((field) => Boolean(field));
  }, [formData]);

  console.log({ state });

  useEffect(() => {
    if (!state) return;

    if (state?.ok) {
      route.replace("/customers");
      return;
    }
    Swal.fire({
      title: "¡Algo salió mal!",
      text: state.message ?? "Ocurrió un error inesperado.",
      icon: "error",
      confirmButtonText: "Entendido",
    });
  }, [state]);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 md:p-6">
      <form action={action} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <input
              id="customerId"
              name="customerId"
              type="hidden"
              defaultValue={formData?.id}
            />
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              Nombres
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Ingresa los nombres"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Apellidos
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Ingresa los apellidos"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="documentType"
              className="text-sm font-medium text-gray-700"
            >
              Tipo de documento
            </label>
            <select
              id="documentType"
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
            >
              <option value="" disabled>
                Selecciona un tipo de documento
              </option>
              <option value="DNI">DNI</option>
              <option value="RUC">RUC</option>
              <option value="CE">CE</option>
              <option value="OTHER">Otro</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="active"
              className="text-sm font-medium text-gray-700"
            >
              Estado
            </label>
            <select
              id="active"
              name="active"
              value={formData.active}
              onChange={handleChange}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
            >
              <option value="" disabled>
                Selecciona un estado
              </option>
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="documentNumber"
              className="text-sm font-medium text-gray-700"
            >
              Numero de documento
            </label>
            <input
              id="documentNumber"
              name="documentNumber"
              type="text"
              value={formData.documentNumber}
              onChange={handleChange}
              placeholder="Ingresa el numero de documento"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@cliente.com"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Telefono
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ingresa el telefono"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="address"
            className="text-sm font-medium text-gray-700"
          >
            Direccion
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Ingresa la direccion"
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
            {pending ? "Guardando..." : "Guardar cliente"}
          </button>
        </div>
      </form>
    </div>
  );
};
