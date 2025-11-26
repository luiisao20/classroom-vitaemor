import { useQuery } from "@tanstack/react-query";
import { getStudentAssistance } from "../../core/database/meetings/get-student-assistance.action";

export const useStudentAssistance = (studentId?: string) => {
  const assistanceQuery = useQuery({
    queryFn: () => getStudentAssistance(studentId!),
    queryKey: ["studentAssistance", studentId],
    staleTime: 1000 * 60 * 60,
    enabled: !!studentId,
  });

  return { assistanceQuery };
};
