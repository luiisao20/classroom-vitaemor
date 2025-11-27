import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getExamModule } from "../../core/database/exams/get-exam-module.action";
import { createExam } from "../../core/database/exams/create-exam.action";
import type { Exam } from "../../core/interfaces";
import { updateExam } from "../../core/database/exams/update-exam.action";

export const useAdminExam = (moduleId: number) => {
  const queryClient = useQueryClient();

  const examQuery = useQuery({
    queryFn: () => getExamModule(moduleId),
    queryKey: ["exam", moduleId],
    staleTime: 1000 * 60 * 60,
    retry: false,
  });

  const examMutation = useMutation({
    mutationFn: (exam?: Exam) =>
      exam ? updateExam(exam) : createExam(moduleId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["exam", moduleId],
      });
      alert("¡La información del examen se ha actualizado!");
    },

    onError: (error) => {
      alert(`Ha ocurrido un error ${error.message}`);
    },
  });
  return { examQuery, examMutation };
};
