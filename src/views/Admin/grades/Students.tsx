import { useEffect, useState } from "react";
import type { Student } from "../../../core/interfaces";
import { useStudents } from "../../../presentation/students/useStudents";
import { StudentsTableComponent } from "../../../components/students/StudentsTableComponent";

export const GradesStudents = () => {
  const [search, setSearch] = useState<string>("");
  const [studentsList, setStudentsList] = useState<Student[]>([]);

  const { studentsQuery } = useStudents(search);

  useEffect(() => {
    if (studentsQuery.data) setStudentsList(studentsQuery.data);
  }, [studentsQuery.data]);

  return (
    <StudentsTableComponent
      search={search}
      onChangeSearch={setSearch}
      students={studentsList}
      grades
    />
  );
};
