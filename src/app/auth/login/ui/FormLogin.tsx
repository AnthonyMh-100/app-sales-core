"use client";

import { userLogin } from "@/src/actions/login/user-login";
import Link from "next/link";
import React, { useActionState, useState } from "react";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoLockClosedOutline,
  IoMailOutline,
} from "react-icons/io5";

export const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, pending] = useActionState(userLogin, null);

  console.log({ state, pending });

  return (
    <div className="w-full max-w-sm relative z-10">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          Bienvenido
        </h2>
        <p className="text-gray-400 text-sm">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      <form
        action={action}
        className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 shadow-sm"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Correo electrónico
            </label>
            <div className="relative">
              <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="tu@correo.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors placeholder:text-gray-300"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Contraseña
              </label>
              <button className="text-xs text-green-600 hover:text-green-700 transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className="relative">
              <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                name="password"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-10 py-2.5 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors placeholder:text-gray-300"
              />
              <button
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

          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 accent-green-500 cursor-pointer"
            />
            <label
              htmlFor="remember"
              className="text-sm text-gray-500 cursor-pointer select-none"
            >
              Mantener sesión iniciada
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
          >
            Iniciar sesión
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">o continúa con</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-lg transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar con Google
          </button>
        </div>
      </form>

      <p className="text-center text-xs text-gray-400 mt-5">
        ¿No tienes una cuenta?{" "}
        <Link
          href="/auth/register"
          className="text-green-600 hover:text-green-700 font-medium transition-colors"
        >
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
};
