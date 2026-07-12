"use client";

import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { userLogout } from "@/src/actions/login/user-logout";
import {
  IoChevronDownOutline,
  IoLogOutOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";

const pageTitles: Record<string, string> = {
  "/": "Inicio",
  "/customers": "Clientes",
  "/products": "Productos",
  "/sales": "Ventas",
  "/orders": "Ordenes",
  "/configurations": "Configuración",
};

function resolvePageTitle(pathname: string) {
  if (pageTitles[pathname]) return pageTitles[pathname];
  const base = "/" + pathname.split("/")[1];
  return pageTitles[base] ?? "Panel";
}

export const TopBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const title = resolvePageTitle(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)]/90 px-6 backdrop-blur">
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--foreground-muted)]">
          Panel
        </span>
        <h2 className="text-sm font-semibold text-[var(--foreground)]">{title}</h2>
      </div>

      <div
        className="relative"
        ref={menuRef}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setIsOpen(false);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsOpen(false);
          }
        }}
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] py-1.5 pl-1.5 pr-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]"
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary-soft)] text-xs font-semibold text-[var(--primary-soft-foreground)]">
            A
          </span>
          <span>Anthony</span>
          <IoChevronDownOutline
            className={`h-3.5 w-3.5 text-[var(--foreground-muted)] transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen ? (
          <div
            role="menu"
            className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg"
          >
            <button
              type="button"
              role="menuitem"
              className="flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left text-sm text-[var(--foreground-secondary)] transition-colors hover:bg-[var(--surface-hover)]"
            >
              <IoPersonCircleOutline className="h-4 w-4" />
              Ver perfil
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => userLogout()}
              className="flex w-full cursor-pointer items-center gap-2 border-t border-[var(--border)] px-4 py-2.5 text-left text-sm text-[var(--danger)] transition-colors hover:bg-[var(--danger-soft)]"
            >
              <IoLogOutOutline className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
};
