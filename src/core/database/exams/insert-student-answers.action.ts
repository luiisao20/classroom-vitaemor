import { supabase } from "../../../../supabase";
import type { Answer } from "../../interfaces";

export const insertStudentAnswers = async (
  answers: Answer[],
  studentId: string,
  examId: number
) => {
  const totalGrade: number =
    (answers.reduce(
      (total: number, current) =>
        current.grade ? total + current.grade : total,
      0
    ) *
      10) /
    answers.length;

  const payload = answers.map((a) => ({
    question_id: a.questionId,
    user_id: studentId,
    option_selected_id: a.optionId ?? null,
    written_answer: a.text ?? null,
    grade: a.grade,
  }));

  const { error } = await supabase.from("answers").insert(payload);

  if (error) throw new Error(error.message);

  const { error: errorResult } = await supabase.from("exam_results").insert({
    user_id: studentId,
    exam_id: examId,
    total_grade: totalGrade,
  });

  if (errorResult) throw new Error(errorResult.message);
};
