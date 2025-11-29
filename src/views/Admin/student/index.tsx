import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";

import { ButtonGoBack } from "../../../components/general/ButtonGoBack";
import type { Student } from "../../../core/interfaces";
import { useStudent } from "../../../presentation/user/useStudent";
import { ArrowRightIcon } from "flowbite-react";

export const StudentIndex = () => {
  const { id } = useParams();
  const [dataStudent, setDataStudent] = useState<Student>();

  const navigate = useNavigate();
  const location = useLocation().pathname.split("/").at(-1);

  const { studentQuery } = useStudent(id!);

  useEffect(() => {
    if (studentQuery.data) setDataStudent(studentQuery.data);
  }, [studentQuery.data]);

  return (
    <div className="relative">
      <ButtonGoBack />
      <h2 className="text-2xl font-bold text-center text-priamry">
        Vista del estudiante
      </h2>
      <div className="my-4 mx-6 flex flex-col space-y-2">
        <h2 className="text-base">
          <span className="font-semibold">Nombres:</span>{" "}
          {dataStudent?.lastName} {dataStudent?.firstName}
        </h2>
        <h2 className="text-base">
          <span className="font-semibold">Correo electrónico:</span>{" "}
          {dataStudent?.email}
        </h2>
        <button
          onClick={() =>
            location === "modules" ? navigate("meetings") : navigate("modules")
          }
          className="place-self-start hover:underline cursor-pointer font-semibold flex justify-center items-center text-primary gap-2"
        >
          {location === "modules" ? "Ver asistencias" : "Ver módulos"}
          <ArrowRightIcon className="text-xl" />
        </button>
      </div>
      <Outlet />
    </div>
  );
};
