import { useParams } from "react-router";
import { useTasks } from "../../presentation/tasks/useTasks";
import { useEffect, useState } from "react";
import type { Submission, Task } from "../../core/interfaces";
import { TaskComponent } from "../../components/modules/TaskComponent";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import { useSubmissions } from "../../presentation/tasks/useSubmissions";

export const ModuleTaskStudent = () => {
  const { id } = useParams();
  const moduleId = parseInt(id!);

  const { user } = useAuthStore();

  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [submissionsList, setSubmissionsList] = useState<Submission[]>([]);

  const { tasksQuery } = useTasks(moduleId);
  const { submissionsMutation, submissionsQuery } = useSubmissions(
    user?.id!,
    moduleId
  );

  useEffect(() => {
    if (tasksQuery.data) setTasksList(tasksQuery.data);
  }, [tasksQuery.data]);

  useEffect(() => {
    if (submissionsQuery.data) setSubmissionsList(submissionsQuery.data);
  }, [submissionsQuery.data]);

  return (
    <div>
      <h2 className="font-semibold text-center text-xl text-primary">
        Tareas del módulo
      </h2>
      <p className="text-text-secondary text-sm font-medium mt-2 px-8">
        Las tareas tienen un tiempo de caducidad, trata de resolverlas dentro
        del tiempo límite ya que después no podrás resolverlas
      </p>
      <p className="text-text-secondary text-sm font-medium mt-2 px-8">
        Sólo puedes subir archivos de formato PDF y con un tamaño máximo de 5MB
      </p>
      <p className="text-text-secondary text-sm font-medium mt-2 px-8">
        Puedes eliminar la entrega, pero sólo si esta no se encuentra
        calificada, ¡mucho ojo!
      </p>
      <h2 className="text-text font-semibold mt-4">Tareas disponibles</h2>
      <div className="flex flex-col space-y-4 mt-4 px-4">
        {tasksList.map((item, index) => (
          <TaskComponent
            key={index}
            student
            submission={submissionsList.find((s) => s.idTask === item.id)}
            item={item}
            onDeleteSubmission={() =>
              submissionsMutation.mutate({
                taskId: item.id!,
                path: submissionsList.find((s) => s.idTask === item.id)?.path,
              })
            }
            deleteLoading={submissionsMutation.isPending}
            uploadLoading={submissionsMutation.isPending}
            onUploadTask={(file) =>
              submissionsMutation.mutate({
                file,
                taskId: item.id!,
              })
            }
          />
        ))}
      </div>
    </div>
  );
};
