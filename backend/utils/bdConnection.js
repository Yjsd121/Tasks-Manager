import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

async function connectDB() {
  try {
    const client = await pool.connect();

    console.log("PostgreSQL conectado correctamente.");

    client.release();
  } catch (error) {
    console.error("Error al conectar con PostgreSQL");
    console.error(error);

    process.exit(1);
  }
}

export { pool, connectDB };