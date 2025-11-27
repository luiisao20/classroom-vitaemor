import { supabase } from "../../../../supabase";
import type { ModuleInfo } from "../../interfaces";

export const getPublicModuleInfo = async (
  moduleId: number
): Promise<ModuleInfo> => {
  const { data, error } = await supabase
    .from("modules")
    .select()
    .eq("id", moduleId)
    .single();

  const { data: dataAdd, error: errorAd } = await supabase
    .from("additional_content")
    .select()
    .eq("module_id", moduleId);

  const { data: dataBibl, error: errorBibl } = await supabase
    .from("bibliography")
    .select()
    .eq("module_id", moduleId);

  if (error || errorAd || errorBibl)
    throw new Error(
      `${error?.message} \n ${errorAd?.message} \n ${errorBibl?.message}`
    );

  const moduleInfo: ModuleInfo = {
    title: data.title,
    moduleNumber: data.module_number,
    resume: data.resume,
    additionalContent: dataAdd.map((a) => ({ topic: a.topic, url: a.url })),
    bibliography: dataBibl.map((b) => b.content),
  };

  return moduleInfo;
};
