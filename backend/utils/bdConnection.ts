import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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
