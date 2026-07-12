"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IoGridOutline,
  IoPersonOutline,
  IoCubeOutline,
  IoCartOutline,
  IoReceiptOutline,
  IoSettingsOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { path: "/", label: "Inicio", icon: IoGridOutline },
  { path: "/customers", label: "Clientes", icon: IoPersonOutline },
  { path: "/products", label: "Productos", icon: IoCubeOutline },
  { path: "/sales", label: "Ventas", icon: IoCartOutline },
  { path: "/orders", label: "Ordenes", icon: IoReceiptOutline },
  { path: "/configurations", label: "Configuración", icon: IoSettingsOutline },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface)] transition-[width] duration-200 ease-in-out ${
        collapsed ? "w-[76px]" : "w-64"
      }`}
    >
      <div className="flex h-16 items-center gap-2.5 border-b border-[var(--border)] px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)] text-sm font-bold text-white">
          AS
        </div>
        {!collapsed && (
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[11px] font-medium uppercase tracking-wider text-[var(--foreground-muted)]">
              Dashboard
            </p>
            <p className="truncate text-sm font-semibold text-[var(--foreground)]">
              App Sales Core
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive =
              path === "/" ? pathname === "/" : pathname.startsWith(path);

            return (
              <li key={path}>
                <Link
                  href={path}
                  title={collapsed ? label : undefined}
                  className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--primary-soft)] text-[var(--primary-soft-foreground)]"
                      : "text-[var(--foreground-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[var(--primary)]" />
                  )}
                  <Icon className="h-[18px] w-[18px] shrink-0" />
                  {!collapsed && <span className="truncate">{label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-[var(--border)] p-3">
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--border)] py-2 text-xs font-medium text-[var(--foreground-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
        >
          {collapsed ? (
            <IoChevronForwardOutline className="h-4 w-4" />
          ) : (
            <>
              <IoChevronBackOutline className="h-4 w-4" />
              Colapsar
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
