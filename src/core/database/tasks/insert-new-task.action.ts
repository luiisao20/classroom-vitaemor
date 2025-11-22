import { supabase } from "../../../../supabase";
import type { Task } from "../../interfaces";

export const insertNewTask = async (task: Task, moduleId: number) => {
  const { error } = await supabase.from("tasks").insert({
    title: task.title,
    description: task.description,
    due_date: task.dueDate,
    module_id: moduleId,
  });

  if (error) throw error;
};
