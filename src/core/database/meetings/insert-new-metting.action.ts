import { supabase } from "../../../../supabase";
import type { Meeting } from "../../interfaces";

export const insertNewMeeting = async (meeting: Meeting, moduleId: number) => {
  const { error } = await supabase.from("meetings").insert({
    number: meeting.number,
    module_id: moduleId,
    date: meeting.date,
  });

  if (error) throw new Error(error.message);
};
