import { Query } from "../../utils/Query.js"

export const TasksInfo = async (name) => {

  const [result] = await Query(`
    SELECT
      COUNT(t.id) AS total,
      COALESCE(SUM(CASE WHEN t."Status" = 'pending' THEN 1 ELSE 0 END), 0) AS "T_pending",
      COALESCE(SUM(CASE WHEN t."Status" = 'completed' THEN 1 ELSE 0 END), 0) AS "T_completed",
      COALESCE(SUM(CASE WHEN t."Status" = 'in progress' THEN 1 ELSE 0 END), 0) AS "T_inprogress"
    FROM tasks t
    WHERE t."Assignedto" = $1
  `, [name])

  return [
    {
      id: 1,
      title: 'Total',
      quantity: result.total,
      color: '#3b82f6'
    },
    {
      id: 2,
      title: 'Pendientes',
      quantity: result.T_pending,
      color: '#f59e0b'
    },
    {
      id: 3,
      title: 'Completadas',
      quantity: result.T_completed,
      color: '#10b981'
    },
    {
      id: 4,
      title: 'En progreso',
      quantity: result.T_inprogress,
      color: '#8b5cf6'
    }
  ]
}
