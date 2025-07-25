const Resume = require("../models/Resume");

// @desc Fetch all resumes for the logged-in candidate
const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch resumes" });
  }
};

module.exports = { getMyResumes };
