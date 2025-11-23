import { supabase } from "../../../../supabase";
import type { QuestionType } from "../../interfaces";

export const getQuestionsTypes = async (): Promise<QuestionType[]> => {
  const types: QuestionType[] = [];

  const { data, error } = await supabase
    .from("types")
    .select()
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);

  for (const element of data) {
    types.push({
      id: element.id,
      type: element.name,
    });
  }

  return types;
};
