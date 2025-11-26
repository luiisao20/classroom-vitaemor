import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { uploadUserPayment } from "../../core/storage/upload-user-payment.action";
import { getUserPayments } from "../../core/database/payments/get-user-payments.action";
import type { Payment } from "../../core/interfaces";
import { updatePayment } from "../../core/database/payments/update-payment.action";
import { deleteUserPayment } from "../../core/storage/delete-user-payment.action";

export const usePayments = (userId: string) => {
  const queryClient = useQueryClient();

  const paymentsQuery = useQuery({
    queryFn: () => getUserPayments(userId),
    queryKey: ["payments", userId],
    staleTime: 1000 * 60 * 60,
    enabled: !!userId,
  });

  const paymentsMutation = useMutation({
    mutationFn: ({ file, payment }: { file?: File; payment?: Payment }) =>
      file ? uploadUserPayment(file!, userId) : updatePayment(payment!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments", userId],
      });
    },

    onError: (error) => {
      alert(`Ha ocurrido un error inesperado ${error}`);
    },
  });

  const paymentsDeleteMutation = useMutation({
    mutationFn: ({ paymentId, path }: { paymentId: number; path: string }) =>
      deleteUserPayment(paymentId, path, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments", userId],
      });
    },

    onError: (error) => {
      alert(`Ha ocurrido un error inesperado ${error}`);
    },
  });

  return { paymentsMutation, paymentsQuery, paymentsDeleteMutation };
};
