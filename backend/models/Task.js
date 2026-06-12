class Task {
  constructor({
    taskId = null,
    title,
    description,
    Description,
    priority,
    assignedTo,
    Assignedto,
    dueDate,
    createAt = new Date(),
    createat,
    status = 'pending',
    Status,
    createdBy = null,
    Createdby = null
  }) {
    this.taskId = taskId
    this.title = title?.trim()
    this.description = (description || Description)?.trim()
    this.priority = priority
    this.assignedTo = assignedTo || Assignedto
    this.dueDate = dueDate
    this.createAt = createat || createAt
    this.status = Status || status || 'pending'
    this.createdBy = createdBy || Createdby
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
      Description: 'Description',
      status: 'Status',
      Status: 'Status',
      priority: 'priority',
      assignedTo: 'Assignedto',
      Assignedto: 'Assignedto',
      dueDate: 'dueDate'
    }
  }

  static buildUpdate(taskData) {
    const allowedFields = this.getAllowedUpdateFields()

    return Object.keys(allowedFields).reduce((updates, field) => {
      if (taskData[field] !== undefined && taskData[field] !== '') {
        updates[`\`${allowedFields[field]}\``] =
          typeof taskData[field] === 'string'
            ? taskData[field].trim()
            : taskData[field]
      }

      return updates
    }, {})
  }
}

module.exports = Task
