import { supabase } from "../../../../supabase";
import type { StudentAssistance } from "../../interfaces";

export const getStudentAssistance = async (
  studentId: string
): Promise<StudentAssistance[]> => {
  const assistance: StudentAssistance[] = [];

  const { data, error } = await supabase.rpc("get_student_assistance", {
    id_user: studentId,
  });

  if (error) throw new Error(error.message);

  for (const element of data) {
    assistance.push({
      date: element.date,
      number: element.number,
      status: element.status,
      moduleNumber: element.module_number
    });
  }

  return assistance;
};
