import React from "react";
import { ContainerOrders } from "./ui/ContainerOrders";
import { getOrderStats } from "@/src/actions";

interface Props {
  searchParams: {
    page?: string;
    customerId?: string;
  };
}

export const OrdersPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const statsData = await getOrderStats();

  const total = statsData?.total ?? 0;
  const completed = statsData?.completed ?? 0;
  const pending = statsData?.pending ?? 0;

  const stats = [
    {
      label: "Total ordenes",
      value: total,
      sub: "Registradas",
      subColor: "text-gray-500",
    },
    {
      label: "Completadas",
      value: completed,
      sub: total ? `${Math.round((completed / total) * 100)}% del total` : "0% del total",
      subColor: "text-green-700",
    },
    {
      label: "Pendientes",
      value: pending,
      sub: total ? `${Math.round((pending / total) * 100)}% del total` : "0% del total",
      subColor: "text-amber-600",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 md:px-16">
      <div className="mb-6">
        <div className="mb-6">
          <p className="text-gray-500 text-sm">Gestion</p>
          <h1 className="text-2xl font-semibold text-gray-800">Ordenes</h1>
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

        <ContainerOrders params={params} />
      </div>
    </div>
  );
};

export default OrdersPage;
