import { supabase } from "../../../../supabase";
import type { AdditionalContent } from "../../interfaces";

export const getAdditionalContent = async (
  idModule: number
): Promise<AdditionalContent[]> => {
  const additionalContent: AdditionalContent[] = [];

  const { data, error } = await supabase
    .from("additional_content")
    .select()
    .eq("module_id", idModule);

  if (error) throw new Error(error.message);

  for (const element of data) {
    additionalContent.push({
      id: element.id,
      moduleId: element.module_id,
      topic: element.topic,
      url: element.url,
    });
  }

  return additionalContent;
};
