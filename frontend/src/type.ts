export interface Task {
  id?: string;
  task_id?: string;
  title: string;
  description: string;
  priority: string;
  status: string;
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
  Role: string;
  Img_rute: string;
  assigned_tasks?: number;
  completed_tasks?: number;
}

export type listUser = User[];
