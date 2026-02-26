// src/server.ts
import app from "./app.js";
import { pool } from "./db.js"; // your Neon/Postgres pool

const PORT = process.env.PORT || 5000;

// Function to check DB connection
const checkDbConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Database connected successfully at:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
};

// Start server and check DB
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await checkDbConnection(); // test DB right when server starts
});