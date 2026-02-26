import { pool } from "../db.js";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name,email,role) VALUES ($1,$2,$3) RETURNING *",
      [name, email, role]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getUsers = async (_: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
};

// ✅ UPDATE USER
export const updateUser = async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE users SET name=$1, email=$2, role=$3 WHERE id=$4 RETURNING *",
      [name, email, role, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: (err as Error).message });
  }
};

// ✅ DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM users WHERE id=$1", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: (err as Error).message });
  }
};