import React from "react";
import {
  IoPersonOutline,
  IoCubeOutline,
  IoCartOutline,
  IoSettingsOutline,
  IoReceiptOutline,
} from "react-icons/io5";
import { CardProps } from "@/src/interfaces";
import { Card } from "./Card";

const cards: CardProps[] = [
  {
    path: "/customers",
    title: "Clientes",
    icon: <IoPersonOutline className="h-6 w-6" />,
  },
  {
    path: "/products",
    title: "Productos",
    icon: <IoCubeOutline className="h-6 w-6" />,
  },
  {
    path: "/sales",
    title: "Ventas",
    icon: <IoCartOutline className="h-6 w-6" />,
  },
  {
    path: "/orders",
    title: "Ordenes",
    icon: <IoReceiptOutline className="h-6 w-6" />,
  },
  {
    path: "/configurations",
    title: "Configuraciones",
    icon: <IoSettingsOutline className="h-6 w-6" />,
  },
];

export const ContainerCard = () => {
  return (
    <div className="min-h-screen w-full bg-[var(--background)] px-6 py-10 md:px-12 lg:px-16">
      <div className="mb-10 flex flex-col gap-1">
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--foreground-muted)]">
          Bienvenido, Anthony
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          ¿Qué vas a gestionar hoy?
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--foreground-muted)]">
          Módulos
        </p>
        <div className="flex flex-wrap gap-4">
          {cards.map((card) => (
            <Card key={card.path} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};
