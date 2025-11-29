import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { uploadUserTask } from "../../core/storage/upload-user-task.action";
import { getStudentSubmissions } from "../../core/database/tasks/get-student-submissions.action";
import { deleteUserSubmission } from "../../core/storage/delete-user-submission.action";
import { updateTaskGrade } from "../../core/storage/update-task-grade.action";
import type { Submission } from "../../core/interfaces";

export const useSubmissions = (userId: string, moduleId: number) => {
  const queryClient = useQueryClient();

  const submissionsQuery = useQuery({
    queryFn: () => getStudentSubmissions(userId, moduleId),
    queryKey: ["submissions", userId, moduleId],
    staleTime: 1000 * 60 * 60,
  });

  const submissionsMutation = useMutation({
    mutationFn: ({
      file,
      taskId,
      path,
    }: {
      file?: File;
      taskId: number;
      path?: string;
    }) =>
      file
        ? uploadUserTask(file, userId, taskId)
        : deleteUserSubmission(taskId, path!, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["submissions", userId, moduleId],
      });
    },

    onError: (error) => {
      alert(`Ha ocurrido un error ${error.message}`);
    },
  });

  const gradeMutation = useMutation({
    mutationFn: (submission: Submission) => updateTaskGrade(submission, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["submissions", userId, moduleId],
      });
      alert("¡La calificación de la tarea se ha actualizado!");
    },

    onError: (error) => {
      alert(`Ha ocurrido un error ${error.message}`);
    },
  });

  return {
    submissionsQuery,
    submissionsMutation,
    gradeMutation,
  };
};
