import { supabase } from "../../../../supabase";
import type { Exam } from "../../interfaces";

export const updateExam = async (exam: Exam) => {
  const { error } = await supabase
    .from("exams")
    .update({
      status: exam.status,
      due_date: exam.dueDate,
      review: exam.review,
    })
    .eq("id", exam.id);

  if (error) throw new Error(error.message);
};
