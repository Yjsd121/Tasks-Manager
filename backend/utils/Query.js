import { pool } from "./bdConnection.js";

export async function Query(sql, params = []) {
  const result = await pool.query(sql, params);

  return result.rows;
}