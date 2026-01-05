import mongoose from "mongoose";

const peerReviewSchema = new mongoose.Schema(
  {
    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SkillSubmission",
      required: true,
    },

    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    score: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    feedback: {
      type: String,
      trim: true,
    },

    weight: {
      type: Number,
      default: 1, // reputation-based weight later
    },
  },
  { timestamps: true }
);

export default mongoose.model("PeerReview", peerReviewSchema);
