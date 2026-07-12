import Link from "next/link";
import React from "react";
import { CardProps } from "@/src/interfaces";
import { IoArrowForwardOutline } from "react-icons/io5";

export const Card = ({ icon, path, title }: CardProps) => {
  return (
    <Link
      href={path}
      className="group relative flex w-full flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/30 hover:shadow-md sm:w-[calc(50%-0.75rem)] lg:w-[calc(20%-1rem)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-soft-foreground)] transition-colors group-hover:bg-[var(--primary)] group-hover:text-white">
        {icon}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[var(--foreground)]">
          {title}
        </span>
        <IoArrowForwardOutline className="h-4 w-4 text-[var(--foreground-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--primary)]" />
      </div>
    </Link>
  );
};
