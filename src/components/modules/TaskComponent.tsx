import { MdDeleteForever } from "react-icons/md";
import type { Task } from "../../core/interfaces";
import { getFormattedDate } from "../../helpers/get-date-formatted";
import { ToggleComponent } from "../input/ToggleComponent";
import { Colors } from "../../assets/colors";

interface Props {
  item: Task;

  onDelete?: (id: number) => void;
  onPublish?: (id: number, value: boolean) => void;
  onModify?: (task: Task) => void;
}

export const TaskComponent = ({
  item,

  onDelete = () => {},
  onModify = () => {},
  onPublish = () => {},
}: Props) => {
  return (
    <div className="shadow-sm shadow-secondary p-2 rounded-xl">
      <div className="px-4">
        <h2 className="font-semibold text-lg text-text-secondary">
          {item.title}
        </h2>
        <div className="flex flex-col md:flex-row space-y-2 md:justify-between my-2">
          <p>
            <span className="font-semibold">Publicado el:</span>{" "}
            {getFormattedDate(`${item.publishedAt}`)}
          </p>
          <p>
            <span className="font-semibold">Trabajo disponible hasta el:</span>{" "}
            {getFormattedDate(`${item.dueDate}`)}
          </p>
        </div>
        <h2 className="font-semibold text-base">Instrucciones:</h2>
        <p className="whitespace-pre-line my-2">{item.description}</p>
      </div>
      <div className="flex flex-col px-4">
        <h2 className="mt-2 font-semibold text-base">Estado de la tarea</h2>
        <div className="flex flex-col md:flex-row space-y-2 md:justify-between my-2">
          <div className="flex items-center gap-4 mt-2 ml-4">
            <ToggleComponent
              id={`${item.id}`}
              checked={item.status ? item.status : false}
              onChange={(value) => onPublish(item.id!, value)}
            />
            <p className="font-semibold text-text-secondary">
              {item.status ? "Habilitado" : "Deshabilitado"}
            </p>
          </div>
          <button
            onClick={() => onDelete(item.id!)}
            className="flex items-center gap-4 cursor-pointer"
          >
            <p className="font-semibold">¿Eliminar tarea?</p>
            <MdDeleteForever color={Colors.danger} size={30} />
          </button>
        </div>
        <button
          onClick={() => onModify(item)}
          className="bg-secondary place-self-center p-2 text-text-secondary font-semibold rounded-xl hover:bg-secondary/60 cursor-pointer"
        >
          Modificar tarea
        </button>
      </div>
    </div>
  );
};
