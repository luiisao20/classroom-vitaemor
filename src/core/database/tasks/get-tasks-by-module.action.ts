import { supabase } from "../../../../supabase";
import type { Task } from "../../interfaces";

export const getTasksByModule = async (moduleId: number): Promise<Task[]> => {
  const tasks: Task[] = [];

  const { data, error } = await supabase
    .from("tasks")
    .select()
    .eq("module_id", moduleId);

  if (error) throw new Error(error.message);

  for (const element of data) {
    tasks.push({
      id: element.id,
      description: element.description,
      dueDate: element.due_date,
      title: element.title,
      publishedAt: element.created_at,
      status: element.status
    })
  }

  return tasks;
};
