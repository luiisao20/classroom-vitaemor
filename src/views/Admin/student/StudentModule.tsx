import type { SideRoute } from "../../../core/interfaces";
import { MdTask } from "react-icons/md";
import { BsUnion } from "react-icons/bs";
import { BreadCumbComponent } from "../../../components/navigation/BreadCumbComponent";
import { Outlet } from "react-router";

export const StudentModule = () => {
  const routes: SideRoute[] = [
    {
      name: "Examen",
      route: "exam",
      icon: <BsUnion size={25} />,
    },
    {
      name: "Tareas",
      route: "tasks",
      icon: <MdTask size={25} />,
    }
  ];
  return (
    <div>
      <BreadCumbComponent routes={routes} />
      <Outlet />
    </div>
  );
};
