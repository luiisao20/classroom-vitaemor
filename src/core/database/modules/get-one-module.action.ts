import { supabase } from "../../../../supabase";
import type { Module } from "../../interfaces";

export const getOneModule = async (id: number): Promise<Module> => {
  const { data, error } = await supabase
    .from("modules")
    .select()
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return {
    moduleNumber: data.module_number,
    id: data.id,
    title: data.title,
    resume: data.resume,
    status: data.status,
  };
};
