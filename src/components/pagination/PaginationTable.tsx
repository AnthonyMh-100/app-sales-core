"use client";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";

interface Props {
  totalPage: number;
  page: number;
}

export const PaginationTable = ({ totalPage, page }: Props) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const handlePaginate = (change: number) => {
    const newPage = page + change;

    if (newPage < 1 || newPage > totalPage) return;
    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`);
  };
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="flex justify-center items-center space-x-4">
          <button
            disabled={page === 1}
            onClick={() => handlePaginate(-1)}
            className={clsx(
              "rounded-md  px-2 py-1 text-3xl leading-6 text-slate-400 transition  hover:text-slate-500 cursor-pointer shadow-sm",
              {
                "bg-gray-500 hover:bg-gray-400": page === 1,
                "bg-green-400 hover:bg-green-300": page !== 1,
              },
            )}
          >
            <IoArrowBackCircleOutline size={22} className="text-white" />
          </button>
          <div className="text-slate-500">{`${page}/${totalPage}`}</div>
          <button
            onClick={() => handlePaginate(1)}
            disabled={page === totalPage}
            className={clsx(
              "rounded-md  px-2 py-1 text-3xl leading-6 text-slate-400 transition  hover:text-slate-500 cursor-pointer shadow-sm",
              {
                "bg-gray-500 hover:bg-gray-400": page === totalPage,
                "bg-green-400 hover:bg-green-300": page !== totalPage,
              },
            )}
          >
            <IoArrowForwardCircleOutline size={22} className=" text-white" />
          </button>
        </div>
      </div>
    </>
  );
};
