const express = require("express");
const { uploadResume, getResumes } = require("../controllers/candidateController");
const { protect, candidateOnly } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");
const { applyToJob } = require("../controllers/candidateController");

const router = express.Router();

// Upload candidate resume
router.post("/resume", protect, candidateOnly, upload.single("resume"), uploadResume);
router.get("/resume", protect, candidateOnly, getResumes);
router.post("/apply", protect, applyToJob);

module.exports = router;
