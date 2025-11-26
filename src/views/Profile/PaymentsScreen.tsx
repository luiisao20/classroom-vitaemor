import { useEffect, useState } from "react";
import { FileInput } from "../../components/input/InputFile";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import { usePayments } from "../../presentation/payments/usePayments";
import { StudentPayments } from "../../components/students/StudentPayments";
import type { Payment } from "../../core/interfaces";

export const PaymentsScreen = () => {
  const [file, setFile] = useState<File | null>(null);
  const [paymentList, setPaymentList] = useState<Payment[]>([]);

  const { user } = useAuthStore();

  const { paymentsMutation, paymentsQuery, paymentsDeleteMutation } =
    usePayments(user?.id!);

  useEffect(() => {
    if (paymentsQuery.data) setPaymentList(paymentsQuery.data);
  }, [paymentsQuery.data]);

  return (
    <div className="flex flex-col">
      <h2 className="font-semibold text-primary text-xl text-center">
        Sección de pagos
      </h2>
      <div className="flex flex-col gap-4 mb-6 mt-2 px-8">
        <p className="text-text text-base text-justify">
          Usa esta sección para subir los comprobantes de pago asociados a tu
          cuenta.
        </p>
        <p className="text-text text-base text-justify">
          Los pagos serán aprobados por el administrador en poco tiempo, pero
          una vez un pago sea aprobado no podrá ser eliminado de la cuenta.
        </p>
      </div>
      <FileInput
        file={file}
        setFile={(file) => setFile(file)}
        description="para subir el comprobante de pago"
        format=".jpeg,.jpg,.png"
      />
      <button
        onClick={() => paymentsMutation.mutate({ file: file! })}
        disabled={!file || paymentsMutation.isPending}
        className={`text-white p-4 font-semibold text-center bg-primary rounded-xl place-self-end cursor-pointer hover:bg-primary/60
          ${paymentsMutation.isPending && "cursor-progress"}
          `}
      >
        Subir pago
      </button>
      <StudentPayments
        payments={paymentList}
        onDelete={(paymentId, path) =>
          paymentsDeleteMutation.mutate({ paymentId, path })
        }
        loading={paymentsDeleteMutation.isPending}
      />
    </div>
  );
};
