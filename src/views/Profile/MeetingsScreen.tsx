import { useEffect, useState } from "react";
import { useStudentAssistance } from "../../presentation/meetings/useStudentAssistance";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import type { StudentAssistance } from "../../core/interfaces";
import { StudentAssistanceComponent } from "../../components/students/StudentAssistance";

export const MeetingsScreen = () => {
  const [assistanceList, setAssistanceList] = useState<StudentAssistance[]>([]);

  const { user } = useAuthStore();

  const { assistanceQuery } = useStudentAssistance(user?.id);

  useEffect(() => {
    if (assistanceQuery.data) setAssistanceList(assistanceQuery.data);
  }, [assistanceQuery.data]);

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-center text-primary font-semibold text-xl">
        Asistencia de reuniones
      </h2>
      <p className="text-text">
        <span className="font-semibold">Porcentaje asistido:</span>{" "}
        {(assistanceList.filter((a) => a.status).length /
          assistanceList.length) *
          100}{" "}
        %
      </p>
      <h2 className="font-semibold text-center text-text-secondary">
        Desglose de asistencia
      </h2>
      <StudentAssistanceComponent assistance={assistanceList} />
    </div>
  );
};
