import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Payment, Student } from "../../../core/interfaces";
import { useStudent } from "../../../presentation/user/useStudent";
import { ButtonGoBack } from "../../../components/general/ButtonGoBack";
import { usePayments } from "../../../presentation/payments/usePayments";
import { StudentPayments } from "../../../components/students/StudentPayments";
import { ModalPayment } from "../../../components/modal/ModalPayment";

export const PaymentStudent = () => {
  const { id } = useParams();
  const [dataStudent, setDataStudent] = useState<Student>();
  const [paymentList, setPaymentList] = useState<Payment[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [paymentToApprove, setPaymentToApprove] = useState<Payment>();

  const { studentQuery } = useStudent(id!);
  const { paymentsQuery, paymentsMutation } = usePayments(id!);

  useEffect(() => {
    if (studentQuery.data) setDataStudent(studentQuery.data);
  }, [studentQuery.data]);

  useEffect(() => {
    if (paymentsQuery.data) setPaymentList(paymentsQuery.data);
  }, [paymentsQuery.data]);

  return (
    <div>
      <ModalPayment
        item={paymentToApprove}
        open={openModal}
        onSendData={async (ammount) => {
          const newPayment: Payment = {
            ...paymentToApprove!,
            ammount: parseInt(ammount),
          };
          paymentsMutation.mutate({ payment: newPayment });
        }}
        onClose={() => setOpenModal(false)}
      />
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
      <StudentPayments
        payments={paymentList}
        admin
        onApprove={(item) => {
          setPaymentToApprove(item);
          setOpenModal(true);
        }}
      />
    </div>
  );
};
