import { Router, Request, Response } from "express";
import { pool } from "../db.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { user_id, course_id } = req.body;
  const result = await pool.query(
    "INSERT INTO enrollments (user_id,course_id) VALUES ($1,$2) RETURNING *",
    [user_id, course_id]
  );
  res.json(result.rows[0]);
});

router.get("/user/:userId", async (req: Request, res: Response) => {
  const result = await pool.query(`
    SELECT courses.*
    FROM enrollments
    JOIN courses ON courses.id = enrollments.course_id
    WHERE enrollments.user_id=$1
  `, [req.params.userId]);

  res.json(result.rows);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await pool.query("DELETE FROM enrollments WHERE id=$1", [req.params.id]);
  res.json({ message: "Unenrolled successfully" });
});

export default router;