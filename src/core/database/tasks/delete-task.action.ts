import { supabase } from "../../../../supabase";

export const deleteTask = async (id: number) => {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) throw new Error(error.message);
};
