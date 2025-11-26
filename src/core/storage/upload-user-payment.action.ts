import { supabase } from "../../../supabase";

export const uploadUserPayment = async (file: File, idStudent: string) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

  const { error } = await supabase.storage
    .from("payments")
    .upload(`user-${idStudent}/${uniqueSuffix}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("payments")
    .getPublicUrl(`user-${idStudent}/${uniqueSuffix}`);

  const { error: errorDb } = await supabase.from("payments").insert({
    created_at: new Date().toISOString(),
    url: urlData.publicUrl,
    user_id: idStudent,
    path: uniqueSuffix
  });

  if (errorDb) throw new Error(errorDb.message);
};
