import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    otpHash: {
      type: String,
      required: true
    },

    purpose: {
      type: String,
      enum: ["email_verification", "login", "password_reset"],
      required: true
    },

    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } // TTL index
    },

    used: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Prevent multiple active OTPs for same purpose
otpSchema.index(
  { userId: 1, purpose: 1 },
  { unique: true, partialFilterExpression: { used: false } }
);

export default mongoose.model("OTP", otpSchema);
