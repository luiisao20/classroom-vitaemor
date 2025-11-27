import { MdDeleteForever } from "react-icons/md";
import type { Submission, Task } from "../../core/interfaces";
import { getFormattedDate } from "../../helpers/get-date-formatted";
import { ToggleComponent } from "../input/ToggleComponent";
import { Colors } from "../../assets/colors";
import { FileInput } from "../input/InputFile";
import { useState } from "react";

interface Props {
  item: Task;
  student?: boolean;
  uploadLoading?: boolean;
  deleteLoading?: boolean;
  submission?: Submission;

  onDelete?: (id: number) => void;
  onDeleteSubmission?: () => void;
  onPublish?: (id: number, value: boolean) => void;
  onModify?: (task: Task) => void;
  onUploadTask?: (file: File) => void;
}

export const TaskComponent = ({
  item,
  student,
  uploadLoading,
  submission,
  deleteLoading,

  onDelete = () => {},
  onDeleteSubmission = () => {},
  onModify = () => {},
  onPublish = () => {},
  onUploadTask = () => {},
}: Props) => {
  const [file, setFile] = useState<File | null>();

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
            <span className="font-semibold">Disponible hasta el:</span>{" "}
            {getFormattedDate(`${item.dueDate}`)}
          </p>
        </div>
        <h2 className="font-semibold text-base">Instrucciones:</h2>
        <p className="whitespace-pre-line my-2 text-sm">{item.description}</p>
      </div>
      {student ? (
        submission ? (
          <div>
            <h2 className="text-center text-lg font-semibold text-primary">
              La tarea ya ha sido entregada
            </h2>
            <div className="flex flex-col md:flex-row justify-between px-6 py-2">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={submission.url}
                className="cursor-pointer hover:underline hover:underline-offset-2"
              >
                {submission.fileName}
              </a>
              {!submission.grade && (
                <button
                  onClick={onDeleteSubmission}
                  disabled={deleteLoading}
                  className={`flex items-center gap-4 cursor-pointer ${
                    deleteLoading && "cursor-progress"
                  }`}
                >
                  <p className="font-semibold">¿Eliminar entrega?</p>
                  <MdDeleteForever color={Colors.danger} size={30} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-2 px-8 mt-4">
            <FileInput
              description="para subir el archivo de la tarea"
              id={`${item.id}`}
              format=".pdf"
              file={file!}
              setFile={(file) => setFile(file)}
            />
            <button
              onClick={() => {
                if (file) onUploadTask(file);
                else alert("Debes subir una archivo primero!");
              }}
              disabled={uploadLoading}
              className={`text-white p-2 font-semibold text-center bg-secondary rounded-xl place-self-end cursor-pointer hover:bg-secondary/60 ${
                uploadLoading && "cursor-progress"
              }`}
            >
              Entregar tarea
            </button>
          </div>
        )
      ) : (
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
      )}
    </div>
  );
};
