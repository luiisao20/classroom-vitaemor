import { useParams } from "react-router";
import { useStudentAssistance } from "../../../presentation/meetings/useStudentAssistance";
import { useEffect, useState } from "react";
import type { StudentAssistance } from "../../../core/interfaces";
import { StudentAssistanceComponent } from "../../../components/students/StudentAssistance";

export const StudentMeetings = () => {
  const { id } = useParams();
  const [assistanceList, setAssistanceList] = useState<StudentAssistance[]>([]);

  const { assistanceQuery } = useStudentAssistance(id);

  useEffect(() => {
    if (assistanceQuery.data) setAssistanceList(assistanceQuery.data);
  }, [assistanceQuery.data]);

  return (
    <div>
      <p className="text-text">
        <span className="font-semibold">Porcentaje asistido:</span>{" "}
        {(assistanceList.filter((a) => a.status).length /
          assistanceList.length) *
          100}{" "}
        %
      </p>
      <h2 className="font-semibold text-center text-text-secondary mb-6">
        Desglose de asistencia
      </h2>
      <StudentAssistanceComponent assistance={assistanceList} />
    </div>
  );
};
