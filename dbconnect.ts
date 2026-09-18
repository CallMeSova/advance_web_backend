import "dotenv/config";
import { createPool } from "mysql2/promise";

const requiredEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const conn = createPool({
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT ?? 10),
  host: requiredEnv("DB_HOST"),
  port: Number(requiredEnv("DB_PORT")),
  user: requiredEnv("DB_USER"),
  password: requiredEnv("DB_PASSWORD"),
  database: requiredEnv("DB_NAME"),
});
