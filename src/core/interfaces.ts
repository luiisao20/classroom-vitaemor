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
  moduleId: number;
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
