const express = require("express");
const { protect, candidateOnly, recruiterOnly } = require("../middleware/authMiddleware");
const { applyToJob, getApplicantsForJob } = require("../controllers/applicationController");

const router = express.Router();

router.post("/apply", protect, candidateOnly, applyToJob);
router.get("/applicants/:jobId", protect, recruiterOnly, getApplicantsForJob);

module.exports = router;
