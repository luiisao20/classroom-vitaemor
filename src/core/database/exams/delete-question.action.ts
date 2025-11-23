import { supabase } from "../../../../supabase";

export const deleteQuestion = async (questionId: number) => {
  const { error } = await supabase
    .from("questions")
    .delete()
    .eq("id", questionId);

  if (error) throw new Error(error.message);
};
