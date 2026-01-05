import dotenv from "dotenv";

dotenv.config();

// List of required env variables
const requiredEnvVars = [
  "PORT",
  "MONGO_URI",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "BREVO_API_KEY",
  "BREVO_SENDER_EMAIL",
  "OTP_EXPIRY_MINUTES",
  "SUPER_ADMIN_EMAIL"
];

// Validate all required env variables
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required env variable: ${key}`);
    process.exit(1);
  }
});

// Convert PORT safely to number
const port = Number(process.env.PORT);
if (!Number.isInteger(port) || port < 0 || port > 65535) {
  console.error(`❌ Invalid PORT value: ${process.env.PORT}`);
  process.exit(1);
}

const env = {
  port, // ✅ Now guaranteed to be a number
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  brevoApiKey: process.env.BREVO_API_KEY,
  brevoSenderEmail: process.env.BREVO_SENDER_EMAIL,
  otpExpiryMinutes: Number(process.env.OTP_EXPIRY_MINUTES),
  superAdminEmail: process.env.SUPER_ADMIN_EMAIL
};

export default env;
