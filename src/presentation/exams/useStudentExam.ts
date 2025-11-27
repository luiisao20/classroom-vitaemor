import { useQuery } from "@tanstack/react-query";
import { getExamEnabled } from "../../core/database/exams/get-exam-enabled.action";

export const useStudentExam = (moduleId: number) => {
  const examQuery = useQuery({
    queryFn: () => getExamEnabled(moduleId),
    queryKey: ["studentExam", moduleId],
    staleTime: 1000 * 60 * 60,
  });

  return { examQuery };
};
