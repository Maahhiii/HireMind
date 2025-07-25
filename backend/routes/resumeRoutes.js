const express = require("express");
const { protect, candidateOnly } = require("../middleware/authMiddleware");
const { getMyResumes } = require("../controllers/resumeController");

const router = express.Router();

router.get("/my-resumes", protect, candidateOnly, getMyResumes);

module.exports = router;
