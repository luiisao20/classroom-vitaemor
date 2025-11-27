import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router";
import type { Module } from "../../core/interfaces";
import { Colors } from "../../assets/colors";

interface Props {
  modulesList: Module[];
  route: "module" | "generals" | "students";
  studentId?: string;
}

export const ModulesList = ({
  modulesList,
  route,
  studentId
}: Props) => {

  const getRouteType = (idModule: number) => {
    switch (route) {
      case "module":
        return `/home/module/${idModule}/info`;
      case "generals":
        return `/home/admin/module/${idModule}/info`;
      case "students":
        return `/home/admin/student/${studentId}/module/${idModule}/exam`;
    }
  };

  return (
    <div className="flex flex-col space-y-4 my-4 w-3/4 mx-auto">
      {modulesList.map((item) => (
        <div key={item.id}>
          <Link
            to={`${getRouteType(item.id!)}`}
            className="shadow rounded-xl cursor-pointer p-2 flex justify-between px-4 items-center
                hover:transition hover:delay-100 hover:scale-115 hover:shadow-secondary"
          >
            Módulo {item.moduleNumber}{" "}
            <GoArrowRight size={25} color={Colors.primary} />
          </Link>
        </div>
      ))}
    </div>
  );
};
