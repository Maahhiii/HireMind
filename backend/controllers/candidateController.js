const Resume = require("../models/Resume");
const JobApplication = require("../models/JobApplication");

// @desc Upload resume
const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const atsScore = Math.floor(Math.random() * 40) + 60; // Dummy score
    const resume = await Resume.create({
      user: req.user._id,
      fileUrl: `/uploads/resumes/${req.file.filename}`,
      atsScore,
    });

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all resumes
const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Apply to a job
const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const existing = await JobApplication.findOne({
      candidate: req.user._id,
      job: jobId,
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const application = await JobApplication.create({
      candidate: req.user._id,
      job: jobId,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadResume, getResumes, applyToJob };
