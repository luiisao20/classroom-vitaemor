import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { FaHome } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2";
import { BiTask } from "react-icons/bi";

import type { ModuleInfo, SideRoute } from "../../core/interfaces";
import { SidebarComponent } from "../../components/navigation/SidebarComponent";
import { useOneModule } from "../../presentation/modules/useOneModule";

export const ModuleStudentIndex = () => {
  const { id } = useParams();
  const moduleId = parseInt(id!);
  const [moduleData, setModuleData] = useState<ModuleInfo>();

  const { moduleInfoQuery } = useOneModule(moduleId);

  const routes: SideRoute[] = [
    {
      name: "Inicio",
      route: 'info',
      icon: <FaHome size={25} />,
    },
    {
      name: "Trabajos sincrónicos",
      route: 'tasks',
      icon: <BiTask size={25} />,
    },
    {
      name: "Evaluación",
      route: 'exam',
      icon: <HiPencilSquare size={25} />,
    },
  ];

  useEffect(() => {
    if (moduleInfoQuery.data) setModuleData(moduleInfoQuery.data);
  }, [moduleInfoQuery.data]);

  return (
    <div>
      <SidebarComponent
        title={`Módulo ${moduleData?.moduleNumber}`}
        routes={routes}
      />
      <Outlet />
    </div>
  );
};
