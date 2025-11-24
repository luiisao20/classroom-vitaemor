import { supabase } from "../../../../supabase";
import type { Student } from "../../interfaces";

export const getAllUserInfo = async (): Promise<Student[]> => {
  const students: Student[] = [];

  const { data, error } = await supabase
    .rpc("get_all_users")
    .order("last_name", { ascending: true });

  if (error) throw new Error(error.message);

  for (const element of data) {
    students.push({
      email: element.email,
      firstName: element.first_name,
      lastName: element.last_name,
      id: element.id,
    });
  }

  return students;
};
