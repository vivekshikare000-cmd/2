import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },

    email: {
      type: String,
      required: true,
      unique: true, // 👈 single source of truth
      lowercase: true,
      trim: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["student", "employer", "admin", "super_admin"],
      required: true
    },

    emailVerified: {
      type: Boolean,
      default: false
    },

    accountStatus: {
      type: String,
      enum: ["pending", "active", "suspended"],
      default: "pending"
    },

    studentProfile: {
      skills: [String],
      education: String,
      location: String
    },

    employerProfile: {
      companyName: String,
      domain: String,
      location: String
    },

    lastLoginAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);
