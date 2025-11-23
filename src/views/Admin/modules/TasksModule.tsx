import { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa6";
import { ModalCreateTask } from "../../../components/modal/ModalTask";
import type { Task } from "../../../core/interfaces";
import { useTasks } from "../../../presentation/tasks/useTasks";
import { useParams } from "react-router";
import { TaskComponent } from "../../../components/modules/TaskComponent";
import { ModalMessage } from "../../../components/modal/ModalMessage";

interface ModalMsg {
  open: boolean;
  message: string;
  showButtons: boolean;
  taskId: number;
}

export const TasksModule = () => {
  const { id } = useParams();
  const moduleId = parseInt(`${id}`);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<Task>();
  const [modalMsg, setModalMsg] = useState<ModalMsg>({
    message: "",
    open: false,
    showButtons: true,
    taskId: 0,
  });

  const {
    tasksMutation,
    tasksQuery,
    tasksDeleteMutation,
    tasksPublishMutation,
  } = useTasks(moduleId);

  useEffect(() => {
    if (tasksQuery.data) setTasksList(tasksQuery.data);
  }, [tasksQuery.data]);

  const handleDelete = async () => {
    await tasksDeleteMutation.mutateAsync(modalMsg.taskId);

    if (tasksDeleteMutation.isSuccess) {
      setModalMsg((prev) => ({
        ...prev,
        showButtons: false,
        message: "La tarea ha sido eliminada con éxito",
      }));
    }
  };

  const handleCreate = async (task: Task) => {
    await tasksMutation.mutateAsync(task);
    if (tasksMutation.isSuccess) setOpenModal(false);
  };

  return (
    <div>
      <ModalCreateTask
        open={openModal}
        taskToUpdate={taskToUpdate}
        onClose={() => setOpenModal(false)}
        onSendData={handleCreate}
        loading={tasksMutation.isPending}
      />
      <ModalMessage
        warning
        loading={tasksDeleteMutation.isPending}
        showButtons={modalMsg.showButtons}
        open={modalMsg.open}
        message={modalMsg.message}
        onClose={() => setModalMsg((prev) => ({ ...prev, open: false }))}
        onConfirm={() => handleDelete()}
      />
      <div className="flex justify-between items-center px-10 my-4">
        <h2 className="text-lg">¿Deseas crear una nueva tarea?</h2>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center bg-primary text-white rounded-xl p-2 gap-2 cursor-pointer hover:bg-primary/60"
        >
          <FaBook size={20} />
          <span className="text-lg">Crear</span>
        </button>
      </div>
      <div className="flex flex-col space-y-4 mt-4">
        {tasksList.length > 0 ? (
          tasksList.map((item, index) => (
            <TaskComponent
              key={index}
              onModify={(task) => {
                setTaskToUpdate(task);
                setOpenModal(true);
              }}
              item={item}
              onPublish={(id, value) =>
                tasksPublishMutation.mutate({ id, value })
              }
              onDelete={(id) =>
                setModalMsg((prev) => ({
                  ...prev!,
                  open: true,
                  message: "¿Estás seguro de realizar esta acción?",
                  taskId: id,
                  showButtons: true,
                }))
              }
            />
          ))
        ) : (
          <p>No existen tareas en este módulo</p>
        )}
      </div>
    </div>
  );
};
