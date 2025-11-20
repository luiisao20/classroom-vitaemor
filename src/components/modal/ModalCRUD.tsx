import { IoMdAddCircle } from "react-icons/io";

import { Formik } from "formik";

import { ModalComponent } from "./ModalComponent";
import { moduleForm } from "../../helpers/get-error-forms";
import { CustomErrorMessage } from "../general/CustomErrorMessage";
import { InputComponent } from "../input/InputComponent";

interface Props {
  open: boolean;
  loading?: boolean;

  onClose: () => void;
  onSendData?: (module: ModuleForm) => void;
}

interface ModuleForm {
  title: string;
  moduleNumber: number;
}

export const ModalCreateModule = ({
  open,
  loading,

  onClose,
  onSendData = () => {},
}: Props) => {
  const module: ModuleForm = {
    title: "",
    moduleNumber: 0,
  };

  return (
    <ModalComponent open={open} onClose={onClose}>
      <div className="relative bg-white rounded-lg shadow-sm">
        <div className="relative p-4 w-full max-h-full">
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
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Título
                    </label>
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
                    <label
                      htmlFor="number"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Número
                    </label>
                    <InputComponent
                      id="number"
                      label="Número del módulo del módulo"
                      type="number"
                      value={values.moduleNumber}
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
                  Agregar nueva conferencia
                </button>
              </>
            )}
          </Formik>
        </div>
      </div>
    </ModalComponent>
  );
};
