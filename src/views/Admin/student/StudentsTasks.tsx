import { useParams } from "react-router";
import { useTasks } from "../../../presentation/tasks/useTasks";
import { useSubmissions } from "../../../presentation/tasks/useSubmissions";
import { useEffect, useState } from "react";
import type { Submission, Task } from "../../../core/interfaces";
import { TaskGradeComponent } from "../../../components/modules/TaskGradeComponent";

export const StudentsTasks = () => {
  const { id, moduleId } = useParams();
  const idModule = parseInt(moduleId!);

  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [submissionsList, setSubmissionsList] = useState<Submission[]>([]);

  const { tasksQuery } = useTasks(idModule);
  const { submissionsQuery, gradeMutation } = useSubmissions(id!, idModule);

  useEffect(() => {
    if (tasksQuery.data) setTasksList(tasksQuery.data);
  }, [tasksQuery.data]);

  useEffect(() => {
    if (submissionsQuery.data) setSubmissionsList(submissionsQuery.data);
  }, [submissionsQuery.data]);

  return (
    <div className="mb-10">
      <h2 className="text-center font-semibold text-text-secondary my-6">
        Tareas del módulo
      </h2>
      <div className="flex flex-col space-y-6">
        {tasksList.map((item, index) => (
          <TaskGradeComponent
            key={index}
            loading={gradeMutation.isPending}
            onUpdateGrade={(data) => {
              const { feedback, grade } = data;
              const newSubmission: Submission = {
                ...submissionsList.find((s) => s.idTask === item.id)!,
                grade: grade,
                feedback: feedback ?? null,
              };
              gradeMutation.mutate(newSubmission);
            }}
            assignment={submissionsList.find((s) => s.idTask === item.id)}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};
