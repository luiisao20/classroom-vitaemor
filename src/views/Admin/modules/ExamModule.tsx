import { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa6";
import { useParams } from "react-router";
import { GrRadialSelected } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";

import type {
  Exam,
  Option,
  Question,
  QuestionType,
  QuestionWithOptions,
} from "../../../core/interfaces";
import { CustomDatePicker } from "../../../components/input/DatePicker";
import { ToggleComponent } from "../../../components/input/ToggleComponent";
import { useAdminExam } from "../../../presentation/exams/useAdminExam";
import { useTypes } from "../../../presentation/exams/useTypes";
import { InputComponent } from "../../../components/input/InputComponent";
import { Colors } from "../../../assets/colors";
import { useQuestions } from "../../../presentation/exams/useQuestions";
import { QuestionsListComponent } from "../../../components/modules/QuestionsComponent";

interface ErrorOption {
  show: boolean;
  message: string;
}

export const ExamModule = () => {
  const { id } = useParams();
  const moduleId = parseInt(`${id}`);

  const [examInfo, setExamInfo] = useState<Exam | undefined>();
  const [question, setQuestion] = useState<string>("");
  const [typesList, setTypesList] = useState<QuestionType[]>([]);
  const [questionType, setQuestionType] = useState<number>(1);
  const [option, setOption] = useState<string>("");
  const [errorOpt, setErrorOpt] = useState<ErrorOption>();
  const [correct, setCorrect] = useState<boolean>(false);
  const [optionsList, setOptionsList] = useState<Option[]>([]);
  const [questionsList, setQuestionsList] = useState<QuestionWithOptions[]>([]);

  const { typesQuery } = useTypes();
  const { examQuery, examMutation } = useAdminExam(moduleId);
  const { questionMutation, questionsAdminQuery, questionDeleteMutation } =
    useQuestions(examQuery.data?.id!);

  useEffect(() => {
    if (examQuery.data) setExamInfo(examQuery.data);
  }, [examQuery.data]);

  useEffect(() => {
    if (typesQuery.data) setTypesList(typesQuery.data);
  }, [typesQuery.data]);

  useEffect(() => {
    if (questionsAdminQuery.data) setQuestionsList(questionsAdminQuery.data);
  }, [questionsAdminQuery.data]);

  const handleAddOption = () => {
    if (option.trim() === "")
      return setErrorOpt({
        show: true,
        message: "No se puede agregar un valor vacío",
      });

    if (optionsList.some((opt) => opt.text === option))
      return setErrorOpt({ show: true, message: "Ya existe esta opción" });

    setOption("");
    setCorrect(false);
    setOptionsList((prev) => [...prev, { text: option, isCorrect: correct }]);
    setErrorOpt({
      show: false,
      message: "",
    });
  };

  const handleAddQuestion = async () => {
    if (question.trim() === "") return;

    if (questionType === 2) {
      const newQuestion: Question = {
        idExam: examInfo?.id!,
        idType: questionType,
        text: question,
      };

      await questionMutation.mutateAsync(newQuestion);
      setQuestion("");
      return;
    }

    if (!optionsList.some((opt) => opt.isCorrect === true)) {
      return setErrorOpt({
        show: true,
        message: "Debes agregar al menos una opción correcta",
      });
    }

    if (optionsList.length < 2) {
      return setErrorOpt({
        show: true,
        message: "Debes agregar al menos dos opciones",
      });
    }

    const newQuestion: QuestionWithOptions = {
      idExam: examInfo?.id!,
      idType: questionType,
      text: question,
      options: [...optionsList],
    };

    await questionMutation.mutateAsync(newQuestion);

    setQuestion("");
    setOptionsList([]);
    setErrorOpt({
      show: false,
      message: "",
    });
  };

  return (
    <>
      {!examInfo ? (
        <div className="flex justify-between items-center px-10 my-4">
          <h2 className="text-lg">
            Da click en el botón para crear el examen del módulo
          </h2>
          <button
            onClick={() => examMutation.mutate(undefined)}
            disabled={examMutation.isPending}
            className={`flex items-center bg-primary text-white rounded-xl p-2 gap-2 cursor-pointer hover:bg-primary/60 ${
              examMutation.isPending && "cursor-progress"
            }`}
          >
            <FaBook size={20} />
            <span className="text-lg">Crear</span>
          </button>
        </div>
      ) : (
        <div className="">
          <h2 className="text-lg my-4 font-semibold text-center text-primary">
            Examen
          </h2>
          <div className="flex flex-col pb-4 space-y-3 border-b border-secondary">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col space-y-2">
                <p className="font-semibold">Habilitado hasta:</p>
                <CustomDatePicker
                  selected={examInfo.dueDate}
                  onChange={(date) =>
                    setExamInfo({ ...examInfo, dueDate: date })
                  }
                />
              </div>
              <div className="flex items-center gap-4 mt-2 ml-4">
                <ToggleComponent
                  id={`${id}`}
                  checked={examInfo.status ?? false}
                  onChange={(checked) =>
                    setExamInfo({ ...examInfo, status: checked })
                  }
                />
                <p className="font-semibold text-text-secondary">
                  {examInfo.status ? "Habilitado" : "Deshabilitado"}
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-base mb-4">
                <span className="font-semibold">Revisión del examen:</span>{" "}
                {examInfo.review ? "Habilitado" : "No habilitado"}
              </h2>
              <div className="flex gap-6 items-center">
                <h2 className="font-semibold">
                  Habilitar / Deshabilitar revisión:
                </h2>
                <ToggleComponent
                  id="review"
                  checked={examInfo.review!}
                  onChange={(checked) =>
                    setExamInfo({ ...examInfo, review: checked })
                  }
                />
              </div>
            </div>
            <button
              onClick={() => examMutation.mutate(examInfo)}
              className="p-2 cursor-pointer bg-secondary hover:bg-secondary/60 text-text-secondary rounded-xl place-self-center"
            >
              Actualizar información
            </button>
          </div>
          <div className="mt-4 flex flex-col space-y-2 border-b border-secondary">
            <h2 className="text-primary font-semibold text-xl text-center">
              Ingresar las preguntas del examen
            </h2>
            <h2 className="font-semibold">
              Pasos para ingresar las preguntas:
            </h2>
            <ol className="list-decimal list-inside mx-4 my-2 space-y-4 text-justify">
              <li className="leading-6">
                Escoja una opción, ya sea de{" "}
                <span className="font-semibold">opción múltiple</span> o{" "}
                <span className="font-semibold">llenado</span>.
              </li>
              <li className="leading-6">
                Escriba la pregunta en el cuadro de texto y presione el{" "}
                <span className="font-semibold">botón de agregar</span>.
              </li>
              <li className="leading-6">
                Si la pregunta es de opción mútiple, ingrese las opciones
                necesarias,{" "}
                <span className="font-semibold">
                  mínimo 2 por cada pregunta
                </span>{" "}
                y además selecciona si la opción es la correcta mediante el{" "}
                <span className="font-semibold">cuadro de confirmación</span>{" "}
                (una opción correcta por cada pregunta).
              </li>
              <li className="leading-6">
                Si necesita eliminar, ya sea una pregunta o una opción,{" "}
                <span className="font-semibold">
                  sólo da clic encima de cada una de ellas.
                </span>
              </li>
              <li className="leading-6">
                Las preguntas se van{" "}
                <span className="font-semibold">
                  guardando o eliminando automáticamente
                </span>
                , ten paciencia si por cada una toma algo de tiempo al
                agregarlas.
              </li>
            </ol>
          </div>
          <div className="mb-10 mt-4">
            <div className="mx-4 flex flex-col space-y-4">
              <QuestionsListComponent
                questions={questionsList}
                isDeleting={questionDeleteMutation.isPending}
                onDelete={(id) => questionDeleteMutation.mutate(id)}
              />
              <h2 className="text-text-secondary font-semibold">
                Agrega una pregunta
              </h2>
              <div>
                <select
                  onChange={(e) => setQuestionType(parseInt(e.target.value))}
                  id="types"
                  className="bg-gray-50 border border-gray-300 w-1/3 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-0 block p-2.5"
                >
                  {typesList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.type}
                    </option>
                  ))}
                </select>
              </div>
              <InputComponent
                id="question"
                label="Ingresa una pregunta"
                text={question}
                onChangeText={(text) => setQuestion(text)}
              />
              {questionType === 1 && (
                <>
                  <ul className="list-inside mx-4 space-y-4 mb-4">
                    {optionsList.map((opt) => (
                      <div
                        onClick={() =>
                          setOptionsList((prev) =>
                            prev.filter((optL) => optL.text !== opt.text)
                          )
                        }
                        key={opt.id}
                        className="flex gap-4 text-justify"
                      >
                        <GrRadialSelected
                          color={opt.isCorrect ? Colors.secondary : "black"}
                        />
                        <li>{opt.text}</li>
                      </div>
                    ))}
                  </ul>
                  <div className="mx-8 flex gap-2 items-center">
                    <div className="relative w-2/3 z-0 group">
                      <InputComponent
                        id="option"
                        label="Ingresa una opción"
                        text={option}
                        onKeyDown={(event) =>
                          event.key === "Enter" && handleAddOption()
                        }
                        onChangeText={(text) => setOption(text)}
                      />
                      {errorOpt?.show && (
                        <p className="text-xs text-danger mt-2">
                          {errorOpt.message}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center">
                      <input
                        checked={correct}
                        onChange={(e) => setCorrect(e.target.checked)}
                        id="red-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-secondary bg-gray-100 border-gray-300 rounded-sm focus:ring-secondary/60 focus:ring-2"
                      />
                      <label
                        htmlFor="red-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900"
                      >
                        ¿Opción correcta?
                      </label>
                    </div>
                    <IoMdAddCircleOutline
                      className="cursor-pointer text-primary transition-all duration-300 hover:rotate-90"
                      onClick={handleAddOption}
                      size={30}
                    />
                  </div>
                </>
              )}
              <button
                onClick={handleAddQuestion}
                disabled={questionMutation.isPending}
                className={`cursor-pointer ${
                  questionMutation.isPending && "cursor-progress"
                }`}
              >
                <IoMdAddCircleOutline
                  className="place-self-center mt-2 text-primary transition-all duration-300 hover:rotate-90"
                  size={30}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
