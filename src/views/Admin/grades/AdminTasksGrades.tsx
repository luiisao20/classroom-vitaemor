import { useEffect, useState } from "react";
import { useModules } from "../../../presentation/modules/useModules";
import type { Module, StudentGradeExam, Task } from "../../../core/interfaces";
import { useTasks } from "../../../presentation/tasks/useTasks";
import { useOneModule } from "../../../presentation/modules/useOneModule";
import { LoaderComponent } from "../../../components/general/LoaderComponent";
import { useTaskGrades } from "../../../presentation/grades/useTaskGrades";
import { StudentGradesGeneral } from "../../../components/students/StudentGradesGeneral";

interface OptionFilter {
  id: number;
  name: "Completados" | "No completados";
}

export const AdminTasksGrades = () => {
  const [selectedId, setSelectedId] = useState<number>();
  const [selectedTaskId, setSelectedTaskId] = useState<number>();
  const [modulesList, setModulesList] = useState<Module[]>([]);
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [grades, setGrades] = useState<StudentGradeExam[]>([]);
  const [moduleData, setModuleData] = useState<Module>();
  const [completed, setCompleted] = useState<boolean>();

  const { modulesQuery } = useModules();
  const { tasksQuery } = useTasks(selectedId);
  const { moduleQuery } = useOneModule(selectedId);
  const { taskGradesQuery } = useTaskGrades(selectedTaskId, completed);

  const optionFilters: OptionFilter[] = [
    { id: 1, name: "Completados" },
    { id: 2, name: "No completados" },
  ];

  useEffect(() => {
    if (modulesQuery.data) setModulesList(modulesQuery.data);
  }, [modulesQuery.data]);

  useEffect(() => {
    if (moduleQuery.data) setModuleData(moduleQuery.data);
  }, [moduleQuery.data]);

  useEffect(() => {
    if (tasksQuery.data) setTasksList(tasksQuery.data);
  }, [tasksQuery.data]);

  useEffect(() => {
    if (taskGradesQuery.data) setGrades(taskGradesQuery.data);
  }, [taskGradesQuery.data]);

  useEffect(() => {
    if (selectedId) {
      moduleQuery.refetch();
      setSelectedTaskId(undefined);
      setGrades([]);
    }
  }, [selectedId]);

  useEffect(() => {
    if (selectedTaskId) taskGradesQuery.refetch();
  }, [selectedTaskId]);

  useEffect(() => {
    if (moduleData?.id) tasksQuery.refetch();
  }, [moduleData]);

  useEffect(() => {
    if (moduleQuery.data) taskGradesQuery.refetch();
  }, [completed]);

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
      <div>
        {moduleQuery.isLoading ? (
          <>
            <LoaderComponent />
          </>
        ) : (
          moduleData && (
            <>
              <h2 className="text-lg text-center my-4 text-primary">
                <span className="font-semibold">Módulo:</span>{" "}
                {moduleData?.title}
              </h2>
              <form className="flex justify-center items-center">
                <label
                  htmlFor="modules"
                  className="block w-full mb-2 text-base font-medium text-gray-900"
                >
                  Selecciona una opción
                </label>
                <select
                  value={selectedTaskId ?? ""}
                  onChange={(e) => setSelectedTaskId(parseInt(e.target.value))}
                  id="modules"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/50 focus:border-primary/50 w-full block p-2.5"
                >
                  <option value="" disabled>
                    Escoje una tarea
                  </option>
                  {tasksList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </form>
              {optionFilters.map((item, index) => (
                <div key={index} className="flex items-center mb-4">
                  <input
                    id={`default-radio-${index}`}
                    type="radio"
                    value={item.id}
                    onChange={() =>
                      item.id === 1 ? setCompleted(true) : setCompleted(false)
                    }
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
                Total de registros {grades.length}
              </h2>
              <StudentGradesGeneral
                tasks
                students={grades}
                idModule={moduleData.id!}
              />
            </>
          )
        )}
      </div>
    </div>
  );
};
