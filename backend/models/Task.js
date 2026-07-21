class Task {
  constructor({
    taskId = null,
    title,
    description,
    priority,
    dueDate,
    createAt = new Date(),
    status = 'pending',
    createdBy = null,
    assignedTo = null
  }) {
    this.taskId = taskId
    this.title = title?.trim()
    this.description = description?.trim()
    this.priority = priority
    this.dueDate = dueDate
    this.createAt = createAt
    this.status = status || 'pending'
    this.createdBy = createdBy
    this.assignedTo = assignedTo
  }

  validate() {
    const errors = []

    if (!this.title) errors.push('El titulo es obligatorio')
    if (!this.description) errors.push('La descripcion es obligatoria')
    if (!this.priority) errors.push('La prioridad es obligatoria')
    if (!this.assignedTo) errors.push('El usuario asignado es obligatorio')
    if (!this.dueDate) errors.push('La fecha limite es obligatoria')

    return errors
  }

  toCreateParams() {
    return [
      this.taskId,
      this.title,
      this.priority,
      this.status,
      this.description,
      this.createdBy,
      this.assignedTo,
      this.createAt,
      this.dueDate
    ]
  }

  static buildTaskId(number) {
    return `TASK-${String(number).padStart(3, '0')}`
  }

  static getAllowedUpdateFields() {
    return {
      title: 'title',
      description: 'Description',
      status: 'Status',
      priority: 'priority',
      assignedTo: 'Assignedto',
      dueDate: 'dueDate'
    }
  }

  static buildUpdate(taskData) {
    const allowedFields = this.getAllowedUpdateFields()

    return Object.keys(allowedFields).reduce((updates, field) => {
      if (taskData[field] !== undefined && taskData[field] !== '') {
        updates[allowedFields[field]] =
          typeof taskData[field] === 'string'
            ? taskData[field].trim()
            : taskData[field]
      }

      return updates
    }, {})
  }
}

export default Task
