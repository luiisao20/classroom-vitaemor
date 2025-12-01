import { supabase } from "../../../../supabase";
import type { StudentGradeExam } from "../../interfaces";

export const getStudentsByExamGrade = async (
  examId: number,
  completed?: boolean,
  approven?: boolean
): Promise<StudentGradeExam[]> => {
  const grades: StudentGradeExam[] = [];

  const rpcParams: Record<string, any> = {
    id_exam: examId,
  };

  if (completed !== undefined) {
    rpcParams.has_grade = completed ? true : false;
  } else {
    rpcParams.has_grade = null;
  }

  if (approven !== undefined) {
    rpcParams.approven = approven ? true : false;
  } else {
    rpcParams.approven = null;
  }

  const { data, error } = await supabase.rpc(
    "get_students_by_exam_grade",
    rpcParams
  );

  if (error) throw new Error(error.message);

  for (const element of data) {
    grades.push({
      lastName: element.last_name,
      firstName: element.first_name,
      email: element.email,
      grade: element.total_grade ?? undefined,
      id: element.id,
    });
  }

  return grades;
};
