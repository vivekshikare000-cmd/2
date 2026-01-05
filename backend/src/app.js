// src/app.js
import express from "express";

const app = express();

// Global middlewares
app.use(express.json());

export default app;
