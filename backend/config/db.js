import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";

dotenv.config();
const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

export async function initDB() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          image VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

    console.log("Database initialized successfully");
  } catch (error) {
    console.error(`Error initializing database: ${error}`);
  }
}
