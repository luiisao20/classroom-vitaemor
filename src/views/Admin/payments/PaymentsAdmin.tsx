import {useEffect, useState} from "react";
import {useStudents} from "../../../presentation/students/useStudents";
import type {Student} from "../../../core/interfaces";
import {StudentsTableComponent} from "../../../components/students/StudentsTableComponent";

export const PaymentsAdmin = () => {
  const [search, setSearch] = useState<string>("");
  const [studentsList, setStudentsList] = useState<Student[]>([]);

  const { studentsQuery } = useStudents(search);

  useEffect(() => {
    if (studentsQuery.data) setStudentsList(studentsQuery.data);
  }, [studentsQuery.data]);

  return (
    <StudentsTableComponent
      search={search}
      payments
      onChangeSearch={setSearch}
      students={studentsList}
    />
  );
}
