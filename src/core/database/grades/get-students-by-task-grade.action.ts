import { supabase } from "../../../../supabase";
import type { StudentGradeExam } from "../../interfaces";

export const getStudentsByTaskGrade = async (
  examId: number,
  completed?: boolean,
): Promise<StudentGradeExam[]> => {
  const grades: StudentGradeExam[] = [];

  const rpcParams: Record<string, any> = {
    id_task: examId,
  };

  if (completed !== undefined) {
    rpcParams.has_grade = completed ? true : false;
  } else {
    rpcParams.has_grade = null;
  }

  const { data, error } = await supabase.rpc(
    "get_students_by_task_grade",
    rpcParams
  );

  if (error) throw new Error(error.message);

  for (const element of data) {
    grades.push({
      lastName: element.last_name,
      firstName: element.first_name,
      email: element.email,
      grade: element.grade ?? undefined,
      id: element.id,
    });
  }

  return grades;
};
