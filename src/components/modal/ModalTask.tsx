import { IoMdAddCircle } from "react-icons/io";

import { Formik } from "formik";

import { ModalComponent } from "./ModalComponent";
import { taskForm } from "../../helpers/get-error-forms";
import { CustomErrorMessage } from "../general/CustomErrorMessage";
import { InputComponent } from "../input/InputComponent";
import type { Task } from "../../core/interfaces";
import dayjs from "dayjs";
import { CustomDatePicker } from "../input/DatePicker";
import { IoClose } from "react-icons/io5";

interface Props {
  open: boolean;
  loading?: boolean;
  taskToUpdate?: Task;

  onClose: () => void;
  onSendData?: (task: Task) => void;
}

export const ModalCreateTask = ({
  open,
  loading,
  taskToUpdate,

  onClose,
  onSendData = () => {},
}: Props) => {

  const task: Task = {
    id: taskToUpdate?.id ?? undefined,
    title: taskToUpdate ? taskToUpdate.title : "",
    dueDate: taskToUpdate ? dayjs(taskToUpdate.dueDate) : dayjs(new Date()),
    description: taskToUpdate ? taskToUpdate.description : "",
  };

  return (
    <ModalComponent open={open} onClose={onClose}>
      <div className="relative bg-white rounded-lg shadow-sm">
        <div className="relative p-4 w-full max-h-full">
          <div className="p-4 md:p-5 border-b mb-4 rounded-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Crear una nueva tarea para el módulo
            </h3>
          </div>
          <button
            type="button"
            className="text-gray-400 cursor-pointer bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center absolute top-4 right-4"
            onClick={onClose}
          >
            <IoClose
              size={30}
              className="transition-all duration-200 hover:rotate-90"
            />
            <span className="sr-only">Close modal</span>
          </button>
          <Formik
            initialValues={task}
            validationSchema={taskForm}
            onSubmit={(formLike) => onSendData(formLike)}
          >
            {({
              values,
              errors,
              touched,

              handleSubmit,
              handleChange,
              handleBlur,
              setFieldValue,
            }) => (
              <>
                <div className="flex flex-col gap-2 mb-4">
                  <div>
                    <InputComponent
                      id="title"
                      label="Escribe el título de la tarea"
                      onChangeText={handleChange("title")}
                      onBlur={handleBlur("title")}
                      text={values.title}
                    />
                    <CustomErrorMessage
                      name="title"
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dueDate"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Fecha límite
                    </label>
                    <CustomDatePicker
                      selected={values.dueDate}
                      onChange={(date) => setFieldValue("dueDate", date)}
                    />
                    <CustomErrorMessage
                      name="dueDate"
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="instructions"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Instrucciones
                    </label>
                    <textarea
                      id="instructions"
                      rows={4}
                      className="w-full p-2.5 border border-text-secondary/60 rounded-xl text-sm text-gray-900 focus:ring-0 bg-gray-50 focus:outline-none"
                      placeholder="Escribe las instrucciones para la tarea"
                      value={values.description}
                      onChange={handleChange("description")}
                      onBlur={handleBlur("description")}
                    ></textarea>
                    <CustomErrorMessage
                      name="description"
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                </div>
                <button
                  disabled={loading}
                  onClick={() => handleSubmit()}
                  type="submit"
                  className={`text-text inline-flex items-center bg-secondary hover:bg-secondary/60 cursor-pointer focus:ring-4 focus:outline-none focus:ring-secondary/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                    loading && "cursor-progress"
                  }`}
                >
                  <IoMdAddCircle className="mr-4" size={20} />
                  {taskToUpdate ? "Actualizar tarea" : "Agregar nueva tarea"}
                </button>
              </>
            )}
          </Formik>
        </div>
      </div>
    </ModalComponent>
  );
};
