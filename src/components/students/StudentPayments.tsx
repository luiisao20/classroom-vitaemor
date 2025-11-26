import type { Payment } from "../../core/interfaces";
import { getFormattedDate } from "../../helpers/get-date-formatted";

interface Props {
  payments: Payment[];
  admin?: boolean;
  loading?: boolean;

  onDelete?: (id: number, path: string) => void;
  onApprove?: (item: Payment) => void;
}

export const StudentPayments = ({
  payments,
  admin,
  loading,

  onDelete = () => {},
  onApprove = () => {},
}: Props) => {
  return (
    <div className="relative overflow-x-auto bg-modal shadow-xs rounded-base rounded-xl border border-secondary mt-6">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-primary text-white border-b border-secondary">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium">
              Subido en
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Aprobado en
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Estado
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Monto
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map((item, index) => (
            <tr
              key={index}
              className="bg-neutral-primary-soft border-b border-secondary"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap"
              >
                {getFormattedDate(`${item.createdAt}`, true)}
              </th>
              <th scope="row" className="px-6 py-4 whitespace-nowrap">
                {getFormattedDate(`${item.approvedAt}`, true) ?? "--"}
              </th>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <input
                    id={`table-checkbox-${index}`}
                    type="checkbox"
                    onChange={() => {}}
                    checked={item.status}
                    className="w-4 h-4 border border-default-medium rounded-xs focus:ring-0"
                  />
                  <label
                    htmlFor={`table-checkbox-${index}`}
                    className="sr-only"
                  >
                    Table checkbox
                  </label>
                </div>
              </td>
              <td className="px-6 py-4">{item.ammount ?? "--"}</td>
              <td className="px-3 py-4 flex justify-center gap-4">
                {admin ? (
                  <a
                    onClick={() => onApprove(item)}
                    className="font-medium text-blue-600 hover:underline cursor-pointer"
                  >
                    Aprobar
                  </a>
                ) : (
                  <>
                    <a
                      href={item.url}
                      target="_blank"
                      className="font-medium text-blue-600 hover:underline cursor-pointer"
                    >
                      Ir
                    </a>
                    {!item.status && (
                      <button
                        disabled={loading}
                        onClick={() => onDelete(item.id, item.path)}
                        className={`font-medium text-danger hover:underline cursor-pointer ${
                          loading && "cursor-progress"
                        }`}
                      >
                        Eliminar
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
