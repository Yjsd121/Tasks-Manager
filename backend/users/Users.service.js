import { Query } from '../utils/Query.js'
import User from '../models/User.js'
import * as bcrypt from 'bcrypt'

const userSelect = `
    u."Client_id",
    u."User_names",
    u."User_lastnames",
    u."User_email",
    u."Role",
    u."Img_rute",

    COUNT(t."id") AS assigned_tasks,

    COALESCE(SUM(
        CASE
            WHEN t."Status" = 'completed' THEN 1
            ELSE 0
        END
    ), 0) AS completed_tasks
`

const userGroup = `
    u."Client_id",
    u."User_names",
    u."User_lastnames",
    u."User_email",
    u."Role",
    u."Img_rute"
`

export const getuserIDS = async () => {
    return await Query(`SELECT "Client_id", "User_names" FROM users`)
}

export const getusers = async () => {
    return await Query(`SELECT
    ${userSelect}

    FROM users u

    LEFT JOIN tasks t
        ON u."Client_id" = t."Assignedto"

    GROUP BY
        ${userGroup}
    `)
}

export const getCredentials = async (email) => {
    return await Query('SELECT "Client_id","User_email","User_pass","Role" FROM users WHERE "User_email" = $1 ', [email])
}

export const getMe = async (Client_id) => {
    return await Query(`SELECT "Client_id", "User_names", "User_lastnames", "User_email", "Img_rute", "first_login","Role" FROM users WHERE "Client_id" = $1`, [Client_id])
}

export const createUser = async (UserData) => {
    const nextId = await getnextautoincrement()
    const PasswordHash = await bcrypt.hash(UserData.Password, 10)
    const userD = new User({
        ...UserData,
        userid: User.buildUserId(UserData.User_names, UserData.User_lastnames, nextId),
        password: PasswordHash
    })

    const errors = userD.validate()

    if (errors.length > 0) {
        return { errors }
    }

    const result = await Query(
        'INSERT INTO users ("Client_id","User_names","User_lastnames","User_email","User_pass","Role","Img_rute") VALUES ($1,$2,$3,$4,$5,$6,$7)',
        userD.toCreateParams()
    )

    return await getuserbyid(userD.userid)
}

export const updateUser = async (id, userData) => {
    const currentUser = await getuserbyid(id)

    if (!currentUser) {
        return null
    }

    const haspass = userData.Password != undefined ? await bcrypt.hash(userData.Password, 10) : undefined

    const UserD = new User({
        ...userData,
        Password: haspass
    })

    const updates = User.buildUpdate(UserD)
    const fields = Object.keys(updates)

    if (fields.length === 0) {
        return { errors: ['No hay datos para actualizar'] }
    }

    const setClause = fields.map((field, index) => `"${field}" = $${index + 1}`).join(', ')
    const values = fields.map(field => updates[field])

    const rows = await Query(
        `UPDATE users SET ${setClause} WHERE "Client_id" = $${fields.length + 1} RETURNING "Client_id"`,
        [...values, id]
    )

    if (rows.length === 0) {
        return null
    }

    return await getuserbyid(id)
}

export const deleteUser = async (id) => {
    const rows = await Query('DELETE FROM users WHERE "Client_id" = $1 RETURNING "Client_id"', [id])
    return rows.length > 0
}


export const getuserbyid = async (id) => {
    const rows = await Query(
        `SELECT
        ${userSelect}
        FROM users u
        LEFT JOIN tasks t
            ON u."Client_id" = t."Assignedto"
        WHERE u."Client_id" = $1
        GROUP BY
        ${userGroup}`,
        [id]
    )
    return rows[0] || null
}

export const getnextautoincrement = async () => {
    const rows = await Query(
        'SELECT COALESCE(MAX("id"), 0) + 1 AS next_id FROM users'
    )

    return Number(rows[0]?.next_id) || 1
}
// This query is for Dashboard
export const MinicardsUsers = async () => {
    return await Query(`
    SELECT
        u."Client_id" AS id,
        CONCAT(u."User_names", ' ', u."User_lastnames") AS nombre,

        COUNT(t."Task_id") AS asignadas,
        u."Img_rute",

        COALESCE(SUM(CASE
            WHEN t."Status" = 'completed' THEN 1
            ELSE 0
        END), 0) AS completed,

        COALESCE(SUM(CASE
            WHEN t."Status" = 'pending' THEN 1
            ELSE 0
        END), 0) AS pending

    FROM users u

    LEFT JOIN tasks t
        ON u."Client_id" = t."Assignedto"

    GROUP BY
        u."Client_id",
        u."User_names",
        u."User_lastnames",
        u."Img_rute"
    `)
}
