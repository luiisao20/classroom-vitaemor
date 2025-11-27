import { useEffect, useState } from "react";
import type { Module } from "../core/interfaces";
import { useModules } from "../presentation/modules/useModules";
import { ModulesList } from "../components/modules/ModulesList";

export const ModulesScreen = () => {
  const [modulesList, setModulesList] = useState<Module[]>([]);

  const { publicModulesQuery } = useModules();

  useEffect(() => {
    if (publicModulesQuery.data) setModulesList(publicModulesQuery.data);
  }, [publicModulesQuery.data]);

  return (
    <div>
      <h2 className="text-xl font-semibold text-center text-primary">
        Módulos habilitados
      </h2>
      {modulesList.length > 0 ? (
        <ModulesList modulesList={modulesList} route="module" />
      ) : (
        <p className="my-4">No existen módulos disponibles</p>
      )}
    </div>
  );
};
