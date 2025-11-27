import { IoMdAddCircle } from "react-icons/io";

import { Formik } from "formik";

import { ModalComponent } from "./ModalComponent";
import { moduleForm } from "../../helpers/get-error-forms";
import { CustomErrorMessage } from "../general/CustomErrorMessage";
import { InputComponent } from "../input/InputComponent";
import { IoClose } from "react-icons/io5";

interface Props {
  open: boolean;
  loading?: boolean;

  onClose: () => void;
  onSendData?: (module: ModuleForm) => void;
}

interface ModuleForm {
  title: string;
  moduleNumber: string;
}

export const ModalCreateModule = ({
  open,
  loading,

  onClose,
  onSendData = () => {},
}: Props) => {
  const module: ModuleForm = {
    title: "",
    moduleNumber: "",
  };

  return (
    <ModalComponent open={open} onClose={onClose}>
      <div className="relative bg-white rounded-lg shadow-sm">
        <div className="relative p-4 w-full max-h-full">
          <div className="p-4 md:p-5 border-b mb-4 rounded-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Crear un nuevo módulo
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
            initialValues={module}
            validationSchema={moduleForm}
            onSubmit={(formLike) => onSendData(formLike)}
          >
            {({
              values,
              errors,
              touched,

              handleSubmit,
              handleChange,
              handleBlur,
            }) => (
              <>
                <div className="flex flex-col gap-2 mb-4">
                  <div>
                    <InputComponent
                      id="title"
                      label="Título del módulo"
                      text={values.title}
                      onChangeText={handleChange("title")}
                      onBlur={handleBlur("title")}
                    />
                    <CustomErrorMessage
                      name="title"
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div>
                    <InputComponent
                      id="number"
                      label="Número del módulo del módulo"
                      type="number"
                      value={`${values.moduleNumber}`}
                      onChangeText={handleChange("moduleNumber")}
                      onBlur={handleBlur("moduleNumber")}
                    />
                    <CustomErrorMessage
                      name="moduleNumber"
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                </div>
                <button
                  disabled={loading}
                  onClick={() => handleSubmit()}
                  type="submit"
                  className={`text-black inline-flex items-center bg-secondary hover:bg-secondary/60 cursor-pointer focus:ring-4 focus:outline-none focus:ring-secondary/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                    loading && "cursor-progress"
                  }`}
                >
                  <IoMdAddCircle className="mr-4" size={20} />
                  Agregar nuevo módulo
                </button>
              </>
            )}
          </Formik>
        </div>
      </div>
    </ModalComponent>
  );
};
