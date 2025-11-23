import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Question, QuestionWithOptions } from "../../core/interfaces";
import {
  insertQuestionWithOptions,
  insertSimpleQuestion,
} from "../../core/database/exams/insert-questions";
import { getQuestionsByExam } from "../../core/database/exams/get-questions-by-exam.action";
import { deleteQuestion } from "../../core/database/exams/delete-question.action";

export const useQuestions = (idExam: number) => {
  const queryClient = useQueryClient();

  const questionsAdminQuery = useQuery({
    queryFn: () => getQuestionsByExam(idExam),
    queryKey: ["questions", idExam],
    staleTime: 1000 * 60 * 60,
    enabled: !!idExam,
  });

  const questionMutation = useMutation({
    mutationFn: (question: Question | QuestionWithOptions) =>
      "options" in question
        ? insertQuestionWithOptions(question)
        : insertSimpleQuestion(question),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions", idExam],
      });
    },

    onError: (error) => {
      alert(`Existe un error inesperado ${error}`);
    },
  });

  const questionDeleteMutation = useMutation({
    mutationFn: (questionId: number) => deleteQuestion(questionId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions", idExam],
      });
    },

    onError: (error) => {
      alert(`Existe un error inesperado ${error}`);
    },
  });

  return { questionMutation, questionsAdminQuery, questionDeleteMutation };
};
