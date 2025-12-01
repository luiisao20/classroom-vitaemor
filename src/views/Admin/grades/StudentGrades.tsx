import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type {
  ModuleExamGrade,
  Student,
  StudentTaskGrade,
} from "../../../core/interfaces";
import { useStudent } from "../../../presentation/user/useStudent";
import { ButtonGoBack } from "../../../components/general/ButtonGoBack";
import { useStudentGrades } from "../../../presentation/grades/useStudentGrades";
import { TableExamGrades } from "../../../components/students/TableExamGrades";

interface Grades {
  exams: ModuleExamGrade[];
  tasks: StudentTaskGrade[];
}

export const StudentGrades = () => {
  const { id } = useParams();

  const [dataStudent, setDataStudent] = useState<Student>();
  const [grades, setGrades] = useState<Grades>({
    exams: [],
    tasks: [],
  });

  const { studentQuery } = useStudent(id!);
  const { examGrades, tasksGrades } = useStudentGrades(id);

  useEffect(() => {
    if (studentQuery.data) setDataStudent(studentQuery.data);
  }, [studentQuery.data]);

  useEffect(() => {
    if (examGrades.data)
      setGrades((prev) => ({ ...prev, exams: examGrades.data }));
  }, [examGrades.data]);

  useEffect(() => {
    if (tasksGrades.data)
      setGrades((prev) => ({ ...prev, tasks: tasksGrades.data }));
  }, [tasksGrades.data]);

  return (
    <div>
      <ButtonGoBack />
      <div className="flex flex-col space-y-3 mx-10">
        <h2 className="text-base">
          <span className="font-semibold">Nombres:</span>{" "}
          {dataStudent?.lastName} {dataStudent?.firstName}
        </h2>
        <h2 className="text-base">
          <span className="font-semibold">Correo electrónico:</span>{" "}
          {dataStudent?.email}
        </h2>
      </div>
      <TableExamGrades
        tasksGrades={grades.tasks}
        idStudent={id}
        examGrades={grades.exams}
      />
    </div>
  );
};
