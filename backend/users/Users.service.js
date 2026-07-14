const Query = require('../utils/Query')
const User = require('../models/User')

const userSelect = `
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
    ) AS completed_tasks`

const userGroup = `
    u.Client_id,
    u.User_names,
    u.User_lastnames,
    u.User_email,
    u.Role,
    u.Img_rute`

exports.getusers = async () => {
    return await Query(`SELECT
    ${userSelect}

FROM users u

LEFT JOIN tasks t
    ON u.User_names = t.Assignedto

GROUP BY
    ${userGroup}
    `)
}

exports.createUser = async (UserData) => {
    const nextId = await exports.getnextautoincrement()
    const userD = new User({
        ...UserData,
        userid: User.buildUserId(UserData.User_names, UserData.User_lastnames, nextId)
    })

    const errors = userD.validate()

    if (errors.length > 0) {
        return { errors }
    }

    const result = await Query(
        'INSERT INTO users (`Client_id`,`User_names`,`User_lastnames`,`User_email`,`User_pass`,`Role`,`Img_rute`) VALUES (?,?,?,?,?,?,?)',
        userD.toCreateParams()
    )

    return await exports.getuserbyid(userD.userid)
}

exports.updateUser = async (id, userData) => {
    const currentUser = await exports.getuserbyid(id)

    if (!currentUser) {
        return null
    }

    const updates = User.buildUpdate(userData)
    const fields = Object.keys(updates)

    if (fields.length === 0) {
        return { errors: ['No hay datos para actualizar'] }
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ')
    const values = fields.map(field => updates[field])

    const result = await Query(
        `UPDATE users SET ${setClause} WHERE Client_id = ?`,
        [...values, id]
    )

    if (result.affectedRows === 0) {
        return null
    }

    if (userData.User_names && userData.User_names !== currentUser.User_names) {
        await Query(
            'UPDATE tasks SET Assignedto = ? WHERE Assignedto = ?',
            [userData.User_names, currentUser.User_names]
        )
    }

    return await exports.getuserbyid(id)
}

exports.deleteUser = async (id) => {
    const result = await Query('DELETE FROM users WHERE Client_id = ?', [id])
    return result.affectedRows > 0
}


exports.getuserbyid = async (id) => {
    const rows = await Query(
        `SELECT
        ${userSelect}
        FROM users u
        LEFT JOIN tasks t
            ON u.User_names = t.Assignedto
        WHERE u.Client_id = ?
        GROUP BY
        ${userGroup}`,
        [id]
    )
    return rows[0] || null
}

exports.getnextautoincrement = async () => {
    const rows = await Query(
        'SELECT AUTO_INCREMENT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?',
        ['users']
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
    u.Img_rute,

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
    u.User_lastnames,
    u.Img_rute

    `)
}
