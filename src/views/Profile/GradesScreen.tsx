import { MdTask } from "react-icons/md";
import type { SideRoute } from "../../core/interfaces";
import { BsUnion } from "react-icons/bs";
import { BreadCumbComponent } from "../../components/navigation/BreadCumbComponent";
import { Outlet } from "react-router";

export const GradesScreen = () => {
  const routes: SideRoute[] = [
    {
      name: "Tareas",
      route: "tasks",
      icon: <MdTask size={25} />,
    },
    {
      name: "Examen",
      route: "exams",
      icon: <BsUnion size={25} />,
    },
  ];
  return (
    <div>
      <h2 className="font-semibold text-primary text-center text-xl mb-6">
        Sección de calificaciones
      </h2>
      <BreadCumbComponent routes={routes} />
      <div className="my-6">
        <Outlet />
      </div>
    </div>
  );
};
