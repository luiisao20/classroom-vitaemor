import { Outlet } from "react-router";
import { BsPersonFillGear } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineGrade } from "react-icons/md";
import { PiContactlessPaymentFill } from "react-icons/pi";

import { SidebarComponent } from "../../components/navigation/SidebarComponent";
import type { SideRoute } from "../../core/interfaces";

export const IndexProfile = () => {
  const routes: SideRoute[] = [
    {
      name: "Perfil",
      route: "/home/profile/main",
      icon: <BsPersonFillGear size={25} />,
    },
    {
      name: "Contraseña",
      route: "/home/profile/password",
      icon: <RiLockPasswordFill size={25} />,
    },
    {
      name: "Calificaciones",
      route: "grades",
      icon: <MdOutlineGrade size={25} />,
    },
    {
      name: "Pagos",
      route: "payments",
      icon: <PiContactlessPaymentFill size={25} />,
    },
  ];

  return (
    <div>
      <SidebarComponent profile routes={routes} />
      <Outlet />
    </div>
  );
};
