const express = require("express");
const {
  createJob,
  getJobs,
  getJobById,
  deleteJob,
  getCandidates,
  getApplicationsForJob,
  updateApplicationStatus
} = require("../controllers/recruiterController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Only recruiter can access these endpoints
router.post("/job", protect, createJob);
router.get("/jobs", protect, getJobs);
router.get("/jobs/:id", protect, getJobById);
router.delete("/jobs/:id", protect, deleteJob);
router.get("/applications/:jobId", protect, getApplicationsForJob);
router.put("/applications/:applicationId", protect, updateApplicationStatus);

// View all candidates
router.get("/candidates", protect, getCandidates);

module.exports = router;
