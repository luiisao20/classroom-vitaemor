import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudentExamState } from "../../core/database/exams/get-student-exam-state.action";
import { insertStudentAnswers } from "../../core/database/exams/insert-student-answers.action";
import type { Answer, GradesByQuestion } from "../../core/interfaces";
import { getExamGrade } from "../../core/database/exams/get-exam-grade.action";
import { getStudentExam } from "../../core/database/exams/get-student-exam.action";
import { uploadExamGrades } from "../../core/database/exams/upload-exam-grades.action";

export const useStudentExam = (userId?: string, examId?: number) => {
  const queryClient = useQueryClient();

  const gradeExamQuery = useQuery({
    queryFn: () => getExamGrade(userId!, examId!),
    queryKey: ["examGrade", userId, examId],
    enabled: !!userId && !!examId,
  });

  const gradeStudentState = useQuery({
    queryFn: () => getStudentExamState(userId!, examId!),
    queryKey: ["examState", userId, examId],
    enabled: !!userId && !!examId,
  });

  const questionsQuery = useQuery({
    queryFn: () => getStudentExam(userId!, examId!),
    queryKey: ["answers", userId, examId],
    enabled: !!userId && !!examId,
  });

  const gradesMutation = useMutation({
    mutationFn: ({
      grades,
      totalGrade,
    }: {
      grades: GradesByQuestion[];
      totalGrade: number;
    }) => uploadExamGrades(userId!, examId!, grades, totalGrade),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["examGrade", userId, examId],
      });
      queryClient.invalidateQueries({
        queryKey: ["answers", userId, examId],
      });
    },

    onError: (error) => {
      alert(`Ha ocurrido un error inesperado ${error.message}`);
    },
  });

  const answersMutation = useMutation({
    mutationFn: ({ answers, userId }: { answers: Answer[]; userId: string }) =>
      insertStudentAnswers(answers, userId, examId!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["examState", examId],
      });
      alert("¡El examen se ha guardado con éxito!");
    },

    onError: (error) => {
      alert(`Ha ocurrido un error inesperado ${error.message}`);
    },
  });

  return {
    gradesMutation,
    gradeStudentState,
    answersMutation,
    gradeExamQuery,
    questionsQuery,
  };
};
