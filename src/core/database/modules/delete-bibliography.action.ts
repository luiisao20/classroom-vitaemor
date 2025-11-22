import { supabase } from "../../../../supabase";

export const deleteBibliography = async (id: number) => {
  const { error } = await supabase.from("bibliography").delete().eq("id", id);

  if (error) throw new Error(error.message);
};
