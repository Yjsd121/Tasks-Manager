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