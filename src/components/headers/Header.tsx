"use client";

import { userLogout } from "@/src/actions/login/user-logout";
import Link from "next/link";
import React, { useRef, useState } from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  return (
    <header className="w-full border-b px-4 py-3 sm:px-6 border-none bg-green-200/40">
      <div className="mx-auto px-12  flex w-full max-w-7/12xl justify-between ">
        <Link href="/" className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg font-bold text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            AS
          </div>
          <div className="leading-tight">
            <p className="text-xs uppercase tracking-[0.2em]">Dashboard</p>
            <h1 className="text-base font-semibold">App Sales Core</h1>
          </div>
        </Link>

        <div
          className="relative cursor-pointer"
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
            className="bg-white cursor-pointer flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition hover:opacity-90"
            aria-haspopup="menu"
            aria-expanded={isOpen}
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
            Anthony
            <span style={{ color: "#64748b" }}>{isOpen ? "^" : "v"}</span>
          </button>

          {isOpen ? (
            <div
              role="menu"
              className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-lg border shadow-lg"
              style={{ borderColor: "#e2e8f0", backgroundColor: "#ffffff" }}
            >
              <button
                type="button"
                role="menuitem"
                className="w-full px-4 py-2 text-left text-sm transition hover:bg-slate-50"
              >
                Ver perfil
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => userLogout()}
                className="w-full border-t px-4 py-2 text-left text-sm transition hover:bg-amber-50"
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};
