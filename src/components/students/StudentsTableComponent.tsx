import { IoSearchOutline } from "react-icons/io5";
import type { Student } from "../../core/interfaces";
import { FaUserGraduate } from "react-icons/fa6";
import { Colors } from "../../assets/colors";
import { Link } from "react-router";

interface Props {
  students: Student[];
  search: string;

  onChangeSearch: (text: string) => void;
}

export const StudentsTableComponent = ({
  students,
  search,
  onChangeSearch,
}: Props) => {
  const goRoute = (id: string): string => {
    return `/home/admin/student/${id}`;
  };

  return (
    <div>
      <h2 className="text-center font-bold my-6 text-xl text-primary">
        Listado de estudiantes
      </h2>
      <div className="max-w-md mx-auto mb-6">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <IoSearchOutline className="w-6 h-6 text-gray-500" />
          </div>
          <input
            value={search}
            onChange={(e) => onChangeSearch && onChangeSearch(e.target.value)}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 border border-text-secondary/60 rounded-xl text-2xl text-gray-900 focus:ring-0 bg-gray-50 focus:outline-none"
            placeholder="Busca por nombres o apellidos"
            required
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Estudiante
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={index}
                className="bg-white border-b border-gray-200 hover:bg-gray-50"
              >
                <td
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  <FaUserGraduate
                    className="w-10 h-10 bg-secondary/10 rounded-full"
                    color={Colors.secondary}
                  />
                  <div className="ps-3">
                    <div className="text-xs font-semibold">
                      {student.lastName} {student.firstName}
                    </div>
                    <div className="font-normal text-xs text-gray-500">
                      {student.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={goRoute(student.id!)}
                    className="font-medium text-xs text-primary hover:underline"
                  >
                    Ingresar
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
