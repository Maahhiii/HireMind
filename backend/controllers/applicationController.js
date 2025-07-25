const JobApplication = require("../models/JobApplication");
const Job = require("../models/Job");

const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const existingApp = await JobApplication.findOne({ job: jobId, candidate: req.user._id });
    if (existingApp) return res.status(400).json({ message: "Already applied to this job" });

    const application = await JobApplication.create({
      candidate: req.user._id,
      job: jobId,
    });

    res.status(201).json({ message: "Applied successfully", application });
  } catch (err) {
    res.status(500).json({ message: "Application failed" });
  }
};

const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await JobApplication.find({ job: jobId })
      .populate("candidate", "name email");

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch applicants" });
  }
};

module.exports = { applyToJob, getApplicantsForJob };
