import { supabase } from "../../../../supabase";
import type { GradesByQuestion } from "../../interfaces";

export const uploadExamGrades = async (
  studentId: string,
  examId: number,
  grades: GradesByQuestion[],
  totalGrade: number
) => {
  const payload = grades.map((g) => ({
    question_id: g.idQuestion,
    grade: g.grade,
    user_id: studentId,
  }));

  const { error } = await supabase
    .from("answers")
    .upsert(payload, { onConflict: "question_id, user_id" });

  if (error) throw new Error(error.message);

  const { error: errorResults } = await supabase
    .from("exam_results")
    .upsert(
      { total_grade: totalGrade, user_id: studentId, exam_id: examId },
      { onConflict: "user_id, exam_id" }
    );

  if (errorResults) throw new Error(errorResults.message);
};
