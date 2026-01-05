import express from "express";
import {
  createSkillSubmission,
  getMySkillSubmissions,
} from "../controllers/skill.controller.js";

const router = express.Router();

// Create skill submission
router.post("/submit", createSkillSubmission);

// Get my skill submissions
router.get("/my", getMySkillSubmissions);

export default router;
