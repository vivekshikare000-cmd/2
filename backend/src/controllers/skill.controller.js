import SkillSubmission from "../models/SkillSubmission.model.js";

export const createSkillSubmission = async (req, res) => {
  try {
    const { skillName, level, evidenceLinks } = req.body;

    // Basic validation
    if (!skillName || !level || !evidenceLinks?.length) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // TEMP: hardcoded user (JWT will replace this)
    const userId = "000000000000000000000000";

    const submission = await SkillSubmission.create({
      userId,
      skillName,
      level,
      evidenceLinks,
    });

    res.status(201).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit skill",
    });
  }
};
