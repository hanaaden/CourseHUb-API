import { Router } from "express";
import {
  enrollUser,
  getEnrollments,
  getUserEnrollments,
  updateEnrollment,
  deleteEnrollment
} from "../controllers/enrollments.controller.js";

const router = Router();

router.post("/", enrollUser);                     // CREATE
router.get("/", getEnrollments);                 // READ all
router.get("/user/:userId", getUserEnrollments); // READ by user
router.put("/:id", updateEnrollment);            // UPDATE
router.delete("/:id", deleteEnrollment);         // DELETE

export default router;