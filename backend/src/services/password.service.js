import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

/**
 * Hash plain password
 */
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare plain password with hash
 */
export const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

/**
 * Validate password strength
 */
export const validatePasswordStrength = (password) => {
  const minLength = 8;
  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])/;

  if (password.length < minLength) {
    return "Password must be at least 8 characters long";
  }

  if (!strongRegex.test(password)) {
    return "Password must include uppercase, lowercase, number, and special character";
  }

  return null; // valid
};
