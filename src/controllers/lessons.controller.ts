import { pool } from "../db.js";
import { Request, Response } from "express";

// ✅ CREATE LESSON
export const createLesson = async (req: Request, res: Response) => {
  const { course_id, title, content } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO lessons (course_id, title, content) VALUES ($1, $2, $3) RETURNING *",
      [course_id, title, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: (err as Error).message });
  }
};

// ✅ GET ALL LESSONS
export const getLessons = async (_: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT lessons.*, courses.title AS course_title
      FROM lessons
      JOIN courses ON courses.id = lessons.course_id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
};

// ✅ GET LESSON BY ID
export const getLessonById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT lessons.*, courses.title AS course_title
       FROM lessons
       JOIN courses ON courses.id = lessons.course_id
       WHERE lessons.id=$1`,
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
};

// ✅ UPDATE LESSON
export const updateLesson = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE lessons SET title=$1, content=$2 WHERE id=$3 RETURNING *",
      [title, content, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: (err as Error).message });
  }
};

// ✅ DELETE LESSON
export const deleteLesson = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM lessons WHERE id=$1", [id]);
    res.json({ message: "Lesson deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: (err as Error).message });
  }
};