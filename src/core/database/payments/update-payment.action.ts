import { supabase } from "../../../../supabase";
import type { Payment } from "../../interfaces";

export const updatePayment = async (payment: Payment) => {
  const { error } = await supabase
    .from("payments")
    .update({
      status: true,
      approved_at: new Date().toISOString(),
      ammount: payment.ammount,
    })
    .eq("id", payment.id);

  if (error) throw new Error(error.message);
};
