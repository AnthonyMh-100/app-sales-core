import React from "react";
import { IoLogoGithub, IoLogoLinkedin, IoMailOutline } from "react-icons/io5";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 ">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-white">Vendify</h2>
          <p className="text-sm text-gray-400">
            Sistema de gestión de ventas moderno
          </p>
        </div>

        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">
            Inicio
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Productos
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contacto
          </a>
        </div>

        <div className="flex gap-4 text-xl">
          <a
            href="#"
            className="hover:text-white transition-transform hover:scale-110"
          >
            <IoLogoGithub />
          </a>
          <a
            href="#"
            className="hover:text-white transition-transform hover:scale-110"
          >
            <IoLogoLinkedin />
          </a>
          <a
            href="#"
            className="hover:text-white transition-transform hover:scale-110"
          >
            <IoMailOutline />
          </a>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center text-sm py-4 text-gray-500">
        © {new Date().getFullYear()} Vendify. Todos los derechos reservados.
      </div>
    </footer>
  );
};
