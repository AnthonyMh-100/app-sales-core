import { getCategries } from "@/src/actions";
import { auth } from "@/src/auth.config";
import {
  IoBusinessOutline,
  IoCallOutline,
  IoLocationOutline,
  IoMailOutline,
  IoSaveOutline,
} from "react-icons/io5";
import { ContainerCategory } from "./ui/ContainerCategory";

export const ConfigurationsPage = async () => {
  const session = await auth();
  const companyId = session?.user?.id || "";

  const { categories = [] } = await getCategries(companyId);

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 md:px-16">
      <div className="mb-6">
        <p className="text-gray-500 text-sm">Sistema</p>
        <h1 className="text-2xl font-semibold text-gray-800">Configuración</h1>
      </div>

      <div className="flex flex-col gap-6">
        <ContainerCategory categories={categories} />

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-5">
            Datos de la empresa
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                <span className="text-white text-lg font-semibold">TS</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Tech Store SAC
                </p>
                <p className="text-xs text-gray-400">TS-001</p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Nombre de la empresa
              </label>
              <div className="relative">
                <IoBusinessOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  defaultValue="Tech Store SAC"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Correo electrónico
              </label>
              <div className="relative">
                <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  defaultValue="contacto@techstore.pe"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
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
                    type="text"
                    defaultValue="01-234-5678"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
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
                    type="text"
                    defaultValue="Av. Javier Prado 123"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
                <IoSaveOutline className="w-4 h-4" />
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationsPage;
