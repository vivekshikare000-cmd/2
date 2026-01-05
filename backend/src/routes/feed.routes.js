import express from "express";
import { getGlobalFeed } from "../controllers/feed.controller.js";

const router = express.Router();

// Global feed (read-only)
router.get("/global", getGlobalFeed);

export default router;
