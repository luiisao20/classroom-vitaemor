import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasksByModule } from "../../core/database/tasks/get-tasks-by-module.action";
import type { Task } from "../../core/interfaces";
import { updateTask } from "../../core/database/tasks/update-task.action";
import { insertNewTask } from "../../core/database/tasks/insert-new-task.action";
import { publishTask } from "../../core/database/tasks/publish-task.action";
import { deleteTask } from "../../core/database/tasks/delete-task.action";

export const useTasks = (moduleId: number) => {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryFn: () => getTasksByModule(moduleId),
    queryKey: ["tasks", moduleId],
    staleTime: 1000 * 60 * 60,
  });

  const tasksMutation = useMutation({
    mutationFn: (task: Task) =>
      task.id ? updateTask(task) : insertNewTask(task, moduleId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", moduleId],
      });
    },

    onError: (error) => {
      alert(`Ha ocurrido un error ${error.message}`);
    },
  });

  const tasksPublishMutation = useMutation({
    mutationFn: ({ id, value }: { id: number; value: boolean }) =>
      publishTask(id, value),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", moduleId],
      });
      alert("La tarea se ha actualizado!");
    },

    onError: (error) => {
      alert(`Ha ocurrido un error ${error.message}`);
    },
  });

  const tasksDeleteMutation = useMutation({
    mutationFn: (id: number) => deleteTask(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", moduleId],
      });
    },

    onError: (error) => {
      alert(`Ha ocurrido un error ${error.message}`);
    },
  });

  return {
    tasksQuery,
    tasksMutation,
    tasksPublishMutation,
    tasksDeleteMutation,
  };
};
