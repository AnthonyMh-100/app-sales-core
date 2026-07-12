import Link from "next/link";
import React from "react";
import { CardProps } from "@/src/interfaces";

export const Card = ({ icon, path, title }: CardProps) => {
  return (
    <Link
      href={path}
      className="w-1/5 h-32  hover:bg-green-500 bg-green-400 flex flex-col justify-center items-center gap-3 rounded"
    >
      {icon}
      <span className="text-md font-mono">{title}</span>
    </Link>
  );
};
