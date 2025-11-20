import { supabase } from "../../../../supabase";

export const updateBiography = async (text: string, userId: string) => {
  const { error } = await supabase
    .from("users")
    .update({ biography: text })
    .eq("id", userId);

  if (error) throw new Error(error.message);

  return true;
};
