const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: { type: String, required: true },
    atsScore: { type: Number, required: true },
    feedback: { type: String, default: "Your resume needs optimization." },
    skills: [{ type: String }], // array of extracted skills
    summary: { type: String },  // short text summary of resume
    aiAnalysis: { type: mongoose.Schema.Types.Mixed }, // raw HuggingFace API output
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);
module.exports = Resume;
