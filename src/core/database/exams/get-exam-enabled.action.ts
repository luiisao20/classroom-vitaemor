import dayjs from "dayjs";
import { supabase } from "../../../../supabase";
import type { Exam } from "../../interfaces";

export const getExamEnabled = async (
  moduleId: number
): Promise<Exam | undefined> => {
  const { data, error } = await supabase
    .from("exams")
    .select()
    .eq("module_id", moduleId)
    .eq("status", true)
    .gt("due_date", new Date().toISOString())
    .single();

  if (error) throw new Error(error.message);

  if (data)
    return {
      id: data.id,
      dueDate: dayjs(data.due_date) ?? null,
      review: data.review,
      status: data.status,
    };
};
