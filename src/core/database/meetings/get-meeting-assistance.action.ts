import { supabase } from "../../../../supabase";
import type { StudentList } from "../../interfaces";

export const getMeetingAssistance = async (
  meetingId: number
): Promise<StudentList[]> => {
  const assistance: StudentList[] = [];

  const { data, error } = await supabase.rpc("get_students_assistance", {
    id_meeting: meetingId,
  });

  if (error) throw new Error(error.message);

  for (const element of data) {
    assistance.push({
      id: element.id,
      firstName: element.first_name,
      lastName: element.last_name,
      assistance: element.status,
    });
  }

  return assistance;
};
