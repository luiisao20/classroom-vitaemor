import { supabase } from "../../../../supabase";
import type { Module } from "../../interfaces";

export const getAllModules = async (): Promise<Module[]> => {
  const modules: Module[] = [];

  const { data, error } = await supabase.from("modules").select();

  if (error) throw new Error(error.message);

  for (const element of data) {
    modules.push({
      id: element.id,
      moduleNumber: element.module_number,
      title: element.title,
      resume: element.professor,
      status: element.status,
    });
  }

  return modules;
};
