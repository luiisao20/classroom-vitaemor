import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Exam } from "../../core/interfaces";
import { getFormattedDate } from "../../helpers/get-date-formatted";
import { useExamQuestions } from "../../presentation/exams/useExamQuestions";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import { useStudentExam } from "../../presentation/exams/useStudentExam";

export const ModuleExamStudent = () => {
  const { id } = useParams();
  const moduleId = parseInt(id!);
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const [exam, setExam] = useState<Exam>();
  const [examState, setExamState] = useState<number>();

  const { examQuery } = useExamQuestions(moduleId);
  const { gradeStudentState } = useStudentExam(user?.id, exam?.id);

  useEffect(() => {
    if (examQuery.data) setExam(examQuery.data);
  }, [examQuery.data]);

  useEffect(() => {
    if (gradeStudentState.data) setExamState(gradeStudentState.data);
  }, [gradeStudentState.data]);

  return (
    <div className="flex flex-col pb-10">
      <h2 className="text-xl font-semibold text-center text-primary">
        Bienvenido al examen de la conferencia
      </h2>
      <h2 className="text-lg font-semibold text-text-secondary">
        Instrucciones:
      </h2>
      <p className="whitespace-pre-line text-base text-justify mx-6">
        La evaluación está disponible hasta la fecha señalada.
      </p>
      <p className="whitespace-pre-line text-base text-justify mx-6">
        Existe una opción correcta por cada pregunta.
      </p>
      <p className="whitespace-pre-line text-base text-justify mx-6">
        Revisa bien antes de enviar el examen, ya que sólo existe un intento.
      </p>
      <p className="whitespace-pre-line text-base text-justify mx-6">
        Si recargas la página antes de enviar los datos, tu progreso se
        eliminará y debes volver a empezar desde cero.
      </p>
      {examState! > 0 ? (
        <>
          <h2 className="mt-6 font-semibold text-center text-lg text-text-secondary">
            El examen ya ha sido resuelto, no se admiten más intentos
          </h2>
        </>
      ) : (
        <>
          <h2 className="text-base my-4">
            <span className="font-semibold">Examen disponible hasta: </span>
            {getFormattedDate(`${exam?.dueDate}`) ?? "No disponible."}
          </h2>
          <h2 className="text-base my-4">
            <span className="font-semibold">Estado: </span>
            {exam?.status ? "Habilitado" : "No habilitado"}
          </h2>
          <button
            onClick={() => exam?.status && navigate(`${exam?.id}`)}
            disabled={!exam?.status}
            className={`text-lg place-self-center font-semibold bg-gray-300 text-white px-4 py-2 rounded-xl ${
              exam?.status &&
              "bg-secondary hover:bg-secondary/60 cursor-pointer"
            }`}
          >
            Iniciar evaluación
          </button>
        </>
      )}
    </div>
  );
};
