import { FaCircleXmark } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

import type { StudentAssistance } from "../../core/interfaces";
import { getFormattedDate } from "../../helpers/get-date-formatted";
import {Colors} from "../../assets/colors";

interface Props {
  assistance: StudentAssistance[];
}

export const StudentAssistanceComponent = ({ assistance }: Props) => {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3">
                Módulo / Reunión
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Asistió
              </th>
            </tr>
          </thead>
          <tbody>
            {assistance.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b border-gray-200 hover:bg-gray-50"
              >
                <th
                  scope="row"
                  className="px-3 py-4 font-medium whitespace-nowrap"
                >
                  Módulo {item.moduleNumber} / {item.number}
                </th>
                <td className="px-6 py-4">
                  {getFormattedDate(`${item.date}`, true)}
                </td>
                <td className="px-6 py-4 flex justify-center">
                  {item.status ? (
                    <FaCheckCircle size={20} color={Colors.success} />
                  ) : (
                    <FaCircleXmark size={20} color={Colors.danger} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
