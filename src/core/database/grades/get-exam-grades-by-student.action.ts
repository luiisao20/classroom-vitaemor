import { supabase } from "../../../../supabase";
import type { ModuleExamGrade } from "../../interfaces";

export const getExamGradesByStudent = async (
  userId: string
): Promise<ModuleExamGrade[]> => {
  const grades: ModuleExamGrade[] = [];

  const { data, error } = await supabase.rpc("get_exam_grades_by_student", {
    id_user: userId,
  });

  if (error) throw new Error(error.message);

  for (const element of data) {
    grades.push({
      moduleId: element.module_id,
      examId: element.exam_id,
      review: element.review,
      createdAt: element.created_at,
      grade: element.total_grade,
      module: element.module_number,
    });
  }

  return grades;
};
