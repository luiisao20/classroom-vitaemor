import { useQuery } from "@tanstack/react-query";
import { getStudentsByTaskGrade } from "../../core/database/grades/get-students-by-task-grade.action";

export const useTaskGrades = (taskId?: number, completed?: boolean) => {
  const taskGradesQuery = useQuery({
    queryFn: () => getStudentsByTaskGrade(taskId!, completed),
    queryKey: ["taskGrades", taskId],
    staleTime: 1000 * 60 * 60,
    enabled: !!taskId,
  });

  return { taskGradesQuery };
};
