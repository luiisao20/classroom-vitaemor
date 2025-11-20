import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOneModule } from "../../core/database/modules/get-one-module.action";
import { publishModule } from "../../core/database/modules/update-module.action";

export const useOneModule = (id: number) => {
  const queryClient = useQueryClient();

  const moduleQuery = useQuery({
    queryFn: () => getOneModule(id),
    queryKey: ["module", id],
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

  return { moduleQuery, moduleUpdateMutation };
};
