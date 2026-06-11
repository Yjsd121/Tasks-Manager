class Task {
  constructor({ taskId = null, title, description, priority, assignedTo, dueDate, status = 'pending', createdBy = null }) {
    this.taskId = taskId
    this.title = title?.trim()
    this.description = description?.trim()
    this.priority = priority
    this.assignedTo = assignedTo
    this.dueDate = dueDate
    this.status = status || 'pending'
    this.createdBy = createdBy
  }

  validate() {
    const errors = []

    if (!this.title) errors.push('El titulo es obligatorio')
    if (!this.description) errors.push('La descripcion es obligatoria')
    if (!this.priority) errors.push('La prioridad es obligatoria')
    if (!this.assignedTo) errors.push('El responsable es obligatorio')
    if (!this.dueDate) errors.push('La fecha limite es obligatoria')

    return errors
  }

  toCreateParams() {
    return [
      this.taskId,
      this.title,
      this.description,
      this.status,
      this.priority,
      this.assignedTo,
      this.createdBy,
      this.dueDate
    ]
  }

  static buildTaskId(number) {
    return `task_${String(number).padStart(3, '0')}`
  }

  static getAllowedUpdateFields() {
    return ['title', 'description', 'status', 'priority', 'assignedTo', 'dueDate']
  }

  static buildUpdate(taskData) {
    return this.getAllowedUpdateFields().reduce((updates, field) => {
      if (taskData[field] !== undefined && taskData[field] !== '') {
        updates[field] = typeof taskData[field] === 'string' ? taskData[field].trim() : taskData[field]
      }

      return updates
    }, {})
  }
}

module.exports = Task
