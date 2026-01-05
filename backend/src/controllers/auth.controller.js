import User from "../models/User.model.js";
import { hashPassword, validatePasswordStrength } from "../services/password.service.js";
import { createOTP, verifyOTP } from "../services/otp.service.js";
import { sendOTPEmail } from "../services/email.service.js";
import { generateAccessToken } from "../services/jwt.service.js";
import { verifyPassword } from "../services/password.service.js";
import { createOTP } from "../services/otp.service.js";
import { sendOTPEmail } from "../services/email.service.js";
import { verifyOTP } from "../services/otp.service.js";
import { generateAccessToken } from "../services/jwt.service.js";

/**
 * Register Student / Employer
 */
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      role,
      studentProfile,
      employerProfile
    } = req.body;

    // 1️⃣ Basic validation
    if (!name || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 2️⃣ Password strength
    const passwordError = validatePasswordStrength(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    // 3️⃣ Role validation
    if (!["student", "employer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // 4️⃣ Email uniqueness
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // 5️⃣ Hash password
    const passwordHash = await hashPassword(password);

    // 6️⃣ Create user
    const user = await User.create({
      name,
      email,
      passwordHash,
      role,
      studentProfile: role === "student" ? studentProfile : undefined,
      employerProfile: role === "employer" ? employerProfile : undefined
    });

    // 7️⃣ Generate OTP
    const otp = await createOTP({
      userId: user._id,
      purpose: "email_verification"
    });

    // 8️⃣ Send email
    await sendOTPEmail({
      toEmail: user.email,
      otp,
      purpose: "email_verification"
    });

    return res.status(201).json({
      message: "Registration successful. Please verify your email."
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Registration failed" });
  }
};

/**
 * Verify Email OTP
 */
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // 1️⃣ Verify OTP
    await verifyOTP({
      userId: user._id,
      otp,
      purpose: "email_verification"
    });

    // 2️⃣ Activate account
    user.emailVerified = true;
    user.accountStatus = "active";
    await user.save();

    // 3️⃣ Issue JWT
    const token = generateAccessToken({
      userId: user._id,
      role: user.role
    });

    return res.status(200).json({
      message: "Email verified successfully",
      token
    });

  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: error.message });
  }
};

/**
 * Login User (Password Verification)
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Account checks
    if (!user.emailVerified) {
      return res.status(403).json({ message: "Email not verified" });
    }

    if (user.accountStatus !== "active") {
      return res.status(403).json({ message: "Account is not active" });
    }

    // Password check
    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate OTP
    const otp = await createOTP({
      userId: user._id,
      purpose: "login"
    });

    // Send OTP
    await sendOTPEmail({
      toEmail: user.email,
      otp,
      purpose: "login"
    });

    return res.status(200).json({
      message: "OTP sent to registered email"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Login failed" });
  }
};

/**
 * Verify Login OTP & Issue JWT
 */
export const verifyLoginOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify OTP
    await verifyOTP({
      userId: user._id,
      otp,
      purpose: "login"
    });

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    // Issue JWT
    const token = generateAccessToken({
      userId: user._id,
      role: user.role
    });

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: error.message });
  }
};