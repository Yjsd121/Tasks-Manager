import { Query } from "../utils/Query.js";
import Task, { type TaskInput } from "../models/Task.js";

interface AuthUser {
  id?: string;
  email?: string;
}

export interface TaskRow {
  id?: number;
  Task_id?: string;
  taskId?: string;
  title?: string;
  priority?: string;
  status?: string;
  description?: string;
  createdBy?: string;
  assignedTo?: string;
  createdAt?: Date;
  dueDate?: Date | string;
}

interface ValidationResult { errors: string[] }

const taskSelect = `
  "id",
  "Task_id" AS "taskId",
  "title",
  "priority",
  "Status" AS "status",
  "Description" AS "description",
  "Createdby" AS "createdBy",
  "Assignedto" AS "assignedTo",
  "Createat" AS "createdAt",
  "dueDate"
`;

export const gettasks = async (createdBy: string): Promise<TaskRow[]> => {
  return await Query<TaskRow>(
    `SELECT ${taskSelect} FROM tasks WHERE "Assignedto" = $1`,
    [createdBy],
  );
};

export const createtask = async (
  taskData: TaskInput,
  user?: AuthUser,
): Promise<TaskRow | ValidationResult | null> => {
  const nextId = await getnextautoincrement();
  const task = new Task({
    ...taskData,
    taskId: Task.buildTaskId(nextId),
    createdBy: user?.email || user?.id || null,
    createAt: new Date(),
  });
  const errors = task.validate();

  if (errors.length > 0) {
    return { errors };
  }

  await Query(
    'INSERT INTO tasks ("Task_id", "title", "priority", "Status", "Description", "Createdby","Assignedto", "Createat", "dueDate") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING "Task_id"',
    task.toCreateParams(),
  );

  return await gettaskbyid(task.taskId);
};

export const updatetask = async (
  id: string,
  taskData: TaskInput,
): Promise<TaskRow | ValidationResult | null> => {
  const updates = Task.buildUpdate(taskData);
  const fields = Object.keys(updates);

  if (fields.length === 0) {
    return { errors: ["No hay datos para actualizar"] };
  }

  const setClause = fields
    .map((field, index) => `"${field}" = $${index + 1}`)
    .join(", ");
  const values = fields.map((field) => updates[field]);

  const rows = await Query<TaskRow>(
    `UPDATE tasks SET ${setClause} WHERE "Task_id" = $${fields.length + 1} RETURNING "id"`,
    [...values, id],
  );

  if (rows.length === 0) {
    return null;
  }

  return await gettaskbyid(id);
};

export const deletetask = async (id: string): Promise<boolean> => {
  const rows = await Query<TaskRow>(
    'DELETE FROM tasks WHERE "id" = $1 RETURNING "id"',
    [id],
  );
  return rows.length > 0;
};

export const gettaskbyid = async (id: string | null): Promise<TaskRow | null> => {
  if (!id) {
    return null;
  }

  const rows = await Query<TaskRow>(
    `SELECT ${taskSelect} FROM tasks WHERE "Task_id" = $1`,
    [id],
  );

  return rows[0] || null;
};

export const getnextautoincrement = async (): Promise<number> => {
  const rows = await Query<{ next_id: string | number }>(
    'SELECT COALESCE(MAX("id"), 0) + 1 AS next_id FROM tasks',
  );

  return Number(rows[0]?.next_id) || 1;
};

// These Querys are for Dashboard
export const TotalTask = async (): Promise<Record<string, unknown>[]> => {
  const [result] = await Query<Record<string, string | number>>(`
    SELECT
      COUNT(t.id) AS total,
      COALESCE(SUM(CASE WHEN t."Status" = 'pending' THEN 1 ELSE 0 END), 0) AS "T_pending",
      COALESCE(SUM(CASE WHEN t."Status" = 'completed' THEN 1 ELSE 0 END), 0) AS "T_completed",
      COALESCE(SUM(CASE WHEN t."Status" = 'in process' THEN 1 ELSE 0 END), 0) AS "T_inprogress"
    FROM tasks t
    `);

  return [
    {
      Category: "Total Tasks",
      Total: result.total,
    },
    {
      Category: "Pending",
      Total: result.T_pending,
    },
    {
      Category: "In Process",
      Total: result.T_inprogress,
    },
    {
      Category: "Completed",
      Total: result.T_completed,
    },
  ];
};

export const TasksUser = async (): Promise<Record<string, unknown>[]> => {
  const result = await Query<{ name?: string; assignedTo: string; Total: number }>(`
    SELECT
      COUNT(t."id") AS "Total",
      t."Assignedto" AS "assignedTo",
      CONCAT(u."User_names", ' ', u."User_lastnames") AS name
    FROM tasks t
    LEFT JOIN users u
      ON u."Client_id" = t."Assignedto"
    WHERE t."Status" = 'completed'
    GROUP BY
      t."Assignedto",
      u."User_names",
      u."User_lastnames"
  `);
  return result.map((item) => ({
    name: item.name || item.assignedTo,
    Total: item.Total,
  }));
};
