import mysql from "mysql2/promise";

// A connection pool reuses connections across many requests.
// Use createPool, not createConnection — a server handles many requests at once.
export const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "tenanttrails",
  waitForConnections: true,
  connectionLimit: 10,
});

// The schema has no AUTO_INCREMENT, so derive the next id for a table.
// The table name is a fixed internal value, never user input.
export async function nextId(table) {
  const [[{ id }]] = await pool.query(
    `SELECT COALESCE(MAX(id), 0) + 1 AS id FROM ${table}`
  );
  return id;
}
