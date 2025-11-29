import { supabase } from "../../../../supabase";

export const getExamGrade = async (
  userId: string,
  examId: number
): Promise<number | null> => {
  const { data, error } = await supabase
    .from("exam_results")
    .select()
    .eq("user_id", userId)
    .eq("exam_id", examId);

  if (error) throw new Error(error.message);

  return data.length > 0 ? data[0].total_grade : null;
};
