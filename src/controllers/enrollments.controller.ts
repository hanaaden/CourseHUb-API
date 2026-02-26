import { Request, Response } from "express";
import { pool } from "../db.js";

export const enrollUser = async (req: Request, res: Response) => {
  const { user_id, course_id } = req.body;

  const result = await pool.query(
    "INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2) RETURNING *",
    [user_id, course_id]
  );

  res.status(201).json(result.rows[0]);
};

export const getEnrollments = async (_: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM enrollments");
  res.json(result.rows);
};

export const getUserEnrollments = async (req: Request, res: Response) => {
  const result = await pool.query(
    `
    SELECT courses.*
    FROM enrollments
    JOIN courses ON courses.id = enrollments.course_id
    WHERE enrollments.user_id = $1
    `,
    [req.params.userId]
  );

  res.json(result.rows);
};

export const deleteEnrollment = async (req: Request, res: Response) => {
  await pool.query("DELETE FROM enrollments WHERE id = $1", [req.params.id]);
  res.json({ message: "Unenrolled successfully" });
};