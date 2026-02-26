import { pool } from "../db.js";
import { Request, Response } from "express";

export const createCourse = async (req: Request, res: Response) => {
  const { title, description, instructor_id } = req.body;
  const result = await pool.query(
    "INSERT INTO courses (title,description,instructor_id) VALUES ($1,$2,$3) RETURNING *",
    [title, description, instructor_id]
  );
  res.json(result.rows[0]);
};

export const getCourses = async (_: Request, res: Response) => {
  const result = await pool.query(`
    SELECT courses.*, users.name AS instructor
    FROM courses
    JOIN users ON users.id = courses.instructor_id
  `);
  res.json(result.rows);
};

export const deleteCourse = async (req: Request, res: Response) => {
  await pool.query("DELETE FROM courses WHERE id=$1", [req.params.id]);
  res.json({ message: "Course deleted" });
};