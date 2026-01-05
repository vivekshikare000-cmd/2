import mongoose from "mongoose";

const skillSubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    skillName: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },

    evidenceLinks: [
      {
        type: String, // video, github, drive link
        required: true,
      },
    ],

    status: {
      type: String,
      enum: ["submitted", "under_review", "verified", "rejected"],
      default: "submitted",
    },

    finalScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SkillSubmission", skillSubmissionSchema);
