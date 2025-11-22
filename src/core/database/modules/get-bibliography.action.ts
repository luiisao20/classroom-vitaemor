import { supabase } from "../../../../supabase";
import type { Bibliography } from "../../interfaces";

export const getBibliography = async (
  moduleId: number
): Promise<Bibliography[]> => {
  const bibliography: Bibliography[] = [];

  const { data, error } = await supabase
    .from("bibliography")
    .select()
    .eq("module_id", moduleId);

  if (error) throw new Error(error.message);

  for (const element of data) {
    bibliography.push({
      id: element.id,
      content: element.content,
      moduleId: element.module_id,
    });
  }

  return bibliography;
};
