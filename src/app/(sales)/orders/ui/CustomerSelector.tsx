"use client";

import { searchOrderCustomers } from "@/src/actions";
import { useDebounce } from "@/src/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";

interface CustomerOption {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  documentNumber: string;
}

interface Props {
  selectedCustomerId?: string;
  selectedCustomerName?: string;
}

export const CustomerSelector = ({
  selectedCustomerId,
  selectedCustomerName,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce({ value: query, time: 400 });

  useEffect(() => {
    let active = true;

    if (!debouncedQuery?.trim()) {
      return;
    }

    searchOrderCustomers(debouncedQuery).then((response) => {
      if (active) {
        setCustomers(response);
      }
    });

    return () => {
      active = false;
    };
  }, [debouncedQuery]);

  const selectedLabel = useMemo(() => {
    if (!selectedCustomerId) return "";
    return selectedCustomerName ?? "Cliente seleccionado";
  }, [selectedCustomerId, selectedCustomerName]);

  const updateParams = (nextCustomerId?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextCustomerId) {
      params.set("customerId", nextCustomerId);
      params.set("page", "1");
    } else {
      params.delete("customerId");
      params.delete("page");
    }

    startTransition(() => {
      router.replace(`?${params.toString()}`);
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
        Cliente
      </p>
      <div className="relative">
        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          placeholder="Buscar cliente por nombre..."
          className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
        />
        {isOpen && query.trim() ? (
          <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden max-h-80 overflow-y-auto">
            {customers.length === 0 ? (
              <p className="text-sm text-gray-400 px-4 py-3">
                {isPending ? "Buscando..." : "Sin resultados"}
              </p>
            ) : (
              customers.map((customer) => (
                <button
                  key={customer.id}
                  onMouseDown={() => {
                    setIsOpen(false);
                    setQuery("");
                    updateParams(customer.id);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-b-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {customer.firstName} {customer.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {customer.email || "-"} | DOC | {customer.documentNumber}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        ) : null}
      </div>

      {selectedCustomerId ? (
        <div className="mt-3 flex items-center gap-3 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
              {selectedLabel}
            </p>
            <p className="text-xs text-green-700">Ordenes cargadas</p>
          </div>
          <button
            onClick={() => updateParams(undefined)}
            className="ml-auto w-7 h-7 rounded-md border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
            title="Limpiar seleccion"
          >
            <IoCloseOutline className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      ) : null}
    </div>
  );
};
