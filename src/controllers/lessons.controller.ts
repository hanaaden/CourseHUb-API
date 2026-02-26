import { pool } from "../db.js";
import { Request, Response } from "express";

export const createLesson = async (req: Request, res: Response) => {
  const { course_id, title, content } = req.body;
  const result = await pool.query(
    "INSERT INTO lessons (course_id,title,content) VALUES ($1,$2,$3) RETURNING *",
    [course_id, title, content]
  );
  res.json(result.rows[0]);
};

export const getLessons = async (_: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM lessons");
  res.json(result.rows);
};