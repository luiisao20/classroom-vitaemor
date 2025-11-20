import { Outlet, useParams } from "react-router";
import { useOneModule } from "../../../presentation/modules/useOneModule";
import { useEffect, useState } from "react";
import type { Module, SideRoute } from "../../../core/interfaces";
import { ButtonGoBack } from "../../../components/general/ButtonGoBack";
import { ToggleComponent } from "../../../components/input/ToggleComponent";
import { BreadCumbComponent } from "../../../components/navigation/BreadCumbComponent";
import { FaCheckSquare } from "react-icons/fa";
import { MdTask } from "react-icons/md";
import { BsUnion } from "react-icons/bs";

export const ModulesIndex = () => {
  const routes: SideRoute[] = [
    {
      name: "Información General",
      route: "info",
      icon: <FaCheckSquare size={25} />,
    },
    {
      name: "Tareas",
      route: "tasks",
      icon: <MdTask size={25} />,
    },
    {
      name: "Examen",
      route: "exam",
      icon: <BsUnion size={25} />,
    },
  ];

  const { id } = useParams();
  const moduleId = parseInt(`${id}`);
  const { moduleQuery, moduleUpdateMutation } = useOneModule(moduleId);
  const [dataModule, setDataModule] = useState<Module>();

  useEffect(() => {
    if (moduleQuery.data) setDataModule(moduleQuery.data);
  }, [moduleQuery.data]);
  return (
    <div className="relative">
      <ButtonGoBack />
      <h2 className="text-2xl text-center font-semibold text-text">
        Conferencia: {dataModule?.moduleNumber}
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="m-4">
          <h2 className="text-lg">
            <span className="font-semibold text-primary">Título:</span>{" "}
            {dataModule?.title}
          </h2>
        </div>
        <div className="flex items-center gap-4 mt-2 ml-4">
          <ToggleComponent
            id={`${id}`}
            checked={dataModule?.status ? dataModule.status : false}
            onChange={(value) => moduleUpdateMutation.mutate(value)}
            loading={moduleUpdateMutation.isPending}
          />
          <p className="font-semibold text-text-secondary">
            {dataModule?.status ? "Habilitado" : "Deshabilitado"}
          </p>
        </div>
      </div>
      <BreadCumbComponent routes={routes} />
      <Outlet />
    </div>
  );
};
