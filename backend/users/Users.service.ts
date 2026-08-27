import { Query } from "../utils/Query.js";
import User, { type UserInput } from "../models/User.js";
import * as bcrypt from "bcrypt";

export interface UserRow {
  Client_id: string;
  User_names?: string;
  User_lastnames?: string;
  User_email?: string;
  User_pass?: string;
  Role?: string;
  Img_rute?: string | null;
  first_login?: boolean;
  assigned_tasks?: string | number;
  completed_tasks?: string | number;
}

interface ValidationResult { errors: string[] }

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
`;

const userGroup = `
    u."Client_id",
    u."User_names",
    u."User_lastnames",
    u."User_email",
    u."Role",
    u."Img_rute"
`;

export const getuserIDS = async (): Promise<UserRow[]> => {
  return await Query<UserRow>(`SELECT "Client_id", "User_names" FROM users`);
};

export const getusers = async (): Promise<UserRow[]> => {
  return await Query<UserRow>(`SELECT
    ${userSelect}

    FROM users u

    LEFT JOIN tasks t
        ON u."Client_id" = t."Assignedto"

    GROUP BY
        ${userGroup}
    `);
};

export const getCredentials = async (email: string): Promise<UserRow[]> => {
  return await Query<UserRow>(
    'SELECT "Client_id","User_email","User_pass","Role" FROM users WHERE "User_email" = $1 ',
    [email],
  );
};

export const getMe = async (Client_id: string): Promise<UserRow[]> => {
  return await Query<UserRow>(
    `SELECT "Client_id", "User_names", "User_lastnames", "User_email", "Img_rute", "first_login","Role" FROM users WHERE "Client_id" = $1`,
    [Client_id],
  );
};

export const createUser = async (
  UserData: UserInput,
): Promise<UserRow | ValidationResult | null> => {
  if (!UserData.User_names || !UserData.User_lastnames || !UserData.Password) {
    return { errors: ["Faltan datos obligatorios"] };
  }

  const nextId = await getnextautoincrement();
  const PasswordHash = await bcrypt.hash(UserData.Password, 10);
  const userD = new User({
    ...UserData,
    userid: User.buildUserId(
      UserData.User_names,
      UserData.User_lastnames,
      nextId,
    ),
    password: PasswordHash,
  });

  const errors = userD.validate();

  if (errors.length > 0) {
    return { errors };
  }

  await Query(
    'INSERT INTO users ("Client_id","User_names","User_lastnames","User_email","User_pass","Role","Img_rute","first_login") VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
    userD.toCreateParams(),
  );

  return userD.userid ? await getuserbyid(userD.userid) : null;
};

export const updateUser = async (
  id: string,
  userData: UserInput,
): Promise<UserRow | ValidationResult | null> => {
  const currentUser = await getuserbyid(id);

  if (!currentUser) {
    return null;
  }

  const haspass =
    userData.Password != undefined
      ? await bcrypt.hash(userData.Password, 10)
      : undefined;

  const UserD = new User({
    ...userData,
    Password: haspass,
  });

  const updates = User.buildUpdate(UserD);
  const fields = Object.keys(updates);

  if (fields.length === 0) {
    return { errors: ["No hay datos para actualizar"] };
  }

  const setClause = fields
    .map((field, index) => `"${field}" = $${index + 1}`)
    .join(", ");
  const values = fields.map((field) => updates[field]);

  const rows = await Query<UserRow>(
    `UPDATE users SET ${setClause} WHERE "Client_id" = $${fields.length + 1} RETURNING "Client_id"`,
    [...values, id],
  );

  if (rows.length === 0) {
    return null;
  }

  return await getuserbyid(id);
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const rows = await Query<UserRow>(
    'DELETE FROM users WHERE "Client_id" = $1 RETURNING "Client_id"',
    [id],
  );
  return rows.length > 0;
};

export const changeFirstPass = async (
  id: string,
  Password: string,
): Promise<boolean> => {
  const haspass = await bcrypt.hash(Password, 10);
  console.log(haspass);
  const rows = await Query<UserRow>(
    'UPDATE users SET "User_pass" = $1, "first_login" = false WHERE "Client_id" = $2 RETURNING "Client_id"',
    [haspass, id],
  );

  console.log(rows);

  return rows.length === 0 ? false : true;
};

export const getuserbyid = async (id: string): Promise<UserRow | null> => {
  const rows = await Query<UserRow>(
    `SELECT
        ${userSelect}
        FROM users u
        LEFT JOIN tasks t
            ON u."Client_id" = t."Assignedto"
        WHERE u."Client_id" = $1
        GROUP BY
        ${userGroup}`,
    [id],
  );
  return rows[0] || null;
};

export const getnextautoincrement = async (): Promise<number> => {
  const rows = await Query<{ next_id: string | number }>(
    'SELECT COALESCE(MAX("id"), 0) + 1 AS next_id FROM users',
  );

  return Number(rows[0]?.next_id) || 1;
};
// This query is for Dashboard
export const MinicardsUsers = async (): Promise<Record<string, unknown>[]> => {
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
    `);
};
