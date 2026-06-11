const Query = require('../utils/Query')
const Task = require('../models/Task')

exports.gettasks = async () => {
  return await Query('SELECT * FROM tasks')
}

exports.createtask = async (taskData, user) => {
  const nextId = await exports.getnextautoincrement()
  const task = new Task({
    ...taskData,
    taskId: Task.buildTaskId(nextId),
    createdBy: user?.email || user?.id || null
  })
  const errors = task.validate()

  if (errors.length > 0) {
    return { errors }
  }

  const result = await Query(
    'INSERT INTO tasks (Task_id, title, description, status, priority, assignedTo, createdBy, dueDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    task.toCreateParams()
  )

  return await exports.gettaskbyid(result.insertId)
}

exports.updatetask = async (id, taskData) => {
  const updates = Task.buildUpdate(taskData)
  const fields = Object.keys(updates)

  if (fields.length === 0) {
    return { errors: ['No hay datos para actualizar'] }
  }

  const setClause = fields.map(field => `${field} = ?`).join(', ')
  const values = fields.map(field => updates[field])

  const result = await Query(
    `UPDATE tasks SET ${setClause} WHERE id = ?`,
    [...values, id]
  )

  if (result.affectedRows === 0) {
    return null
  }

  return await exports.gettaskbyid(id)
}

exports.deletetask = async (id) => {
  const result = await Query('DELETE FROM tasks WHERE id = ?', [id])
  return result.affectedRows > 0
}

exports.gettaskbyid = async (id) => {
  const rows = await Query('SELECT * FROM tasks WHERE id = ?', [id])
  return rows[0]
}

exports.getnextautoincrement = async () => {
  const rows = await Query(
    'SELECT AUTO_INCREMENT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?',
    ['tasks']
  )

  return rows[0]?.AUTO_INCREMENT || 1
}
