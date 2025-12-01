import { useQuery } from "@tanstack/react-query";
import { getExamGradesByStudent } from "../../core/database/grades/get-exam-grades-by-student.action";
import { getTasksGradesByStudent } from "../../core/database/grades/get-task-grades-by-student.action";

export const useStudentGrades = (userId?: string) => {
  const examGrades = useQuery({
    queryFn: () => getExamGradesByStudent(userId!),
    queryKey: ["examGrades", userId],
    staleTime: 1000 * 60 * 60,
    enabled: !!userId,
  });

  const tasksGrades = useQuery({
    queryFn: () => getTasksGradesByStudent(userId!),
    queryKey: ["tasksGrades", userId],
    staleTime: 1000 * 60 * 60,
    enabled: !!userId,
  });

  return { examGrades, tasksGrades };
};
