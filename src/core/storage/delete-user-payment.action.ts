import { supabase } from "../../../supabase";

export const deleteUserPayment = async (
  idPayment: number,
  path: string,
  idStudent: string
) => {
  const { error } = await supabase.storage
    .from("payments")
    .remove([`user-${idStudent}/${path}`]);

  if (error) throw new Error(error.message);

  const { error: errorDb } = await supabase
    .from("payments")
    .delete()
    .eq("id", idPayment);

  if (errorDb) throw new Error(errorDb.message);
};
