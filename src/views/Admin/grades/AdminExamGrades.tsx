import { useEffect, useState } from "react";
import { useModules } from "../../../presentation/modules/useModules";
import type { Module, StudentGradeExam } from "../../../core/interfaces";
import { useOneModule } from "../../../presentation/modules/useOneModule";
import { useExamGrades } from "../../../presentation/grades/useExamGrades";
import { StudentGradesGeneral } from "../../../components/students/StudentGradesGeneral";
import { useAdminExam } from "../../../presentation/exams/useAdminExam";

interface OptionFilter {
  id: number;
  name: "Completados" | "No completados" | "Aprobadas" | "No aprobadas";
}

interface Filter {
  completed?: boolean;
  approven?: boolean;
}

export const AdminExamGrades = () => {
  const [modulesList, setModulesList] = useState<Module[]>([]);
  const [selectedId, setSelectedId] = useState<number>();
  const [moduleData, setModuleData] = useState<Module>();
  const [gradesData, setGradesData] = useState<StudentGradeExam[]>([]);
  const [filters, setFilters] = useState<Filter>({});

  const { modulesQuery } = useModules();
  const { moduleQuery } = useOneModule(selectedId);
  const { examQuery } = useAdminExam(selectedId);
  const { examGradesQuery } = useExamGrades(
    examQuery.data?.id,
    filters.completed,
    filters.approven
  );

  const optionFilters: OptionFilter[] = [
    { id: 1, name: "Completados" },
    { id: 2, name: "No completados" },
    { id: 3, name: "Aprobadas" },
    { id: 4, name: "No aprobadas" },
  ];

  useEffect(() => {
    if (modulesQuery.data) setModulesList(modulesQuery.data);
  }, [modulesQuery.data]);

  useEffect(() => {
    if (moduleQuery.data) setModuleData(moduleQuery.data);
  }, [moduleQuery.data]);

  useEffect(() => {
    if (examGradesQuery.data) setGradesData(examGradesQuery.data);
  }, [examGradesQuery.data]);

  useEffect(() => {
    if (selectedId) moduleQuery.refetch();
  }, [selectedId]);

  useEffect(() => {
    if (moduleData?.id) examGradesQuery.refetch();
  }, [moduleData]);

  useEffect(() => {
    if (moduleQuery.data) examGradesQuery.refetch();
  }, [filters]);

  const handleSelectFilter = (value: number) => {
    switch (value) {
      case 1:
        setFilters({ completed: true });
        return;
      case 2:
        setFilters({ completed: false });
        return;
      case 3:
        setFilters({ approven: true });
        return;
      case 4:
        setFilters({ approven: false });
        return;
    }
  };

  return (
    <div>
      <form className="flex justify-center items-center">
        <label
          htmlFor="modules"
          className="block w-full mb-2 text-base font-medium text-gray-900"
        >
          Selecciona una opción
        </label>
        <select
          value={selectedId ?? ""}
          onChange={(e) => setSelectedId(parseInt(e.target.value))}
          id="modules"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/50 focus:border-primary/50 w-full block p-2.5"
        >
          <option value="" disabled>
            Escoje un módulo
          </option>
          {modulesList.map((item) => (
            <option key={item.id} value={item.id}>
              Módulo {item.moduleNumber}
            </option>
          ))}
        </select>
      </form>
      <div className="my-6">
        {moduleData && (
          <div>
            <h2 className="text-lg text-center my-4 text-primary">
              <span className="font-semibold">Módulo:</span> {moduleData?.title}
            </h2>
            {optionFilters.map((item, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  id={`default-radio-${index}`}
                  type="radio"
                  value={item.id}
                  onChange={() => handleSelectFilter(item.id)}
                  name="default-radio"
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300"
                />
                <label
                  htmlFor={`default-radio-${index}`}
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  {item.name}
                </label>
              </div>
            ))}
            <h2 className="text-secondary font-semibold mb-6">
              Total de registros {gradesData.length}
            </h2>
            <StudentGradesGeneral
              students={gradesData}
              idModule={moduleData.id!}
            />
          </div>
        )}
      </div>
    </div>
  );
};
