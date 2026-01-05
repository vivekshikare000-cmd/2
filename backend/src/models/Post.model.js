

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    authorRole: {
      type: String,
      enum: ["student", "employer", "admin"],
      required: true,
    },

    postType: {
      type: String,
      enum: ["SKILL_SHOWCASE", "ACHIEVEMENT", "JOB_POST", "ANNOUNCEMENT"],
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    attachments: [
      {
        type: String, // image / video / link
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
