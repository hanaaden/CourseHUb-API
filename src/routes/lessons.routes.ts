import { Router } from "express";
import { createLesson, getLessons } from "../controllers/lessons.controller.js";

const router = Router();

router.post("/", createLesson);
router.get("/", getLessons);

export default router;