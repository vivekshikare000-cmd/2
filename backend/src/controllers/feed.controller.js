import Post from "../models/Post.model.js";

export const getGlobalFeed = async (req, res) => {
  try {
    const posts = await Post.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch global feed",
    });
  }
};
