import { Router, Request, Response } from "express";
import { pool } from "../db.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { title, description, instructor_id } = req.body;
  const result = await pool.query(
    "INSERT INTO courses (title,description,instructor_id) VALUES ($1,$2,$3) RETURNING *",
    [title, description, instructor_id]
  );
  res.json(result.rows[0]);
});

router.get("/", async (_: Request, res: Response) => {
  const result = await pool.query(`
    SELECT courses.*, users.name AS instructor
    FROM courses
    JOIN users ON users.id = courses.instructor_id
  `);
  res.json(result.rows);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const result = await pool.query(
    "UPDATE courses SET title=$1, description=$2 WHERE id=$3 RETURNING *",
    [title, description, req.params.id]
  );
  res.json(result.rows[0]);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await pool.query("DELETE FROM courses WHERE id=$1", [req.params.id]);
  res.json({ message: "Course deleted" });
});

export default router;