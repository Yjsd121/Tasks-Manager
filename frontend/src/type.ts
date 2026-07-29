import type { StatusType, UserType } from "./const";

export type AdminType = (typeof UserType)[keyof typeof UserType];
export type StatusTypes = (typeof StatusType)[keyof typeof StatusType];

export interface Task {
  id?: string;
  taskId?: string;
  title: string;
  description: string;
  priority: string;
  status: StatusTypes;
  assignedTo: string;
  createdAt: string;
  dueDate: string;
}

export type ListTasks = Task[];

export interface Stats {
  id: string;
  title: string;
  quantity: number;
  color: string;
}

export type ListStast = Stats[];

export interface User {
  Client_id: string;
  User_names: string;
  User_lastnames: string;
  User_email: string;
  Role: AdminType;
  Img_rute: string;
  assigned_tasks: number;
  completed_tasks: number;
}

export type listUser = User[];

export interface MinicardsUser {
  id: string;
  nombre: string;
  asignadas: number;
  Img_rute: string;
  completed: number;
  pending: number;
}

export type ListMini = MinicardsUser[];

export interface BarTotal {
  Total: number;
  name: string;
}

export type ListBar = BarTotal[];
