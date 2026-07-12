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
    icon: <IoPersonOutline className="w-12 h-12 text-white" />,
  },
  {
    path: "/products",
    title: "Productos",
    icon: <IoCubeOutline className="w-12 h-12 text-white" />,
  },
  {
    path: "/sales",
    title: "Ventas",
    icon: <IoCartOutline className="w-12 h-12 text-white" />,
  },
  {
    path: "/orders",
    title: "Ordenes",
    icon: <IoReceiptOutline className="w-12 h-12 text-white" />,
  },
  {
    path: "/configurations",
    title: "Configuraciones",
    icon: <IoSettingsOutline className="w-12 h-12 text-white" />,
  },
];

export const ContainerCard = () => {
  return (
    <div className="bg-gray-100 p-10 px-16 box-border w-full min-h-screen flex content-start flex-wrap gap-10">
      <div className="w-full flex flex-col gap-1 mb-15 mt-15">
        <p className="text-gray-500 text-lg">| Bienvenido, Anthony</p>
        <h1 className="text-2xl font-semibold text-gray-800">
          ¿Qué vas a gestionar hoy?
        </h1>
      </div>

      <div className="w-full flex flex-col gap-4">
        <p className="text-gray-500 text-lg">| Módulos</p>
        <div className="flex flex-col  md:flex-row flex-wrap gap-10">
          {cards.map((card) => (
            <Card key={card.path} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};
