import { Formik } from "formik";
import type { Submission, Task } from "../../core/interfaces";
import { gradeForm } from "../../helpers/get-error-forms";
import { getFormattedDate } from "../../helpers/get-date-formatted";
import { CustomErrorMessage } from "../general/CustomErrorMessage";
import { MdOutlineGrade } from "react-icons/md";
import { InputComponent } from "../input/InputComponent";

interface Props {
  item: Task;
  assignment?: Submission;
  loading: boolean;

  onUpdateGrade: (form: FormGrade) => void;
}

interface FormGrade {
  grade?: number;
  feedback: string;
}

export const TaskGradeComponent = ({
  item,
  assignment,
  loading,

  onUpdateGrade,
}: Props) => {
  const formGrade: FormGrade = {
    feedback: assignment?.feedback ?? "",
    grade: assignment?.grade ? parseInt(`${assignment.grade}`) : undefined,
  };

  return (
    <div>
      <div className="shadow shadow-secondary rounded-xl p-3">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col space-y-2">
            <h2 className="text-base">
              <span className="font-semibold">Trabajo sincrónico:</span>{" "}
              {item.title}
            </h2>
          </div>
        </div>
        {assignment ? (
          <div>
            <h2 className="text-lg font-semibold text-center text-primary">
              Tarea entregada
            </h2>
            <div className="flex flex-col space-y-2 mb-4">
              <h2 className="text-sm">
                <span className="font-semibold">Subido el: </span>
                {getFormattedDate(`${assignment.createdAt}`)}
              </h2>
              <h2 className="text-sm">
                <span className="font-semibold">Archivo: </span>
                <a
                  href={assignment.url}
                  target="_blank"
                  className="cursor-pointer hover:underline hover:underline-offset-2"
                >
                  {assignment.fileName}
                </a>
              </h2>
            </div>
            <Formik
              validationSchema={gradeForm}
              initialValues={formGrade}
              onSubmit={(formLike) => onUpdateGrade(formLike)}
            >
              {({
                values,
                errors,
                touched,

                handleSubmit,
                handleChange,
                handleBlur,
              }) => (
                <div className="flex flex-col gap-4 px-6">
                  <InputComponent
                    type="number"
                    label="Escribe la calificación con punto como decimal (7.5 7 10)"
                    name={`grade-${item.id}`}
                    id={`grade-${item.id}`}
                    placeholder="Calificación de la tarea"
                    text={values.grade ? `${values.grade}` : ""}
                    onChangeText={handleChange("grade")}
                    onBlur={handleBlur("grade")}
                  />
                  <CustomErrorMessage
                    name="grade"
                    errors={errors}
                    touched={touched}
                  />
                  <InputComponent
                    id={`feedback-${item.id}`}
                    name={`feedback-${item.id}`}
                    label="Escribe un comentario para la tarea (opcional)"
                    text={values.feedback}
                    onChangeText={handleChange("feedback")}
                    onBlur={handleBlur("feedback")}
                  />
                  <CustomErrorMessage
                    name="feedback"
                    errors={errors}
                    touched={touched}
                  />
                  <button
                    onClick={() => handleSubmit()}
                    disabled={loading}
                    type="submit"
                    className={`text-text-secondary inline-flex items-center bg-secondary hover:bg-secondary/60 cursor-pointer focus:ring-4 focus:outline-none focus:ring-secondary/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center place-self-end ${
                      loading && "cursor-progress"
                    }`}
                  >
                    <MdOutlineGrade className="mr-4" size={20} />
                    Calificar tarea
                  </button>
                </div>
              )}
            </Formik>
          </div>
        ) : (
          <h2 className="text-primary text-center font-semibold my-6">
            La tarea aún no se encuentra subida
          </h2>
        )}
      </div>
    </div>
  );
};
