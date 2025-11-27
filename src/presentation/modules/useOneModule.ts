import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOneModule } from "../../core/database/modules/get-one-module.action";
import { publishModule } from "../../core/database/modules/update-module.action";
import { insertModuleResume } from "../../core/database/modules/insert-module-resume.action";
import { getPublicModuleInfo } from "../../core/database/modules/get-public-module-info.action";

export const useOneModule = (id: number) => {
  const queryClient = useQueryClient();

  const moduleQuery = useQuery({
    queryFn: () => getOneModule(id),
    queryKey: ["module", id],
    staleTime: 1000 * 60 * 60,
  });

  const moduleInfoQuery = useQuery({
    queryFn: () => getPublicModuleInfo(id),
    queryKey: ["moduleInfo", id],
    staleTime: 1000 * 60 * 60,
  });

  const moduleUpdateMutation = useMutation({
    mutationFn: (value: boolean) => publishModule(id, value),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["module", id],
      });
    },

    onError: (error) => {
      alert(error.message);
    },
  });

  const moduleResumeMutation = useMutation({
    mutationFn: (resume: string) => insertModuleResume(resume, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["module", id],
      });
      alert("¡Resumen actualizado con éxito!");
    },

    onError: (error) => {
      alert(error.message);
    },
  });

  return {
    moduleQuery,
    moduleUpdateMutation,
    moduleResumeMutation,
    moduleInfoQuery,
  };
};
