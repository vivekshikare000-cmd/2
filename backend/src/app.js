// src/app.js
import express from "express";
import feedRoutes from "./routes/feed.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

// Global middlewares

app.use("/api/feed", feedRoutes);


export default app;
