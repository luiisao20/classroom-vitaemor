import { supabase } from "../../../../supabase";

export const publishTask = async (id: number, value: boolean) => {
  const { error } = await supabase
    .from("tasks")
    .update({
      status: value,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
};
