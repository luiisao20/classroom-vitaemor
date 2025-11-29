import { useEffect, useState } from "react";
import type {
  Answer,
  Option,
  QuestionWithOptions,
} from "../../core/interfaces";
import { useQuestions } from "../../presentation/exams/useQuestions";
import { useNavigate, useParams } from "react-router";
import { ModalMessage } from "../../components/modal/ModalMessage";
import { useStudentExam } from "../../presentation/exams/useStudentExam";
import { useAuthStore } from "../../presentation/store/useAuthStore";

interface Modal {
  open: boolean;
  message: string;
  warning: boolean;
}

export const ModuleExamScreen = () => {
  const { examId } = useParams();
  const id = parseInt(examId!);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [questionsList, setQuestionsList] = useState<QuestionWithOptions[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [modal, setModal] = useState<Modal>({
    open: false,
    message: "",
    warning: true,
  });
  const [examState, setExamState] = useState<number>();

  const { answersMutation, gradeStudentState } = useStudentExam(user?.id, id);
  const { questionsAdminQuery } = useQuestions(id);

  useEffect(() => {
    if (questionsAdminQuery.data) setQuestionsList(questionsAdminQuery.data);
  }, [questionsAdminQuery.data]);

  useEffect(() => {
    if (gradeStudentState.data) setExamState(gradeStudentState.data);
  }, [gradeStudentState.data]);

  useEffect(() => {
    if (questionsAdminQuery.data) {
      const epmtyAnswers: Answer[] = questionsAdminQuery.data.map((item) => ({
        questionId: item.id!,
        typeId: item.idType,
      }));
      setAnswers(epmtyAnswers);
    }
  }, [questionsAdminQuery.data]);

  const handleSelectOption = (questionId: number, option: Option) => {
    setAnswers((prev) =>
      prev.map((a) =>
        a.questionId === questionId
          ? { ...a, optionId: option.id, grade: option.isCorrect ? 1 : 0 }
          : a
      )
    );
  };

  const handleWriteAnswer = (questionId: number, text: string) => {
    setAnswers((prev) =>
      prev.map((a) => (a.questionId === questionId ? { ...a, text: text } : a))
    );
  };

  const hanldeShowModal = () => {
    const notAnswered = answers
      .filter(
        (answer) =>
          (!answer.optionId && !answer.text) || answer.text?.trim() === ""
      )
      .map((answer) => {
        const questionNumber = questionsList.findIndex(
          (q) => q.id === answer.questionId
        );
        return questionNumber !== -1 ? questionNumber + 1 : null;
      })
      .filter((num) => num !== null);

    if (notAnswered.length > 0) {
      setModal((prev) => ({
        ...prev!,
        open: true,
        warning: true,
        message: `Estas preguntas están sin responder
          ${notAnswered.join("; ")}
          ¿Estás seguro de enviar los datos?
          Esta acción no se puede deshacer
        `,
      }));
      return;
    }
    setModal((prev) => ({
      ...prev,
      open: true,
      message:
        "¿Estás seguro de enviar los datos? Esta acción no se puede deshacer",
      warning: false,
    }));
  };

  if (gradeStudentState.isLoading) {
    return;
  }

  if (examState === 1) {
    return <h1>Forbidden</h1>;
  }

  return (
    <>
      <ModalMessage
        open={modal.open}
        message={modal.message}
        onClose={() => setModal((prev) => ({ ...prev, open: false }))}
        warning={modal.warning}
        showButtons
        loading={answersMutation.isPending}
        onConfirm={async () => {
          await answersMutation.mutateAsync({ answers, userId: user?.id! });
          navigate(-1);
        }}
      />
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-center text-primary">
          Contesta las siguientes preguntas
        </h2>
        <p className="font-semibold text-text-secondary text-base my-4">
          Sólo hay una opción correcta en las preguntas de opción múltiple.
        </p>
        <div className="mb-4">
          {questionsList.map((item, index) => (
            <div key={index} className="px-6">
              {item.idType === 1 ? (
                <div className="flex flex-col space-y-4">
                  <h2 className="font-semibold text-primary">
                    {questionsList.findIndex((e) => e.id === item.id) + 1}.{" "}
                    {item.text}
                  </h2>
                  {item.options.map((opt, subIndex) => (
                    <div
                      key={index + subIndex}
                      className="flex items-center mb-4 px-4"
                    >
                      <input
                        id={`question-${item.id}-option-${opt.id}`}
                        type="radio"
                        checked={
                          answers.some((a) => a.optionId === opt.id) ?? false
                        }
                        onChange={() => handleSelectOption(item.id!, opt)}
                        name={`question-${index}`}
                        value="USA"
                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-primary/30"
                      />
                      <label
                        htmlFor={`question-${item.id}-option-${opt.id}`}
                        className="block ms-2  text-sm font-medium"
                      >
                        {opt.text}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <label
                    htmlFor={`answer-${item.id}`}
                    className="font-semibold text-primary"
                  >
                    {questionsList.findIndex((e) => e.text === item.text) + 1}.{" "}
                    {item.text}
                  </label>
                  <div className="mx-4">
                    <textarea
                      value={
                        answers.find((a) => a.questionId === item.id)?.text ??
                        ""
                      }
                      onChange={(e) =>
                        handleWriteAnswer(item.id!, e.target.value)
                      }
                      id={`answer-${item.id}`}
                      rows={3}
                      className="w-full p-2.5 border border-text-secondary/60 rounded-xl text-sm text-gray-900 focus:ring-0 bg-gray-50 focus:outline-none"
                      placeholder="Respuesta..."
                    ></textarea>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={hanldeShowModal}
          className={`bg-secondary place-self-end text-text-secondary p-4 font-semibold rounded-xl cursor-pointer hover:bg-secondary/60`}
        >
          Enviar examen
        </button>
      </div>
    </>
  );
};
