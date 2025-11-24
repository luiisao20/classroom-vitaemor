import { useQuery } from "@tanstack/react-query";
import { getStudentInfo } from "../../core/database/users/get_student_info.action";

export const useStudent = (studentId: string) => {
  const studentQuery = useQuery({
    queryFn: () => getStudentInfo(studentId),
    queryKey: ["student", studentId],
    staleTime: 1000 * 60 * 60,
  });

  return { studentQuery };
};
