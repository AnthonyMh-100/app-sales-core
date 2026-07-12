import React from "react";
import { IoAddOutline } from "react-icons/io5";
import { ContainerCustomer } from "./ui/ContainerCustomer";
import Link from "next/link";
import { getCustomerStats } from "@/src/actions";

interface Props {
  searchParams: {
    page: string;
    search?: string;
  };
}

export const CustomersPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const statsData = await getCustomerStats();
  const total = statsData?.total ?? 0;
  const active = statsData?.active ?? 0;
  const inactive = statsData?.inactive ?? 0;
  const activePercent = statsData?.activePercent ?? 0;
  const inactivePercent = statsData?.inactivePercent ?? 0;

  const stats = [
    {
      label: "Total usuarios",
      value: total,
      sub: "Registrados",
      subColor: "text-gray-500",
    },
    {
      label: "Activos",
      value: active,
      sub: `${activePercent}% del total`,
      subColor: "text-green-700",
    },
    {
      label: "Inactivos",
      value: inactive,
      sub: `${inactivePercent}% del total`,
      subColor: "text-red-600",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 md:px-16">
      <div className="mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-gray-500 text-sm">Gestión</p>
            <h1 className="text-2xl font-semibold text-gray-800">Clientes</h1>
          </div>

          <Link
            href="/customers/new"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <IoAddOutline className="w-4 h-4" />
            Nuevo usuario
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-4 border border-gray-100"
            >
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-semibold text-gray-800">
                {stat.value}
              </p>
              <p className={`text-xs mt-1 ${stat.subColor}`}>{stat.sub}</p>
            </div>
          ))}
        </div>

        <ContainerCustomer params={params} />
      </div>
    </div>
  );
};

export default CustomersPage;
