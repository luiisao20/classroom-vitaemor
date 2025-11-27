import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllModules } from "../../core/database/modules/get-modules.action";
import { insertNewModule } from "../../core/database/modules/insert-new-module.action";
import type { Module } from "../../core/interfaces";
import { getPublicModules } from "../../core/database/modules/get-public-modules.action";

export const useModules = () => {
  const queryClient = useQueryClient();

  const modulesQuery = useQuery({
    queryFn: () => getAllModules(),
    queryKey: ["modules"],
    staleTime: 1000 * 60 * 60,
  });

  const publicModulesQuery = useQuery({
    queryFn: () => getPublicModules(),
    queryKey: ["publicModules"],
    staleTime: 1000 * 60 * 60,
  });

  const modulesMutation = useMutation({
    mutationFn: (module: Module) => insertNewModule(module),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["modules"],
      });
    },

    onError: (error) => {
      console.log(error);
      alert(error.message);
    },
  });

  return { modulesMutation, modulesQuery, publicModulesQuery };
};
