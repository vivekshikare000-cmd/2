import jwt from "jsonwebtoken";
import env from "../config/env.js";

/**
 * Generate Access Token
 */
export const generateAccessToken = ({ userId, role }) => {
  return jwt.sign(
    {
      sub: userId,
      role
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn
    }
  );
};

/**
 * Verify Access Token
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, env.jwtSecret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
