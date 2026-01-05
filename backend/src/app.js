// src/app.js
import express from "express";
import feedRoutes from "./routes/feed.routes.js";
const app = express();

// Global middlewares
app.use("/api/feed", feedRoutes);
app.use(express.json());

export default app;
