import { Outlet } from "react-router";
import { BreadCumbComponent } from "../../../components/navigation/BreadCumbComponent";
import type { SideRoute } from "../../../core/interfaces";
import { PiStudentBold, PiVideoConferenceFill } from "react-icons/pi";
import { BiTask } from "react-icons/bi";

export const AdminGradesIndex = () => {
  const routes: SideRoute[] = [
    {
      name: "Estudiantes",
      route: "students",
      icon: <PiStudentBold size={25} />,
    },
    {
      name: "Exámenes",
      route: "exams",
      icon: <PiVideoConferenceFill size={25} />,
    },
    {
      name: "Tareas",
      route: "tasks",
      icon: <BiTask size={25} />,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl mb-2 font-bold text-center text-primary">
        Vista de calificaciones
      </h2>
      <h2 className="text-lg font-semibold mb-5 text-text-secondary">
        Escoje una opción para revisar las módulos, tareas o estudiantes
      </h2>
      <BreadCumbComponent routes={routes} />
      <div className="my-6">
        <Outlet />
      </div>
    </div>
  );
};
