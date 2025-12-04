import { FaUserGraduate } from "react-icons/fa6";
import type { StudentGradeExam } from "../../core/interfaces";
import { Colors } from "../../assets/colors";
import { Link } from "react-router";

interface Props {
  grades?: boolean;
  tasks?: boolean;
  idModule: number;
  students: StudentGradeExam[];
}

export const StudentGradesGeneral = ({ tasks, students, idModule }: Props) => {
  const goRoute = (id: string): string => {
    if (tasks) return `/home/admin/student/${id}/module/${idModule}/tasks`;
    return `/home/admin/student/${id}/module/${idModule}/exam`;
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Estudiante
              </th>
              <th scope="col" className="px-6 py-3">
                Calificación
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="bg-white border-b border-gray-200 hover:bg-gray-50"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  <FaUserGraduate
                    className="w-10 h-10 bg-secondary/10 rounded-full"
                    color={Colors.secondary}
                  />
                  <div className="ps-3">
                    <div className="text-sm font-semibold">
                      {student.lastName} {student.firstName}
                    </div>
                    <div className="font-normal text-sm text-gray-500">
                      {student.email}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4 text-sm font-semibold">
                  {student.grade?.toFixed(2) ?? "No completado"}
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={goRoute(student.id!)}
                    className="font-medium text-sm text-primary hover:underline"
                  >
                    Calificar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
