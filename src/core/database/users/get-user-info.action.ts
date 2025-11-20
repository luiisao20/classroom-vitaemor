import { supabase } from "../../../../supabase";
import type { UserData } from "../../auth/interface";

export const getUserInfo = async (userId: string): Promise<UserData> => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  const student: UserData = {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    isAdmin: data.admin,
    biography: data.biography,
  };

  return student;
};
