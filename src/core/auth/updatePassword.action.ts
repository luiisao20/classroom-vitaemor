import { supabase } from "../../../supabase";

export const updatePassword = async (
  oldPassword: string,
  newPassword: string,
  email: string
) => {
  const { error: errorSignIn } = await supabase.auth.signInWithPassword({
    email,
    password: oldPassword,
  });

  if (errorSignIn) throw new Error("Error la contraseña actual es incorrecta");

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error("Error Algo salió mal");

  return true;
};
