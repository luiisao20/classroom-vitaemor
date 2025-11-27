import { supabase } from "../../../supabase";

export const uploadUserTask = async (
  file: File,
  idStudent: string,
  idTask: number
) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

  const { error } = await supabase.storage
    .from("tasks")
    .upload(`task-${idTask}/${uniqueSuffix}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("tasks")
    .getPublicUrl(`task-${idTask}/${uniqueSuffix}`);

  const { error: errorDb } = await supabase.from("users_submit_tasks").insert({
    task_id: idTask,
    user_id: idStudent,
    created_at: new Date().toISOString(),
    url: urlData.publicUrl,
    file_name: file.name,
    path: uniqueSuffix,
  });

  if (errorDb) throw new Error(errorDb.message);
};
