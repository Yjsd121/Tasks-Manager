const Query = require('../utils/Query')
const Task = require('../models/Task')

exports.gettasks = async (name) => {
  return await Query(
    'SELECT `id`, `Task_id`, `title`, `priority`, `Status` AS status, `Description` AS description, `Createdby` AS createdBy, `Assignedto` AS assignedTo, `Createat` AS createdAt, `dueDate` FROM tasks WHERE AssignedTo = ?',
    [name]
  )
}

exports.createtask = async (taskData, user) => {
  const nextId = await exports.getnextautoincrement()
  const task = new Task({
    ...taskData,
    taskId: Task.buildTaskId(nextId),
    createdBy: user?.email || user?.id || null,
    createat: new Date()
  })
  const errors = task.validate()

  if (errors.length > 0) {
    return { errors }
  }

  const result = await Query(
    'INSERT INTO tasks (`Task_id`, `title`, `priority`, `Status`, `Description`, `Createdby`, `Assignedto`, `Createat`, `dueDate`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
  return await Query(
    'SELECT `id`, `Task_id`, `title`, `priority`, `Status` AS status, `Description` AS description, `Createdby` AS createdBy, `Assignedto` AS assignedTo, `Createat` AS createdAt, `dueDate` FROM tasks WHERE AssignedTo = ?',
    [id]
  )
}

exports.getnextautoincrement = async () => {
  const rows = await Query(
    'SELECT AUTO_INCREMENT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?',
    ['tasks']
  )

  return rows[0]?.AUTO_INCREMENT || 1
}

exports.TotalTask = async () => {
  const [result] = await Query(`
    SELECT
      COUNT(t.id) AS total,
      SUM(CASE WHEN t.status = 'pending' THEN 1 ELSE 0 END) AS T_pending,
      SUM(CASE WHEN t.status = 'completed' THEN 1 ELSE 0 END) AS T_completed,
      SUM(CASE WHEN t.status = 'in-progress' THEN 1 ELSE 0 END) AS T_inprogress
    FROM tasks t
    `)

  return [
    {
      Category: 'Total Tasks',
      Total: result.total
    },
    {
      Category: 'Pending',
      Total: result.T_pending
    },
    {
      Category: 'In Process',
      Total: result.T_inprogress
    },
    {
      Category: 'Completed',
      Total: result.T_completed
    }
  ]
}

exports.TasksUser = async () => {
  const result = await Query(`
    SELECT
      COUNT(*) AS Total,
      Assignedto
    FROM Tasks
    WHERE Status = 'Completed'
    GROUP BY Assignedto
  `)
  return result.map(item => ({
    name: item.Assignedto,
    Total: item.Total
  }))
}