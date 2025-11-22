import { supabase } from "../../../../supabase";
import type { Bibliography } from "../../interfaces";

export const insertModuleBibliography = async (
  bibliography: Bibliography,
  moduleId: number
) => {
  const { error } = await supabase
    .from("bibliography")
    .insert({ content: bibliography.content, module_id: moduleId });

  if (error) throw new Error(error.message);
};
