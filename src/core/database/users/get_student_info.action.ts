import { supabase } from "../../../../supabase";
import type { Student } from "../../interfaces";

export const getStudentInfo = async (studentId: string): Promise<Student> => {
  const { data, error } = await supabase
    .rpc("get_student_info", {
      student_id: studentId,
    })
    .single();

  if (error) throw new Error(error.message);

  return {
    email: (data as any).email,
    firstName: (data as any).first_name,
    id: studentId,
    lastName: (data as any).last_name,
  };
};
