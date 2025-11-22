import { supabase } from "../../../../supabase";
import type { AdditionalContent } from "../../interfaces";

export const insertAdditionalContent = async (
  content: AdditionalContent,
  moduleId: number
) => {
  const { error } = await supabase.from("additional_content").insert({
    topic: content.topic,
    url: content.url,
    module_id: moduleId,
  });

  if (error) throw new Error(error.message);
};
