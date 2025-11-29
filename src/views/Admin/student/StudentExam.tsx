import { useParams } from "react-router";
import { useAdminExam } from "../../../presentation/exams/useAdminExam";
import { useEffect, useState } from "react";
import { useStudentExam } from "../../../presentation/exams/useStudentExam";
import { Form, Formik } from "formik";
import type { GradesByQuestion, StudentAnswer } from "../../../core/interfaces";
import { buildGradesSchema } from "../../../helpers/get-error-forms";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { InputComponent } from "../../../components/input/InputComponent";
import { ModalMessage } from "../../../components/modal/ModalMessage";

interface ModaProps {
  open: boolean;
  message: string;
  showButtons: boolean;
  warning: boolean;
}

export const StudentExam = () => {
  const { id, moduleId } = useParams();
  const idModule = parseInt(moduleId!);

  const [examGrade, setExamGrade] = useState<number>();
  const [modalProps, setModalProps] = useState<ModaProps>({
    open: false,
    message: "",
    showButtons: true,
    warning: true,
  });
  const [initialValues, setInitialValues] = useState<{
    grades: Record<number, string>;
  }>({ grades: {} });
  const [examQuestions, setExamQuestions] = useState<StudentAnswer[]>([]);
  const [newDataAnswers, setNewDataAnswers] = useState<{
    grades: GradesByQuestion[];
    totalGrade: number;
  }>();

  const { examQuery } = useAdminExam(idModule);
  const { gradeExamQuery, questionsQuery, gradesMutation } = useStudentExam(
    id,
    examQuery.data?.id
  );

  useEffect(() => {
    if (gradeExamQuery.data !== null) setExamGrade(gradeExamQuery.data);
  }, [gradeExamQuery.data]);

  useEffect(() => {
    if (questionsQuery.data) setExamQuestions(questionsQuery.data);
  }, [questionsQuery.data]);

  useEffect(() => {
    if (examQuestions) {
      setInitialValues({
        grades: examQuestions.reduce((acc, item) => {
          acc[item.idQuestion] =
            item.questionType === 1 ? (item.isCorrect ? "1" : "0") : "";
          return acc;
        }, {} as Record<number, string>),
      });
    }
  }, [examQuestions]);

  const handleShowModal = async (
    gradesArray: GradesByQuestion[],
    setSubmitting: (value: boolean) => void
  ) => {
    const totalGrade =
      (gradesArray.reduce(
        (total: number, current) => total + parseInt(current.grade),
        0
      ) *
        10) /
      gradesArray.length;

    setNewDataAnswers({
      grades: gradesArray,
      totalGrade: totalGrade,
    });

    setModalProps((prev) => ({
      ...prev!,
      open: true,
      warning: false,
      message: ` ¿Estás seguro de guardar las calificaciones?
        Nota final ${totalGrade.toFixed(2)}
      `,
      showButtons: true,
    }));
    setSubmitting(false);
  };

  return (
    <>
      <ModalMessage
        open={modalProps.open}
        warning={modalProps.warning}
        message={modalProps.message}
        loading={gradesMutation.isPending}
        showButtons={modalProps.showButtons}
        onClose={() => setModalProps((prev) => ({ ...prev, open: false }))}
        onConfirm={async () => {
          await gradesMutation.mutateAsync({
            grades: newDataAnswers?.grades!,
            totalGrade: newDataAnswers?.totalGrade!,
          });
          setModalProps((prev) => ({
            ...prev,
            message: "La calificación se guardó con éxito",
            showButtons: false,
          }));
        }}
      />
      <div className="mt-6 mb-10">
        <h2 className="font-semibold mb-3 text-center text-text-secondary">
          Respuestas del estudiante
        </h2>
        <h2 className="text-text-secondary mb-6">
          <span className="font-semibold">Calificación del examen:</span>{" "}
          {examGrade?.toFixed(2)}
        </h2>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={buildGradesSchema(examQuestions)}
          onSubmit={(values, { setSubmitting }) => {
            const gradesArray: GradesByQuestion[] = Object.entries(
              values.grades
            ).map(([idQuestion, grade]) => ({
              idQuestion: Number(idQuestion),
              grade: String(grade),
            }));
            handleShowModal(gradesArray, () => setSubmitting(false));
          }}
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }) => (
            <Form>
              <div className="flex flex-col space-y-4">
                {examQuestions.map((item, index) => (
                  <div
                    key={index}
                    className="shadow-sm shadow-secondary p-2 rounded-xl"
                  >
                    <h2 className="font-semibold mb-2 text-primary text-justify flex justify-between items-center mr-10">
                      {index + 1}. {item.question}
                    </h2>
                    <div className="mx-6">
                      {item.questionType === 1 ? (
                        <div>
                          <p className="flex gap-2 items-center">
                            {item.isCorrect ? (
                              <FaCheck className="w-6 h-6 text-success" />
                            ) : (
                              <FaXmark className="w-6 h-6 text-danger" />
                            )}
                            {item.optionSelected ?? (
                              <span className="font-semibold underline underline-offset-2 italic">
                                Pregunta sin respuesta
                              </span>
                            )}
                          </p>
                          {!item.isCorrect && (
                            <p className="my-2">
                              <span className="font-semibold">
                                Opción correcta:
                              </span>{" "}
                              {item.correctOption}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="whitespace-pre-line">
                          {item.answer ?? (
                            <span className="font-semibold underline underline-offset-2 italic">
                              Pregunta sin respuesta
                            </span>
                          )}
                        </p>
                      )}
                      <div className="flex flex-col items-end justify-end gap-2">
                        <InputComponent
                          id={`grades-${item.idQuestion}`}
                          label="Calificación sobre 1"
                          text={values.grades[item.idQuestion]}
                          onChangeText={(text) =>
                            setFieldValue(`grades.${item.idQuestion}`, text)
                          }
                          disabled={item.questionType === 1}
                        />
                        {errors.grades?.[item.idQuestion] &&
                          touched.grades?.[item.idQuestion] && (
                            <div className="text-red-500 text-sm">
                              {errors.grades[item.idQuestion]}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`place-self-end py-2 px-4 rounded-xl text-text-secondary font-semibold cursor-pointer ${"bg-secondary hover:bg-secondary/60"}`}
                >
                  Guardar calificación
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
