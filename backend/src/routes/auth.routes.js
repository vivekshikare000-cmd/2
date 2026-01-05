import express from "express";
import {
  registerUser,
  verifyEmail,
  loginUser,
  verifyLoginOTP
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);

// Login
router.post("/login", loginUser);
router.post("/verify-login-otp", verifyLoginOTP);

export default router;
