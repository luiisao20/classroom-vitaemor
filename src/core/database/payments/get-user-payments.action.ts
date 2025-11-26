import { supabase } from "../../../../supabase";
import type { Payment } from "../../interfaces";

export const getUserPayments = async (userId: string): Promise<Payment[]> => {
  const payments: Payment[] = [];

  const { data, error } = await supabase
    .from("payments")
    .select()
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  for (const element of data) {
    payments.push({
      id: element.id,
      createdAt: element.created_at,
      url: element.url,
      approvedAt: element.approved_at ?? null,
      ammount: element.ammount ?? null,
      status: element.status,
      path: element.path
    });
  }

  return payments;
};
