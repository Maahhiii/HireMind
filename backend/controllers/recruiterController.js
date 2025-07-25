const Job = require("../models/Job");
const Resume = require("../models/Resume");
const User = require("../models/User");
const JobApplication = require("../models/JobApplication");

// @desc Create Job
const createJob = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return res.status(400).json({ message: "Title and description are required" });

    const job = await Job.create({
      recruiter: req.user._id,
      title,
      description,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get Recruiter's Jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user._id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get Single Job
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete Job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.recruiter.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await job.deleteOne();
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get Candidates (list of resumes)
const getCandidates = async (req, res) => {
  try {
    const candidates = await User.find({ role: "candidate" }).select("-password");
    const resumes = await Resume.find().populate("user", "name email");
    res.json({ candidates, resumes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get applications for a job
const getApplicationsForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const applications = await JobApplication.find({ job: job._id })
      .populate("candidate", "name email");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update status of an application
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await JobApplication.findById(req.params.applicationId).populate("job");

    if (!application) return res.status(404).json({ message: "Application not found" });

    if (application.job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createJob, getJobs, getJobById, deleteJob, getCandidates, getApplicationsForJob, updateApplicationStatus };
