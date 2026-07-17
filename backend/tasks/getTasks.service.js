import { Query } from '../utils/Query.js'
import Task from '../models/Task.js'

const taskSelect = `
  "id",
  "Task_id" AS "taskId",
  "title",
  "priority",
  "Status" AS "status",
  "Description" AS "description",
  "Createdby" AS "createdBy",
  "Createat" AS "createdAt",
  "dueDate"
`

export const gettasks = async (createdBy) => {
  return await Query(
    `SELECT ${taskSelect} FROM tasks WHERE "Assignedto" = $1`,
    [createdBy]
  )
}

export const createtask = async (taskData, user) => {
  const nextId = await getnextautoincrement()
  const task = new Task({
    ...taskData,
    taskId: Task.buildTaskId(nextId),
    createdBy: user?.email || user?.id || null,
    createAt: new Date()
  })
  const errors = task.validate()

  if (errors.length > 0) {
    return { errors }
  }

  const result = await Query(
    'INSERT INTO tasks ("Task_id", "title", "priority", "Status", "Description", "Createdby", "Createat", "dueDate") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "id"',
    task.toCreateParams()
  )

  return await gettaskbyid(result[0].id)
}

export const updatetask = async (id, taskData) => {
  const updates = Task.buildUpdate(taskData)
  const fields = Object.keys(updates)

  if (fields.length === 0) {
    return { errors: ['No hay datos para actualizar'] }
  }

  const setClause = fields.map((field, index) => `"${field}" = $${index + 1}`).join(', ')
  const values = fields.map(field => updates[field])

  const rows = await Query(
    `UPDATE tasks SET ${setClause} WHERE "id" = $${fields.length + 1} RETURNING "id"`,
    [...values, id]
  )

  if (rows.length === 0) {
    return null
  }

  return await gettaskbyid(id)
}

export const deletetask = async (id) => {
  const rows = await Query('DELETE FROM tasks WHERE "id" = $1 RETURNING "id"', [id])
  return rows.length > 0
}

export const gettaskbyid = async (id) => {
  const rows = await Query(
    `SELECT ${taskSelect} FROM tasks WHERE "id" = $1`,
    [id]
  )

  return rows[0] || null
}

export const getnextautoincrement = async () => {
  const rows = await Query(
    'SELECT COALESCE(MAX("id"), 0) + 1 AS next_id FROM tasks'
  )

  return Number(rows[0]?.next_id) || 1
}

//These Querys are for Dashboard 
export const TotalTask = async () => {
  const [result] = await Query(`
    SELECT
      COUNT(t.id) AS total,
      COALESCE(SUM(CASE WHEN t."Status" = 'pending' THEN 1 ELSE 0 END), 0) AS "T_pending",
      COALESCE(SUM(CASE WHEN t."Status" = 'completed' THEN 1 ELSE 0 END), 0) AS "T_completed",
      COALESCE(SUM(CASE WHEN t."Status" = 'in progress' THEN 1 ELSE 0 END), 0) AS "T_inprogress"
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

export const TasksUser = async () => {
  const result = await Query(`
    SELECT
      COUNT(*) AS Total,
      "Createdby"
    FROM tasks
    WHERE "Status" = 'completed'
    GROUP BY "Createdby"
  `)
  return result.map(item => ({
    name: item.Createdby,
    Total: item.total
  }))
}
