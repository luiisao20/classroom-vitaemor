import { useQuery } from "@tanstack/react-query";
import { getStudentsByExamGrade } from "../../core/database/grades/get-students-by-exam-grade.action";

export const useExamGrades = (
  examId?: number,
  completed?: boolean,
  approven?: boolean
) => {
  const examGradesQuery = useQuery({
    queryFn: () => getStudentsByExamGrade(examId!, completed, approven),
    queryKey: ["examGrades", examId],
    staleTime: 1000 * 60 * 60,
    enabled: !!examId
  });

  return { examGradesQuery };
};
