import { supabase } from "../../../../supabase";
import type { Meeting } from "../../interfaces";

export const getMeeting = async (id: number): Promise<Meeting> => {
  const { data, error } = await supabase
    .from("meetings")
    .select()
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return {
    date: data.date,
    number: data.number,
    id: data.id,
    subtitle: data.subtitle,
  };
};
