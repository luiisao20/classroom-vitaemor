import { IoClose } from "react-icons/io5";
import { ModalComponent } from "./ModalComponent";
import type { Payment } from "../../core/interfaces";
import { getFormattedDate } from "../../helpers/get-date-formatted";
import { InputComponent } from "../input/InputComponent";
import { useState } from "react";

interface Props {
  open: boolean;
  loading?: boolean;
  item?: Payment;

  onClose: () => void;
  onSendData?: (ammount: string) => void;
}

export const ModalPayment = ({
  open,
  loading,
  item,

  onClose,
  onSendData = () => {},
}: Props) => {
  const [mount, setMount] = useState<string>("");
  const regex = /^-?\d+(\.\d+)?$/;

  return (
    <ModalComponent open={open} onClose={onClose}>
      <div className="relative bg-white rounded-lg shadow-sm">
        <div className="relative p-4 w-full max-h-full">
          <div className="p-4 md:p-5 border-b w-full mb-4 rounded-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Aprobar el pago
            </h3>
          </div>
          <button
            type="button"
            className="text-gray-400 cursor-pointer bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center absolute top-4 right-4"
            onClick={onClose}
          >
            <IoClose
              size={30}
              className="transition-all duration-200 hover:rotate-90"
            />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="flex flex-col gap-6 w-[20rem]">
            <h2>
              Ver comprobante de pago:{" "}
              <a
                href={item?.url}
                target="_blank"
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Ir
              </a>
            </h2>
            <h2>
              <span className="font-semibold">Fecha de subida:</span>{" "}
              {getFormattedDate(`${item?.createdAt}`, true)}
            </h2>
            <InputComponent
              label="Escribe el monto del pago"
              text={mount}
              onChangeText={setMount}
              id="mount"
              type="number"
            />
            {!regex.test(mount) && mount !== "" && (
              <p className="text-danger text-sm my-1 ml-2">
                El campo sólo admite números
              </p>
            )}
            <button
              disabled={loading || mount.trim() === "" || !regex.test(mount)}
              onClick={() => onSendData(mount)}
              className="bg-secondary font-semibold text-text-secondary rounded-xl p-4 place-self-end cursor-pointer hover:bg-secondary/60"
            >
              Aprobar
            </button>
          </div>
        </div>
      </div>
    </ModalComponent>
  );
};
