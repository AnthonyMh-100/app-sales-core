"use client";
import { generateSale, searchCustomer, searchProducts } from "@/src/actions";
import { useDebounce } from "@/src/hooks";
import { formatCurrency } from "@/src/utils/utils";
import React, { useEffect, useState } from "react";
import {
  IoSearchOutline,
  IoTrashOutline,
  IoAddOutline,
  IoRemoveOutline,
} from "react-icons/io5";
import Swal from "sweetalert2";

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  documentNumber: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  price: number;
  stock: number;
  tax: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type MethodType = "CASH" | "CARD" | "TRANSFER";
export type PaymentMethod = "Transferencia" | "Efectivo" | "Tarjeta";

const PAYMENT: Record<PaymentMethod, MethodType> = {
  Efectivo: "CASH",
  Tarjeta: "CARD",
  Transferencia: "TRANSFER",
};

const paymentMethods: PaymentMethod[] = [
  "Efectivo",
  "Tarjeta",
  "Transferencia",
];

const TAX_PRODUCT = 0.18;

export const SalesPage = () => {
  const [clientSearch, setClientSearch] = useState("");
  const [listCustomers, setLisCustomers] = useState<Client[] | null>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientList, setShowClientList] = useState(false);

  const [productSearch, setProductSearch] = useState("");
  const [listProducts, setListProducts] = useState<Product[] | null>([]);
  const [showProductList, setShowProductList] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Efectivo");

  const searchValue = useDebounce({ value: clientSearch });
  const searchValueProduct = useDebounce({ value: productSearch });

  useEffect(() => {
    if (!searchValueProduct?.trim()) {
      setListProducts([]);
      setShowProductList(false);
      return;
    }

    searchProducts(searchValueProduct).then((responseProducts) =>
      setListProducts(responseProducts as Product[]),
    );

    console.log({ searchValueProduct });
  }, [searchValueProduct]);

  useEffect(() => {
    if (!searchValue?.trim()) {
      setLisCustomers([]);
      setShowClientList(false);
      return;
    }

    searchCustomer(searchValue).then((responseCustomer) =>
      setLisCustomers(responseCustomer as Client[]),
    );
  }, [searchValue]);

  const handleAddProduct = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id && item.quantity < product.stock
            ? {
                ...item,
                quantity: item.quantity + 1,
                tax: TAX_PRODUCT,
              }
            : item,
        );
      }
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          tax: TAX_PRODUCT,
          customerId: selectedClient?.id,
        },
      ];
    });
    setProductSearch("");
    setShowProductList(false);
  };

  const handleChangeQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemove = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const igv = subtotal * TAX_PRODUCT;
  const total = subtotal + igv;
  const canSubmit = selectedClient && cart.length > 0;

  const getClientInitials = (firstName: string, lastName: string) => {
    const first = firstName?.trim()?.charAt(0) ?? "";
    const last = lastName?.trim()?.charAt(0) ?? "";
    return `${first}${last}`.toUpperCase();
  };

  const handleGenerateSale = async () => {
    const saleOrder = {
      cart,
      payment: PAYMENT[paymentMethod],
      customerId: selectedClient!.id,
      total,
      subtotal,
    };

    const sale = await generateSale(saleOrder);

    if (sale?.ok) {
      await Swal.fire({
        icon: "success",
        title: "Venta realizada",
        text: "La venta se registró correctamente.",
        confirmButtonText: "Aceptar",
        timer: 2500,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 md:px-16">
      <div className="mb-6">
        <p className="text-gray-500 text-sm">Gestión</p>
        <h1 className="text-2xl font-semibold text-gray-800">Nueva venta</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
              Cliente
            </p>
            <div className="relative">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar cliente por nombre o correo..."
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                onFocus={() => setShowClientList(true)}
                onBlur={() => setTimeout(() => setShowClientList(false), 150)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
              />
              {showClientList && clientSearch && (
                <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden max-h-80 overflow-y-scroll">
                  {!listCustomers?.length && searchValue ? (
                    <p className="text-sm text-gray-400 px-4 py-3">
                      Sin resultados
                    </p>
                  ) : (
                    listCustomers?.map((client) => (
                      <button
                        key={client.id}
                        onMouseDown={() => {
                          setShowClientList(false);
                          setSelectedClient(client);
                          setClientSearch("");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-b-0"
                      >
                        <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-semibold shrink-0 ring-1 ring-green-200">
                          {getClientInitials(client.firstName, client.lastName)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800">
                            {client.firstName} {client.lastName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {client.email} {" | "} DOC {" | "}{" "}
                            {client.documentNumber}
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
            {selectedClient && (
              <div className="flex items-center gap-3 mt-3 p-3 bg-green-50 border border-green-100 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-semibold shrink-0 ring-1 ring-green-200">
                  {getClientInitials(
                    selectedClient.firstName,
                    selectedClient.lastName,
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800">
                    {selectedClient.firstName} {selectedClient.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {selectedClient.email} {" | "} DOC {" | "}{" "}
                    {selectedClient.documentNumber}
                  </p>
                </div>
                <span className="ml-auto text-xs text-green-700 bg-green-100 px-2.5 py-1 rounded-full font-medium">
                  Seleccionado
                </span>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
              Agregar producto
            </p>
            <div className="relative">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar producto por nombre o categoría..."
                value={productSearch}
                onChange={(e) => {
                  setProductSearch(e.target.value);
                  setShowProductList(true);
                }}
                onFocus={() => setShowProductList(true)}
                onBlur={() => setTimeout(() => setShowProductList(false), 150)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
              />
              {showProductList && productSearch && (
                <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                  {!listProducts?.length && searchValueProduct ? (
                    <p className="text-sm text-gray-400 px-4 py-3">
                      Sin resultados
                    </p>
                  ) : (
                    listProducts?.map((product) => (
                      <button
                        key={product.id}
                        onMouseDown={() => handleAddProduct(product)}
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {product.category} · Stock: {product.stock}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-green-700 ml-4">
                          S/. {product.price.toFixed(2)}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-400 uppercase tracking-wide">
                      Producto
                    </th>
                    <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-400 uppercase tracking-wide">
                      Precio unit.
                    </th>
                    <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-400 uppercase tracking-wide">
                      Cantidad
                    </th>
                    <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-400 uppercase tracking-wide">
                      Subtotal
                    </th>
                    <th className="px-3 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {cart.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center text-sm text-gray-400 py-8"
                      >
                        Aún no hay productos agregados
                      </td>
                    </tr>
                  ) : (
                    cart.map((item, i) => (
                      <tr
                        key={item.id}
                        className={
                          i < cart.length - 1 ? "border-b border-gray-50" : ""
                        }
                      >
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#0f6e56"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                {item.category}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-600">
                          {formatCurrency(item.price)}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleChangeQuantity(item.id, -1)}
                              className="cursor-pointer w-6 h-6 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                              <IoRemoveOutline className="w-3 h-3 text-gray-500" />
                            </button>
                            <span className="text-sm font-medium text-gray-800 w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleChangeQuantity(item.id, 1)}
                              disabled={item.quantity >= item.stock}
                              className="cursor-pointer w-6 h-6 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              <IoAddOutline className="w-3 h-3 text-gray-500" />
                            </button>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-sm font-medium text-gray-800">
                          {formatCurrency(item.price * item.quantity)}
                        </td>
                        <td className="px-3 py-3">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="w-7 h-7 cursor-pointer flex items-center justify-center rounded-md border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors"
                          >
                            <IoTrashOutline className="w-3.5 h-3.5 text-red-400" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
              Método de pago
            </p>
            <div className="flex flex-col gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    paymentMethod === method
                      ? "bg-green-50 border-green-300 text-green-700"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
              Resumen
            </p>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>S/. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>IGV (18%)</span>
                <span>S/. {igv.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 pt-2.5 flex justify-between text-base font-semibold text-gray-800">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <button
                disabled={!canSubmit}
                onClick={handleGenerateSale}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
              >
                Generar venta
              </button>
              <button
                onClick={() => {
                  setCart([]);
                  setSelectedClient(null);
                  setClientSearch("");
                  setPaymentMethod("Efectivo");
                }}
                className="w-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-medium py-2.5 rounded-lg transition-colors"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
