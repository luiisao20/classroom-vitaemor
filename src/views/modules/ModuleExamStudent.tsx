import { useNavigate, useParams } from "react-router";
import { useStudentExam } from "../../presentation/exams/useStudentExam";
import { useEffect, useState } from "react";
import type { Exam } from "../../core/interfaces";
import { getFormattedDate } from "../../helpers/get-date-formatted";

export const ModuleExamStudent = () => {
  const { id } = useParams();
  const moduleId = parseInt(id!);
  const navigate = useNavigate();

  const [exam, setExam] = useState<Exam>();

  const { examQuery } = useStudentExam(moduleId);

  useEffect(() => {
    if (examQuery.data) setExam(examQuery.data);
  }, [examQuery.data]);

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
          exam?.status && "bg-secondary hover:bg-secondary/60 cursor-pointer"
        }`}
      >
        Iniciar evaluación
      </button>
    </div>
  );
};
