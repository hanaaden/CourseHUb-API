import { Router } from "express";
import {
  enrollUser,
  getEnrollments,
  getUserEnrollments,
  deleteEnrollment
} from "../controllers/enrollments.controller.js";

const router = Router();

router.post("/", enrollUser);                // CREATE
router.get("/", getEnrollments);              // READ (all)
router.get("/user/:userId", getUserEnrollments); // READ (by user)
router.delete("/:id", deleteEnrollment);      // DELETE

export default router;