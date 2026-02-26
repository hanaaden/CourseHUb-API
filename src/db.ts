import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Neon requires this
  },
});

pool.on("connect", () => console.log("✅ Pool connected to DB"));
pool.on("error", (err) => console.error("❌ Pool error:", err));