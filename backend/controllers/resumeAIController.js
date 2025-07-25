const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const fetch = require("node-fetch");
const Resume = require("../models/Resume");

// Extract text from uploaded resume (PDF)
const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

// Call Hugging Face Inference API
const queryHuggingFace = async (text, jobDescription) => {
  const apiUrl = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: text,
      parameters: {
        candidate_labels: jobDescription.split(/[\s,]+/),
        multi_label: true,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Hugging Face API error: ${response.statusText}`);
  }

  return await response.json();
};

// Calculate ATS Score
const calculateATSScore = (huggingFaceResult) => {
  if (!huggingFaceResult || !huggingFaceResult.scores) return 50;
  const avgConfidence =
    huggingFaceResult.scores.reduce((sum, score) => sum + score, 0) /
    huggingFaceResult.scores.length;
  return Math.min(100, Math.floor(avgConfidence * 100));
};

// Extract Skills
const extractSkills = (text) => {
  const commonSkills = [
    "JavaScript", "React", "Node.js", "MongoDB", "Python", "Django", "C++",
    "AWS", "Docker", "SQL", "HTML", "CSS", "Tailwind", "Express",
    "Java", "Machine Learning", "Deep Learning"
  ];

  return commonSkills.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase())
  );
};

// Main Controller: Analyze and Update Resume
const analyzeResume = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    if (!resumeId) {
      return res.status(400).json({ message: "Missing resumeId" });
    }

    const resume = await Resume.findById(resumeId);
    if (!resume || !resume.fileUrl) {
      return res.status(404).json({ message: "Resume file not found" });
    }

    const filePath = path.join(__dirname, '..', resume.fileUrl);
    const text = await extractTextFromPDF(filePath);
    const hfResult = await queryHuggingFace(text, jobDescription || "software engineer react node");
    const atsScore = calculateATSScore(hfResult);
    const skills = extractSkills(text);
    const summary = text.substring(0, 1000); // 1000 chars max

    // Update resume doc
    resume.atsScore = atsScore;
    resume.skills = skills;
    resume.summary = summary;
    resume.aiAnalysis = hfResult;
    await resume.save();

    res.status(200).json({
      message: "Resume analyzed and saved successfully",
      resumeId,
      atsScore,
      skills,
      summary,
      aiAnalysis: hfResult,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to analyze resume", error: error.message });
  }
};

module.exports = { analyzeResume };
