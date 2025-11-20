import { supabase } from "../../../../supabase";

export const publishModule = async (id: number, value: boolean) => {
  const { error } = await supabase
    .from("modules")
    .update({ status: value })
    .eq("id", id);

  if (error) throw new Error(error.message);
};
