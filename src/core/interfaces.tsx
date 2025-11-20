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
