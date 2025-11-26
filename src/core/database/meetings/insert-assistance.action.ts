import { supabase } from "../../../../supabase";
import type { StudentList } from "../../interfaces";

export const insertAssistances = async (
  studentsList: StudentList[],
  meetingId: number
) => {
  const payload = studentsList.map((s) => ({
    user_id: s.id,
    status: s.assistance,
    meeting_id: meetingId,
  }));

  const { error } = await supabase
    .from("users_attend_meetings")
    .upsert(payload, { onConflict: "user_id, meeting_id" });

  if (error) throw new Error(error.message);
};
