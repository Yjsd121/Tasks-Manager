export interface TaskInput {
  taskId?: string | null;
  title?: string;
  description?: string;
  priority?: string;
  dueDate?: string | Date;
  createAt?: Date;
  status?: string;
  createdBy?: string | null;
  assignedTo?: string | null;
}

type TaskUpdateFields = Record<string, string | Date | null>;

class Task {
  taskId: string | null;
  title?: string;
  description?: string;
  priority?: string;
  dueDate?: string | Date;
  createAt: Date;
  status: string;
  createdBy: string | null;
  assignedTo: string | null;

  constructor({
    taskId = null,
    title,
    description,
    priority,
    dueDate,
    createAt = new Date(),
    status = 'pending',
    createdBy = null,
    assignedTo = null,
  }: TaskInput) {
    this.taskId = taskId;
    this.title = title?.trim();
    this.description = description?.trim();
    this.priority = priority;
    this.dueDate = dueDate;
    this.createAt = createAt;
    this.status = status || "pending";
    this.createdBy = createdBy;
    this.assignedTo = assignedTo;
  }

  validate(): string[] {
    const errors: string[] = [];

    if (!this.title) errors.push("El titulo es obligatorio");
    if (!this.description) errors.push("La descripcion es obligatoria");
    if (!this.priority) errors.push("La prioridad es obligatoria");
    if (!this.assignedTo) errors.push("El usuario asignado es obligatorio");
    if (!this.dueDate) errors.push("La fecha limite es obligatoria");

    return errors;
  }

  toCreateParams(): unknown[] {
    return [
      this.taskId,
      this.title,
      this.priority,
      this.status,
      this.description,
      this.createdBy,
      this.assignedTo,
      this.createAt,
      this.dueDate,
    ];
  }

  static buildTaskId(number: number): string {
    return `TASK-${String(number).padStart(3, "0")}`;
  }

  static getAllowedUpdateFields(): Record<keyof TaskInput, string> {
    return {
      taskId: "Task_id",
      createAt: "Createat",
      createdBy: "Createdby",
      title: "title",
      description: "Description",
      status: "Status",
      priority: "priority",
      assignedTo: "Assignedto",
      dueDate: "dueDate",
    };
  }

  static buildUpdate(taskData: TaskInput): TaskUpdateFields {
    const allowedFields = this.getAllowedUpdateFields();

    return (Object.keys(allowedFields) as (keyof TaskInput)[]).reduce(
      (updates: TaskUpdateFields, field) => {
        if (field === "taskId" || field === "createAt" || field === "createdBy") {
          return updates;
        }

        if (taskData[field] !== undefined && taskData[field] !== "") {
          const value = taskData[field];
          updates[allowedFields[field]] =
            typeof value === "string" ? value.trim() : value;
        }

        return updates;
      },
      {},
    );
  }
}

export default Task;
