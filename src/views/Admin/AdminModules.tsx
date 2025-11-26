import { FaBook } from "react-icons/fa";
import { ModalCreateModule } from "../../components/modal/ModalCRUD";
import { useEffect, useState } from "react";
import type { Module } from "../../core/interfaces";
import { useModules } from "../../presentation/modules/useModules";
import { ModulesList } from "../../components/modules/ModulesList";

export const AdminModules = () => {
  const [modulesList, setModulesList] = useState<Module[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { modulesQuery, modulesMutation } = useModules();

  useEffect(() => {
    if (modulesQuery.data) setModulesList(modulesQuery.data);
  }, [modulesQuery.data]);

  return (
    <div>
      <ModalCreateModule
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSendData={async(module) => {
          await modulesMutation.mutateAsync({
            moduleNumber: parseInt(module.moduleNumber),
            title: module.title,
          });
        }}
        loading={modulesMutation.isPending}
      />
      <h2 className="text-xl font-semibold text-center">
        Vista de los módulos
      </h2>
      <div className="flex justify-between items-center px-10">
        <h2 className="text-sm">¿Deseas crear un nuevo módulo?</h2>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center bg-primary text-white rounded-xl p-2 gap-2 cursor-pointer hover:bg-primary/60"
        >
          <FaBook size={20} />
          <span className="text-sm">Añadir</span>
        </button>
      </div>
      {modulesList.length > 0 ? (
        <ModulesList modulesList={modulesList} route="generals" generals />
      ) : (
        <p className="my-4">No existen módulos creados</p>
      )}
    </div>
  );
};
