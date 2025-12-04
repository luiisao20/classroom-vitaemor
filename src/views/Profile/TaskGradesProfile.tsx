import { useEffect, useState } from "react";
import type { Module, StudentGradeTask } from "../../core/interfaces";
import { useModules } from "../../presentation/modules/useModules";
import { useOneModule } from "../../presentation/modules/useOneModule";
import { LoaderComponent } from "../../components/general/LoaderComponent";
import { useProfileGrades } from "../../presentation/grades/useProfileGrades";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import {StudentTasksGrades} from "../../components/students/StudentTasksGrades";

export const TaskGradesProfile = () => {
  const [selectedId, setSelectedId] = useState<number>();
  const [modulesList, setModulesList] = useState<Module[]>([]);
  const [gradesList, setGradesList] = useState<StudentGradeTask[]>([]);
  const [moduleData, setModuleData] = useState<Module>();

  const { user } = useAuthStore();

  const { publicModulesQuery } = useModules();
  const { moduleQuery } = useOneModule(selectedId);
  const { taskGrades } = useProfileGrades(user?.id, moduleQuery.data?.id);

  useEffect(() => {
    if (publicModulesQuery.data) setModulesList(publicModulesQuery.data);
  }, [publicModulesQuery.data]);

  useEffect(() => {
    if (moduleQuery.data) setModuleData(moduleQuery.data);
  }, [moduleQuery.data]);

  useEffect(() => {
    if (taskGrades.data) setGradesList(taskGrades.data);
  }, [taskGrades.data]);

  useEffect(() => {
    if (selectedId) moduleQuery.refetch();
  }, [selectedId]);

  useEffect(() => {
    if (moduleData?.id) taskGrades.refetch();
  }, [moduleData]);

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
          <LoaderComponent />
        ) : (
          moduleData && (
            <>
              <h2 className="text-lg text-center my-4 text-primary">
                <span className="font-semibold">Módulo:</span>{" "}
                {moduleData?.title}
              </h2>
              <StudentTasksGrades grades={gradesList} />
            </>
          )
        )}
      </div>
    </div>
  );
};
