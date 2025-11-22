import { supabase } from "../../../../supabase";

export const insertModuleResume = async (resume: string, moduleId: number) => {
  const { error } = await supabase
    .from("modules")
    .update({ resume: resume })
    .eq("id", moduleId);

  if (error) throw new Error(error.message);
};
