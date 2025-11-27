import { supabase } from "../../../../supabase";
import type { Submission } from "../../interfaces";

export const getStudentSubmissions = async (
  userId: string,
  moduleId: number
): Promise<Submission[]> => {
  const submissions: Submission[] = [];

  const { data, error } = await supabase.rpc("get_student_submissions", {
    id_module: moduleId,
    id_user: userId,
  });

  if (error) throw new Error(error.message);

  for (const element of data) {
    submissions.push({
      fileName: element.file_name,
      url: element.url,
      path: element.path,
      createdAt: element.created_at,
      feedback: element.feedback,
      grade: element.grade,
      gradedAt: element.graded_at,
      idTask: element.task_id
    });
  }

  return submissions;
};
