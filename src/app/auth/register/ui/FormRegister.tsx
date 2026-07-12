"use client";
import { userRegister } from "@/src/actions";
import Link from "next/link";

import React, { useActionState, useState } from "react";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoLockClosedOutline,
  IoPersonOutline,
  IoBusinessOutline,
  IoCallOutline,
  IoLocationOutline,
  IoKeypadOutline,
  IoMailUnreadOutline,
} from "react-icons/io5";

export const FormRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, pending] = useActionState(userRegister, null);

  console.log("stateee-------------", state);
  console.log("pending-------------", pending);

  return (
    <>
      <div className="w-full max-w-sm relative z-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            Crear cuenta
          </h2>
          <p className="text-gray-400 text-sm">
            Completa los datos de tu empresa
          </p>
        </div>

        <form
          action={action}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 shadow-sm"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Nombre de la empresa <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <IoBusinessOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="name"
                  type="text"
                  placeholder="Tech Store SAC"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Codigo Empresa <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <IoKeypadOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="code"
                  type="text"
                  placeholder="Tech Store SAC"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Usuario <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <IoPersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="username"
                  type="text"
                  required
                  placeholder="admin"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Correo <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <IoMailUnreadOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="admin@example.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Teléfono
                </label>
                <div className="relative">
                  <IoCallOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="phone"
                    type="text"
                    required
                    placeholder="01-234-5678"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Dirección
                </label>
                <div className="relative">
                  <IoLocationOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    required
                    name="address"
                    type="text"
                    placeholder="Av. Lima 123"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors placeholder:text-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Contraseña <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-10 py-2.5 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="w-4 h-4" />
                  ) : (
                    <IoEyeOutline className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              // disabled={!canSubmit}
              type="submit"
              className="w-full mt-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
            >
              Crear cuenta
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-gray-400 mt-5">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/auth/login"
            className="text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </>
  );
};
