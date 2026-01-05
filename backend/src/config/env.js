import dotenv from "dotenv";

dotenv.config();

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

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required env variable: ${key}`);
    process.exit(1);
  }
});

const env = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  brevoApiKey: process.env.BREVO_API_KEY,
  brevoSenderEmail: process.env.BREVO_SENDER_EMAIL,
  otpExpiryMinutes: Number(process.env.OTP_EXPIRY_MINUTES),
  superAdminEmail: process.env.SUPER_ADMIN_EMAIL
};

export default env;
