import { supabase } from "../../../../supabase";

export const createExam = async (moduleId: number) => {
  const { error } = await supabase
    .from("exams")
    .insert({ module_id: moduleId });

  if (error) throw new Error(error.message);
};
