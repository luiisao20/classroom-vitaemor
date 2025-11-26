import { supabase } from "../../../../supabase";
import type { Student } from "../../interfaces";

export const searchAllStudents = async (
  searchText: string
): Promise<Student[]> => {
  const students: Student[] = [];

  const { data, error } = await supabase.rpc("search_all_user_info", {
    search_text: searchText.toLowerCase(),
  });

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
