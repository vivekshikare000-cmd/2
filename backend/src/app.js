// src/app.js
import express from "express";
import feedRoutes from "./routes/feed.routes.js";
import authRoutes from "./routes/auth.routes.js";
import skillRoutes from "./routes/skill.routes.js";
const app = express();

app.use(express.json());


app.use("/api/feed", feedRoutes);

app.use("/api/skill", skillRoutes);

app.use("/api/auth", authRoutes);


// Global middlewares

app.use("/api/feed", feedRoutes);


export default app;
