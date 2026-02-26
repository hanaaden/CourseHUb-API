import { pool } from "../db.js";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  const result = await pool.query(
    "INSERT INTO users (name,email,role) VALUES ($1,$2,$3) RETURNING *",
    [name, email, role]
  );
  res.json(result.rows[0]);
};

export const getUsers = async (_: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
};