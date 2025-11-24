import { useQuery } from "@tanstack/react-query";
import { getAllUserInfo } from "../../core/database/users/get-all-users.action";

export const useStudents = () => {
  const studentsQuery = useQuery({
    queryFn: () => getAllUserInfo(),
    queryKey: ["students"],
    staleTime: 1000 * 60 * 60,
  });

  return { studentsQuery };
};
