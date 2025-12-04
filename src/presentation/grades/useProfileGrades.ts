import { useQuery } from "@tanstack/react-query";
import { getExamGradesByStudent } from "../../core/database/grades/get-exam-grades-by-student.action";
import { getTasksGradesForStudent } from "../../core/database/grades/get-tasks-grades-for-student.action";

export const useProfileGrades = (userId?: string, moduleId?: number) => {
  const examGrades = useQuery({
    queryFn: () => getExamGradesByStudent(userId!),
    queryKey: ["examGrades", userId],
    staleTime: 1000 * 60 * 60,
    enabled: !!userId,
  });

  const taskGrades = useQuery({
    queryFn: () => getTasksGradesForStudent(userId!, moduleId!),
    queryKey: ["taskGrades", userId, moduleId],
    staleTime: 1000 * 60 * 60,
    enabled: !!userId && !!moduleId,
  });

  return { examGrades, taskGrades };
};
