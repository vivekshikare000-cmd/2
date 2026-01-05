import crypto from "crypto";
import OTP from "../models/OTP.model.js";
import env from "../config/env.js";

/**
 * Generate numeric OTP
 */
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

/**
 * Hash OTP
 */
const hashOTP = (otp) => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};

/**
 * Create OTP for a user & purpose
 */
export const createOTP = async ({ userId, purpose }) => {
  // Remove any existing unused OTP for same purpose
  await OTP.deleteMany({ userId, purpose, used: false });

  const otp = generateOTP();
  const otpHash = hashOTP(otp);

  const expiresAt = new Date(
    Date.now() + env.otpExpiryMinutes * 60 * 1000
  );

  await OTP.create({
    userId,
    otpHash,
    purpose,
    expiresAt
  });

  return otp; // Plain OTP returned ONLY to send via email
};

/**
 * Verify OTP
 */
export const verifyOTP = async ({ userId, otp, purpose }) => {
  const otpHash = hashOTP(otp);

  const record = await OTP.findOne({
    userId,
    otpHash,
    purpose,
    used: false
  });

  if (!record) {
    throw new Error("Invalid or expired OTP");
  }

  if (record.expiresAt < new Date()) {
    throw new Error("OTP expired");
  }

  record.used = true;
  await record.save();

  return true;
};
