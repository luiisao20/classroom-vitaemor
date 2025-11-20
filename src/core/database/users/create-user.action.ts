import { supabase } from "../../../../supabase";

export const createUser = async (
  firstName: string,
  lastName: string,
  idUser: string
) => {
  const { error } = await supabase
    .from("users")
    .insert({ first_name: firstName, last_name: lastName, id: idUser });

  if (error) throw new Error(error.message);

  return false;
};
