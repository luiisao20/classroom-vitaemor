import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import type { UserData } from "../../core/auth/interface";
import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import { useUser } from "../../presentation/user/useUser";

export const NavbarComponent = () => {
  const [userData, setUserData] = useState<UserData>();

  const { user } = useAuthStore();

  const { userQuery } = useUser(user?.id);

  useEffect(() => {
    if (userQuery.data) setUserData(userQuery.data);
  }, [userQuery.data]);

  return (
    <Navbar fluid className="bg-primary">
      <h2 className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        VITAEMOR
      </h2>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={true}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">
              {userData?.lastName} {userData?.firstName}
            </span>
            <span className="block truncate text-sm font-medium">
              {user?.email}
            </span>
          </DropdownHeader>
          <DropdownItem>
            <Link to="profile/main">Perfil</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="profile/password">Contraseña</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="">Calificaciones</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="">Pagos</Link>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem>
            <Link to="">Cerrar sesión</Link>
          </DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavLink to="/home" className={"text-text hover:text-modal"}>
          Inicio
        </NavLink>
        <NavLink
          to="/modules"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-text hover:text-modal"
          }
        >
          Módulos
        </NavLink>
        <NavLink
          to="/modules"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-text hover:text-modal"
          }
        >
          Biblioteca
        </NavLink>
        {userData?.isAdmin && (
          <NavLink
            to="admin/modules"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-text hover:text-modal"
            }
          >
            Administrador
          </NavLink>
        )}
      </NavbarCollapse>
    </Navbar>
  );
};
