import { Request, Response } from "express";
import { pool } from "../db.js";

// CREATE: enroll a user to a course
export const enrollUser = async (req: Request, res: Response) => {
  const { user_id, course_id } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2) RETURNING *",
      [user_id, course_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to enroll user" });
  }
};

// READ: all enrollments
export const getEnrollments = async (_: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT enrollments.*, users.name AS user_name, courses.title AS course_title
      FROM enrollments
      JOIN users ON users.id = enrollments.user_id
      JOIN courses ON courses.id = enrollments.course_id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch enrollments" });
  }
};

// READ: enrollments by user
export const getUserEnrollments = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user's enrollments" });
  }
};

// UPDATE: change course for an enrollment
export const updateEnrollment = async (req: Request, res: Response) => {
  const { course_id } = req.body;
  try {
    const result = await pool.query(
      "UPDATE enrollments SET course_id = $1 WHERE id = $2 RETURNING *",
      [course_id, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update enrollment" });
  }
};

// DELETE: remove enrollment
export const deleteEnrollment = async (req: Request, res: Response) => {
  try {
    await pool.query("DELETE FROM enrollments WHERE id = $1", [req.params.id]);
    res.json({ message: "Unenrolled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete enrollment" });
  }
};