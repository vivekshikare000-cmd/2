import brevoClient from "../config/brevo.js";
import env from "../config/env.js";

/**
 * Send OTP Email via Brevo
 */
export const sendOTPEmail = async ({ toEmail, otp, purpose }) => {
  const subjectMap = {
    email_verification: "Verify your email - PeerSkill",
    login: "Login verification code - PeerSkill",
    password_reset: "Reset your password - PeerSkill"
  };

  const messageMap = {
    email_verification: `Your email verification code is <b>${otp}</b>.`,
    login: `Your login verification code is <b>${otp}</b>.`,
    password_reset: `Your password reset code is <b>${otp}</b>.`
  };

  const payload = {
    sender: {
      name: "PeerSkill",
      email: env.brevoSenderEmail
    },
    to: [{ email: toEmail }],
    subject: subjectMap[purpose],
    htmlContent: `
      <p>Hello,</p>
      <p>${messageMap[purpose]}</p>
      <p>This OTP is valid for <b>${env.otpExpiryMinutes} minutes</b>.</p>
      <p>If you did not request this, please ignore this email.</p>
      <br/>
      <p>— PeerSkill Team</p>
    `
  };

  try {
    await brevoClient.post("/smtp/email", payload);
  } catch (error) {
    console.error("❌ Brevo email sending failed");

    if (error.response) {
      console.error("Brevo response:", error.response.data);
    } else {
      console.error(error.message);
    }

    throw new Error("Email delivery failed");
  }
};
