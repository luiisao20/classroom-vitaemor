import { useEffect, useState } from "react";
import { useProfileGrades } from "../../presentation/grades/useProfileGrades";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import type { ModuleExamGrade } from "../../core/interfaces";
import { TableExamGrades } from "../../components/students/TableExamGrades";

export const ExamGradesProfile = () => {
  const [gradesList, setGradesList] = useState<ModuleExamGrade[]>([]);

  const { user } = useAuthStore();

  const { examGrades } = useProfileGrades(user?.id);

  useEffect(() => {
    if (examGrades.data) setGradesList(examGrades.data);
  }, [examGrades.data]);

  return <TableExamGrades hideTasks examGrades={gradesList} />;
};
