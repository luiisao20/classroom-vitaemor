import { Outlet } from "react-router";

import { IoIosCreate } from "react-icons/io";
import { PiContactlessPaymentFill, PiStudentBold } from "react-icons/pi";
import { MdOutlineGrade } from "react-icons/md";
import { TiWarningOutline } from "react-icons/ti";

import { SidebarComponent } from "../../components/navigation/SidebarComponent";
import type { SideRoute } from "../../core/interfaces";

export const AdminIndex = () => {
  const routes: SideRoute[] = [
    {
      name: "Módulos",
      route: "/home/admin/modules",
      icon: <IoIosCreate size={25} />,
    },
    {
      name: "Estudiantes",
      route: "/home/admin/students",
      icon: <PiStudentBold size={25} />,
    },
    {
      name: "Calificaciones",
      route: "/home/admin/grades",
      icon: <MdOutlineGrade size={25} />,
    },
    {
      name: "Avisos",
      route: "/home/admin/ads",
      icon: <TiWarningOutline size={25} />,
    },
    {
      name: "Pagos",
      route: "/home/admin/payments",
      icon: <PiContactlessPaymentFill size={25} />,
    },
  ];
  return (
    <>
      <SidebarComponent routes={routes} />
      <Outlet />
    </>
  );
};
