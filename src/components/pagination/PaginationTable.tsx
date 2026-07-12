"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

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
    <div className="flex items-center gap-3">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => handlePaginate(-1)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] text-[var(--foreground-secondary)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <IoChevronBackOutline className="h-4 w-4" />
      </button>

      <span className="text-xs font-medium text-[var(--foreground-muted)]">
        Página <span className="text-[var(--foreground)]">{page}</span> de {totalPage}
      </span>

      <button
        type="button"
        onClick={() => handlePaginate(1)}
        disabled={page === totalPage}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] text-[var(--foreground-secondary)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <IoChevronForwardOutline className="h-4 w-4" />
      </button>
    </div>
  );
};
