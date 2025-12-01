import type { Dayjs } from "dayjs";
import type { ReactElement } from "react";

export interface SideRoute {
  name: string;
  route: string;
  icon: ReactElement;
}

export interface Module {
  id?: number;
  title: string;
  moduleNumber: number;
  status?: boolean;
  resume?: string;
}

export interface AdditionalContent {
  id?: number;
  topic: string;
  url: string;
  moduleId?: number;
}

export interface Bibliography {
  id?: number;
  content: string;
  moduleId: number;
}

export interface Task {
  id?: number;
  publishedAt?: Date;
  dueDate: Dayjs | null;
  title: string;
  description: string;
  status?: boolean;
}

export interface Exam {
  id: number;
  status: boolean;
  dueDate: Dayjs | null;
  review: boolean;
}

export interface Question {
  id?: number;
  text: string;
  idExam: number;
  idType: number;
}

export interface Option {
  id?: number;
  text: string;
  isCorrect: boolean;
  idQuestion?: string;
}

export interface QuestionWithOptions extends Question {
  options: Option[];
}

export interface QuestionType {
  id: number;
  type: string;
}

export interface Meeting {
  id?: number;
  number: number;
  subtitle?: string;
  date: Dayjs | null;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface StudentList {
  id: string;
  firstName: string;
  lastName: string;
  assistance: boolean;
}

export interface Payment {
  id: number;
  createdAt: Date;
  approvedAt?: Dayjs | null;
  url: string;
  ammount?: number;
  status?: boolean;
  path: string;
}

export interface StudentAssistance {
  number: number;
  date: string;
  status: boolean;
  moduleNumber: number;
}

export interface ModuleInfo extends Module {
  bibliography: string[];
  additionalContent: AdditionalContent[];
}

export interface Submission {
  url: string;
  fileName: string;
  path: string;
  createdAt?: string;
  grade?: number;
  feedback?: string;
  gradedAt?: string;
  idTask: number;
}

export interface Answer {
  questionId: number;
  typeId: number;
  optionId?: number;
  text?: string;
  grade?: number;
}

export interface StudentAnswer {
  idQuestion: number;
  question: string;
  answer?: string;
  optionSelected?: string;
  isCorrect?: boolean;
  correctOption?: string;
  questionType: number;
  grade: number;
}

export interface GradesByQuestion {
  idQuestion: number;
  grade: string;
}

export interface Book {
  id?: number;
  title: string;
  authors: string;
  categoryId: number;
  typeId: number;
  url: string;
}

export interface BookPropertie {
  id: number;
  name: string;
}

export interface StudentGradeExam {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  grade?: number;
}

export interface ModuleExamGrade {
  moduleId: number;
  examId: number;
  review: boolean;
  module: number;
  createdAt: string;
  grade?: number;
}

export interface StudentTaskGrade {
  moduleId: number;
  moduleNumber: number;
  title: string;
  grade: number
}
