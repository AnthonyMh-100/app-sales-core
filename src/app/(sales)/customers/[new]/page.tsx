import React from "react";
import { getCustomerById } from "@/src/actions";
import { getSession } from "@/src/lib/session";
import { redirect } from "next/navigation";
import { FormCustomer } from "./ui/FormCustomer";
import { Customer } from "@/src/interfaces";

type PageProps = {
  params: Promise<{
    new: string;
  }>;
};

export const NewCustomerPage = async ({ params }: PageProps) => {
  const { companyId } = await getSession();

  if (!companyId) {
    redirect("/auth/login");
  }

  const { new: customerId } = await params;

  const customer =
    customerId !== "new"
      ? ((await getCustomerById(customerId, companyId)) as Customer)
      : null;

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 md:px-16">
      <div className="mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-gray-500 text-sm">Gestion</p>
            <h1 className="text-2xl font-semibold text-gray-800">
              {customerId === "new" ? "Nuevo cliente" : "Editar cliente"}
            </h1>
          </div>
        </div>

        <FormCustomer customer={customer} />
      </div>
    </div>
  );
};

export default NewCustomerPage;
