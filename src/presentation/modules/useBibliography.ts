import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBibliography } from "../../core/database/modules/get-bibliography.action";
import type { Bibliography } from "../../core/interfaces";
import { insertModuleBibliography } from "../../core/database/modules/insert-module-bibliography.action";
import { deleteBibliography } from "../../core/database/modules/delete-bibliography.action";

export const useBibliography = (moduleId: number) => {
  const queryClient = useQueryClient();

  const bibliographyQuery = useQuery({
    queryFn: () => getBibliography(moduleId),
    queryKey: ["bibliography", moduleId],
    staleTime: 1000 * 60 * 60,
  });

  const bibliographyMutation = useMutation({
    mutationFn: (bibliography: Bibliography) =>
      insertModuleBibliography(bibliography, moduleId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bibliography", moduleId],
      });
    },

    onError: (error) => {
      alert(`Existe un error ${error.message}`);
    },
  });

  const bibliographyDeleteMutation = useMutation({
    mutationFn: (id: number) => deleteBibliography(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bibliography", moduleId],
      });
    },

    onError: (error) => {
      console.log(`Existe un error ${error.message}`);
    },
  });

  return {
    bibliographyDeleteMutation,
    bibliographyMutation,
    bibliographyQuery,
  };
};
