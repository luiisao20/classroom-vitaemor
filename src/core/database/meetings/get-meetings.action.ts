import { supabase } from "../../../../supabase";
import type { Meeting } from "../../interfaces";

export const getMeetings = async (moduleId: number): Promise<Meeting[]> => {
  const meetings: Meeting[] = [];

  const { data, error } = await supabase
    .from("meetings")
    .select()
    .eq("module_id", moduleId)
    .order("number", { ascending: true });

  if (error) throw new Error(error.message);

  for (const element of data) {
    meetings.push({
      id: element.id,
      date: element.date,
      number: element.number,
      subtitle: element.subtitle,
    });
  }

  return meetings;
};
