import { supabase } from "../../../../supabase";
import type { Module } from "../../interfaces";

export const insertNewModule = async (module: Module) => {
  console.log('jere');
  const { error } = await supabase
    .from("modules")
    .insert({ title: module.title, module_number: module.moduleNumber });

  if (error) throw new Error(error.message);

  
};
