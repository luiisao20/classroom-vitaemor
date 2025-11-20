import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserInfo } from "../../core/database/users/get-user-info.action";
import { createUser } from "../../core/database/users/create-user.action";
import { updateBiography } from "../../core/database/users/udpateBiography.action";

export const useUser = (idUser?: string) => {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryFn: () => getUserInfo(idUser!),
    queryKey: ["user", idUser],
    staleTime: 1000 * 60 * 60,
    enabled: !!idUser,
  });

  const userMutation = useMutation({
    mutationFn: ({
      firstName,
      lastName,
      biography,
    }: {
      firstName?: string;
      lastName?: string;
      biography?: string;
    }) =>
      biography
        ? updateBiography(biography!, idUser!)
        : createUser(firstName!, lastName!, idUser!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", idUser],
      });
    },

    onError: (error) => {
      console.log(error);
    },
  });

  return { userQuery, userMutation };
};
