import { pool } from "../db.js";
import { Request, Response } from "express";

// ✅ CREATE COURSE
export const createCourse = async (req: Request, res: Response) => {
  const { title, description, instructor_id } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO courses (title, description, instructor_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, instructor_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: (err as Error).message });
  }
};

// ✅ GET ALL COURSES
export const getCourses = async (_: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT courses.*, users.name AS instructor
      FROM courses
      JOIN users ON users.id = courses.instructor_id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
};

// ✅ GET COURSE BY ID
export const getCourseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT courses.*, users.name AS instructor
       FROM courses
       JOIN users ON users.id = courses.instructor_id
       WHERE courses.id=$1`,
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
};

// ✅ UPDATE COURSE
export const updateCourse = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE courses SET title=$1, description=$2 WHERE id=$3 RETURNING *",
      [title, description, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: (err as Error).message });
  }
};

// ✅ DELETE COURSE
export const deleteCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM courses WHERE id=$1", [id]);
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: (err as Error).message });
  }
};