import { supabase } from "../../../supabase";

export const deleteUserSubmission = async (
  idTask: number,
  path: string,
  idStudent: string
) => {
  console.log(idTask);
  console.log(path);

  const { error } = await supabase.storage
    .from("tasks")
    .remove([`task-${idTask}/${path}`]);

  if (error) throw new Error(error.message);

  const { error: errorDb } = await supabase
    .from("users_submit_tasks")
    .delete()
    .eq("task_id", idTask)
    .eq("user_id", idStudent);

  if (errorDb) throw new Error(errorDb.message);
};
