import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdditionalContent } from "../../core/database/modules/get-additional-content.action";
import { insertAdditionalContent } from "../../core/database/modules/insert-additional-content.action";
import type { AdditionalContent } from "../../core/interfaces";
import { deleteAdditionalcontent } from "../../core/database/modules/delete-additional-content.action";

export const useAdditionalContent = (idModule?: number) => {
  const queryClient = useQueryClient();

  const additionalQuery = useQuery({
    queryFn: () => getAdditionalContent(idModule!),
    queryKey: ["additionalContent", idModule],
    staleTime: 1000 * 60 * 60,
    enabled: !!idModule,
  });

  const additionalMutation = useMutation({
    mutationFn: (content: AdditionalContent) =>
      insertAdditionalContent(content, idModule!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["additionalContent", idModule],
      });
    },

    onError: (error) => {
      alert(`Ha ocurrido un error ${error}`);
    },
  });

  const additionalDeleteMutation = useMutation({
    mutationFn: (idContent: number) => deleteAdditionalcontent(idContent),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["additionalContent", idModule],
      });
    },

    onError: (error) => {
      alert(`Ha ocurrido un error ${error}`);
    },
  });

  return { additionalQuery, additionalMutation, additionalDeleteMutation };
};
