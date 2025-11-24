import {ModulesList} from "../../../components/modules/ModulesList";
import type {Module} from "../../../core/interfaces";
import { useModules } from "../../../presentation/modules/useModules";
import { useEffect, useState } from "react";

export const StudentModules = () => {
  const [modulesList, setModulesList] = useState<Module[]>([]);
  const { modulesQuery } = useModules();

  useEffect(() => {
    if (modulesQuery.data) setModulesList(modulesQuery.data);
  }, [modulesQuery.data]);

  return <ModulesList modulesList={modulesList} route="students" />;
};
