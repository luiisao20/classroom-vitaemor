import { useQuery } from "@tanstack/react-query";
import { getAllUserInfo } from "../../core/database/users/get-all-users.action";
import { searchAllStudents } from "../../core/database/users/search-all-students.action";

export const useStudents = (searchText: string) => {
  const studentsQuery = useQuery({
    queryFn: () =>
      searchText.length > 0 ? searchAllStudents(searchText) : getAllUserInfo(),
    queryKey: ["students", searchText],
    staleTime: 1000 * 60 * 60,
  });

  return { studentsQuery };
};
