const express = require("express");
const { analyzeResume } = require("../controllers/resumeAIController");
const { protect, candidateOnly } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");

const router = express.Router();
router.post("/analyze", protect, candidateOnly, upload.single("resume"), analyzeResume);

module.exports = router;
