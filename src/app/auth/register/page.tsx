import Link from "next/link";
import React from "react";
import { FormRegister } from "./ui/FormRegister";

export const RegisterPage = () => {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden bg-gray-900">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 60%, #052e16 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #86efac 1px, transparent 0)`,
            backgroundSize: "36px 36px",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #22c55e 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #4ade80 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex flex-col gap-5 mb-14">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-medium tracking-wide">
                Registro gratuito
              </span>
            </div>
            <h1 className="text-4xl font-semibold text-white leading-tight">
              Empieza a gestionar
              <br />
              <span className="text-green-400">desde hoy.</span>
            </h1>
            <p className="text-green-100/40 text-sm leading-relaxed max-w-sm">
              Crea tu cuenta en segundos y accede a todas las herramientas que
              necesitas para controlar tu negocio.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { label: "Gestión de usuarios y roles" },
              { label: "Control de productos e inventario" },
              { label: "Registro y seguimiento de ventas" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0">
                  <span className="text-green-400 text-xs">✓</span>
                </div>
                <p className="text-green-100/50 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-green-100/20 text-xs">
            © 2026 App Sales Core. Todos los derechos reservados.
          </p>
        </div>
      </div>

      <div
        className="w-full lg:w-1/2 flex items-center justify-center p-8 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #f0fdf4 0%, #f9fafb 50%, #f0f0f0 100%)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-2/3 h-full opacity-30"
          style={{
            background:
              "linear-gradient(135deg, transparent 45%, #dcfce7 45%, #bbf7d0 55%, transparent 55%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-20"
          style={{
            background:
              "linear-gradient(315deg, transparent 40%, #dcfce7 40%, #bbf7d0 50%, transparent 50%)",
          }}
        />
        <FormRegister />
      </div>
    </div>
  );
};

export default RegisterPage;
