import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";

import { ButtonGoBack } from "../../../components/general/ButtonGoBack";
import type { Student } from "../../../core/interfaces";
import { useStudent } from "../../../presentation/user/useStudent";

export const StudentIndex = () => {
  const { id } = useParams();
  const [dataStudent, setDataStudent] = useState<Student>();

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
      </div>
      <Outlet />
    </div>
  );
};
