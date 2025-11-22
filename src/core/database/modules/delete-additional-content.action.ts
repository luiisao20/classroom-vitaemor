import { supabase } from "../../../../supabase";

export const deleteAdditionalcontent = async (idContent: number) => {
  const { error } = await supabase
    .from("additional_content")
    .delete()
    .eq("id", idContent);

  if (error) throw new Error(error.message);
};
