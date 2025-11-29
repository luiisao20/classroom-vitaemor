import { supabase } from "../../../supabase";
import type { Submission } from "../interfaces";

export const updateTaskGrade = async (
  submission: Submission,
  userId: string
) => {
  const { error } = await supabase
    .from("users_submit_tasks")
    .update({
      grade: submission.grade,
      feedback: submission.feedback,
    })
    .eq("task_id", submission.idTask)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
};
