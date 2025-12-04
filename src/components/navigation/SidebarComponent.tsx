import { NavLink } from "react-router";
import { MdLogout } from "react-icons/md";
import type { SideRoute } from "../../core/interfaces";

interface Props {
  routes: SideRoute[];
  title?: string;
  profile?: boolean;
  loadingLogout?: boolean;

  onLogout?: () => void;
}

export const SidebarComponent = ({
  routes,
  title,
  profile,
  loadingLogout,

  onLogout,
}: Props) => {
  return (
    <aside
      id="default-sidebar"
      className="fixed md:top-[60px] top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full md:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        {title && (
          <h2 className="self-center mb-4 text-primary text-xl font-semibold whitespace-nowrap">
            {title}
          </h2>
        )}
        <ul className="space-y-2 font-medium">
          {routes.map((item, index) => (
            <NavLink
              key={index}
              to={item.route}
              className={({ isActive }) =>
                `flex items-center rounded-xl p-2 shadow hover:transition hover:delay-100 hover:scale-105 ${
                  isActive && "shadow-secondary"
                }`
              }
            >
              {item.icon}
              <span className="flex-1 ms-3 whitespace-nowrap">{item.name}</span>
            </NavLink>
          ))}
          {profile && (
            <button
              disabled={loadingLogout}
              onClick={onLogout}
              className={`flex w-full items-center justify-start rounded-xl p-2 shadow hover:transition hover:delay-100 hover:scale-105 cursor-pointer ${
                loadingLogout && "cursor-progress"
              }`}
            >
              <MdLogout size={25} />
              <p className="flex-1 ms-3 whitespace-nowrap text-justify">
                Cerrar sesión
              </p>
            </button>
          )}
        </ul>
      </div>
    </aside>
  );
};
