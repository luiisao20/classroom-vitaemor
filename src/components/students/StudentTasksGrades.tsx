import type { StudentGradeTask } from "../../core/interfaces";

interface Props {
  grades: StudentGradeTask[];
}
export const StudentTasksGrades = ({ grades }: Props) => {
  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tarea
            </th>
            <th scope="col" className="px-6 py-3">
              Archivo
            </th>
            <th scope="col" className="px-6 py-3">
              Calificación
            </th>
            <th scope="col" className="px-6 py-3">
              Comentarios
            </th>
          </tr>
        </thead>
        <tbody>
          {grades.map((item, index) => (
            <tr key={index} className="bg-white border-b border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {item.title}
              </th>
              <td className="px-6 py-4 text-center">
                {item.fileName ? (
                  <a
                    href={item.url}
                    target="_blank"
                    className="cursor-pointer hover:underline"
                  >
                    {item.fileName}
                  </a>
                ) : (
                  "No hay archivo disponible"
                )}
              </td>
              <td className="px-6 py-4">{item.grade?.toFixed(2) ?? "--"}</td>
              <td className="px-6 py-4">{item.feedback ?? "--"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
