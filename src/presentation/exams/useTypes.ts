import { useQuery } from "@tanstack/react-query";
import { getQuestionsTypes } from "../../core/database/exams/get-questions-types.action";

export const useTypes = () => {
  const typesQuery = useQuery({
    queryFn: () => getQuestionsTypes(),
    queryKey: ["types"],
    staleTime: 1000 * 60 * 60,
  });

  return { typesQuery };
};
