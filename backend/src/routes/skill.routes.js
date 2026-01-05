import express from "express";
import { createSkillSubmission } from "../controllers/skill.controller.js";

const router = express.Router();

// Create skill submission
router.post("/submit", createSkillSubmission);

export default router;
