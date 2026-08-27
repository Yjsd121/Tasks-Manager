import { pool } from "./bdConnection.js";

export async function Query<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  const result = await pool.query(sql, params);

  return result.rows as T[];
}
