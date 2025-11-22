import { supabase } from "../../../../supabase";
import type { Task } from "../../interfaces";

export const updateTask = async (task: Task) => {
  const { error } = await supabase
    .from("tasks")
    .update({
      title: task.title,
      description: task.description,
      due_date: task.dueDate,
    })
    .eq("id", task.id);

  if (error) throw new Error(error.message);
};
