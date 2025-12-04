import type { ModuleExamGrade, StudentTaskGrade } from "../../core/interfaces";
import { getFormattedDate } from "../../helpers/get-date-formatted";
import { Link } from "react-router";

interface Props {
  examGrades: ModuleExamGrade[];
  tasksGrades?: StudentTaskGrade[];
  hideTasks?: boolean;
  idStudent?: string;
}

export const TableExamGrades = ({
  examGrades,
  tasksGrades,
  idStudent,
  hideTasks,
}: Props) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
      <h2 className="text-text-secondary font-semibold text-center my-3">
        Exámenes
      </h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Módulo
            </th>
            <th scope="col" className="px-6 py-3">
              Calificación
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha de calificación
            </th>
            {idStudent && (
              <th scope="col" className="px-6 py-3">
                Editar
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {examGrades.map((item, index) => (
            <tr key={index} className="bg-white border-b border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Módulo N° {item.module}
              </th>
              <td className="px-6 py-4 text-center">
                {item.grade?.toFixed(2) ?? "No completado"}
              </td>
              <td className="px-6 py-4">
                {getFormattedDate(`${item.createdAt}`) ?? "--"}
              </td>
              {idStudent && (
                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/home/admin/student/${idStudent}/module/${item.moduleId}/exam`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Ir
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {!hideTasks && (
        <div>
          <h2 className="text-text-secondary font-semibold text-center my-3">
            Tareas
          </h2>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Módulo
                </th>
                <th scope="col" className="px-6 py-3">
                  Tarea
                </th>
                <th scope="col" className="px-6 py-3">
                  Calificación
                </th>
                <th scope="col" className="px-6 py-3">
                  Editar
                </th>
              </tr>
            </thead>
            <tbody>
              {tasksGrades?.map((item, index) => (
                <tr key={index} className="bg-white border-b border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Módulo N° {item.moduleNumber}
                  </th>
                  <td className="px-6 py-4">{item.title}</td>
                  <td className="px-6 py-4 text-center">
                    {item.grade?.toFixed(2) ?? "No completado"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/home/admin/student/${idStudent}/module/${item.moduleId}/exam`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Ir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
