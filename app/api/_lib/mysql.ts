import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function getPool() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Missing DATABASE_URL");
  if (!pool) pool = mysql.createPool(url);
  return pool;
}
