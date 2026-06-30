const Query = require('../utils/Query')

exports.getusers = async () => {
  return await Query(`SELECT
    u.Client_id,
    u.User_names,
    u.User_email,
    u.Role,

    COUNT(t.id) AS assigned_tasks,

    SUM(
        CASE
            WHEN t.Status = 'completed' THEN 1
            ELSE 0
        END
    ) AS completed_tasks

FROM users u

LEFT JOIN tasks t
    ON u.User_names = t.Assignedto

GROUP BY
    u.Client_id,
    u.User_names,
    u.User_email,
    u.Role`)
}

exports.MinicardsUsers = async () => {
  return await Query(`
    SELECT
    u.Client_id AS id,
    CONCAT(u.User_names, ' ', u.User_lastnames) AS nombre,

    COUNT(t.Task_id) AS asignadas,

    SUM(CASE
        WHEN t.Status = 'completed' THEN 1
        ELSE 0
    END) AS completed,

    SUM(CASE
        WHEN t.Status = 'pending' THEN 1
        ELSE 0
    END) AS pending

FROM users u

LEFT JOIN tasks t
    ON u.User_names = t.Assignedto

GROUP BY
    u.Client_id,
    u.User_names,
    u.User_lastnames;
    `)
}