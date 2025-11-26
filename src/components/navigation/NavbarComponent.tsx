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
import { Link, NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import { useUser } from "../../presentation/user/useUser";

export const NavbarComponent = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData>();

  const { user, logout } = useAuthStore();

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
            <Link to="profile/grades">Calificaciones</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="profile/payments">Pagos</Link>
          </DropdownItem>
          <DropdownDivider />
          <button
            className="cursor-pointer text-text-secondary py-2 px-4"
            onClick={async () => {
              await logout();
              navigate("/");
            }}
          >
            Cerrar sesión
          </button>
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
