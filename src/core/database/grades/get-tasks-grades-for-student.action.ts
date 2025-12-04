import { supabase } from "../../../../supabase";
import type { StudentGradeTask } from "../../interfaces";

export const getTasksGradesForStudent = async (
  userId: string,
  moduleId: number
): Promise<StudentGradeTask[]> => {
  const grades: StudentGradeTask[] = [];

  const { data, error } = await supabase.rpc("get_tasks_grade", {
    id_user: userId,
    id_module: moduleId,
  });

  if (error) throw new Error(error.message);

  for (const element of data) {
    grades.push({
      grade: element.grade ?? undefined,
      feedback: element.feedback ?? undefined,
      fileName: element.file_name ?? undefined,
      title: element.title,
      url: element.url ?? undefined,
    });
  }

  return grades;
};
