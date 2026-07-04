const Query = require('../utils/Query')
const User = require('../models/User')


exports.getusers = async () => {
    return await Query(`SELECT
    u.Client_id,
    u.User_names,
    u.User_lastnames,
    u.User_email,
    u.Role,
    u.Img_rute,

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
    u.User_lastnames,
    u.User_email,
    u.Role,
    u.Img_rute
    `)
}

exports.createUser = async (UserData) => {
    const nextId = await exports.getnextautoincrement()
    const userD = new User({
        ...UserData,
        userid: User.bluidUserId(nextId)
    })

    const errors = userD.validate()

    if (errors.length > 0) {
        return { errors }
    }

    const result = await Query(
        'INSERT INTO users (`Client_id`,`User_names`,`User_lastnames`,`User_email`,`User_pass`,`Role`,`Img_rute`) VALUES (?,?,?,?,?,?,?)',
        userD.toCreateParams()
    )

    return await exports.getuserbyid(result.insertId)
}


exports.getuserbyid = async (id) => {
    const rows = await Query(
        `SELECT * FROM tasks WHERE id = ?`,
        [id]
    )
    return rows[0] || null
}

exports.getnextautoincrement = async () => {
    const rows = await Query(
        'SELECT AUTO_INCREMENT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?',
        ['tasks']
    )

    return rows[0]?.AUTO_INCREMENT || 1
}
// This query is for Dashboard
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