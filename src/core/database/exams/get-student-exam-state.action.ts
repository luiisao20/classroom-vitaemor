import { supabase } from "../../../../supabase";

export const getStudentExamState = async (
  studentId: string,
  examId: number
): Promise<number | null> => {
  const { count, error } = await supabase
    .from("exam_results")
    .select("user_id", { count: "exact", head: true })
    .eq("user_id", studentId)
    .eq("exam_id", examId);

  if (error) throw new Error(error.message);

  return count;
};
