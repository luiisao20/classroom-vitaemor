import { NavLink } from "react-router";
import type { SideRoute } from "../../core/interfaces";
import { IoIosArrowForward } from "react-icons/io";

interface Props {
  routes: SideRoute[];
}

export const BreadCumbComponent = ({ routes }: Props) => {
  return (
    <nav className="flex justify-center" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {routes.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            <div className="flex items-center">
              {index !== 0 && (
                <IoIosArrowForward size={18} className="text-gray-400 mx-1" />
              )}
              <NavLink
                to={item.route}
                className={({ isActive }) =>
                  `inline-flex items-center text-sm font-medium text-gray-700 ${
                    isActive && "text-primary"
                  }`
                }
              >
                <div className="mr-2">{item.icon}</div>
                {item.name}
              </NavLink>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
