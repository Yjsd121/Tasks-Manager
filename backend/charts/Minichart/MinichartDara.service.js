const Query = require('../../utils/Query')

exports.TasksInfo = async (name) => {

  const [result] = await Query(`
    SELECT
      COUNT(t.id) AS total,
      SUM(CASE WHEN t.status = 'pending' THEN 1 ELSE 0 END) AS T_pending,
      SUM(CASE WHEN t.status = 'completed' THEN 1 ELSE 0 END) AS T_completed,
      SUM(CASE WHEN t.status = 'in-progress' THEN 1 ELSE 0 END) AS T_inprogress
    FROM tasks t
    WHERE Assignedto = ?
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