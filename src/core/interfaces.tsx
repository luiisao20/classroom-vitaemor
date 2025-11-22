import type {Dayjs} from "dayjs";
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
