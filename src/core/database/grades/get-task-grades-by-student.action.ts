import { supabase } from "../../../../supabase";
import type { StudentTaskGrade } from "../../interfaces";

export const getTasksGradesByStudent = async (
  userId: string
): Promise<StudentTaskGrade[]> => {
  const grades: StudentTaskGrade[] = [];

  const { data, error } = await supabase.rpc("get_tasks_grades_by_student", {
    id_user: userId,
  });

  if (error) throw new Error(error.message);

  console.log(data);
  

  for (const element of data) {
    grades.push({
      moduleId: element.id,
      moduleNumber: element.module_number,
      grade: element.grade,
      title: element.title,
    });
  }

  return grades;
};
